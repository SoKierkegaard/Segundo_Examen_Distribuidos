const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {GraphQLObjectType,GraphQLSchema, 
    GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull,
    GraphQLBoolean}=require('graphql');

const {DataTypes, Sequelize }= require('sequelize');

const sequelize = new Sequelize('bd_pasajeros', 'root', '',{host:'localhost', dialect: 'mysql'});

sequelize.authenticate().then(()=>console.log('bd conectada')).catch(console.error);
const Pasajero = sequelize.define('Pasajero', {
    ci:{type:DataTypes.STRING},
    nombres:{type:DataTypes.STRING},
    apellidos:{type:DataTypes.STRING},
    celular:{type:DataTypes.INTEGER},
    frecuente:{type:DataTypes.BOOLEAN}
},{tableName:'pasajeros', timestamps:false});

const PasajeroType = new GraphQLObjectType({
    name:'Pasajero',
    fields: {
        id: {type: GraphQLInt},
        ci: {type: GraphQLString},
        nombres: {type: GraphQLString},
        apellidos: {type: GraphQLString},
        celular: {type: GraphQLInt},
        frecuente: {type: GraphQLBoolean},
    },
})

const RootQuery = new GraphQLObjectType({
    name:'Query',
    fields:{
        pasajeros:{
            type:new GraphQLList(PasajeroType),
            resolve:()=>Pasajero.findAll(),
        },
        pasajero:{
            type: PasajeroType,
            args: {ci:{type: new GraphQLNonNull(GraphQLString)}},
            resolve: async (parent, args)=>{
                const p= await Pasajero.findOne({ where:{ci:args.ci}});
                if(!p) throw new Error('Pasajero no encontrado');
                return p;
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        registrarPasajero:{
            type: PasajeroType, 
            args:{
                ci: {type: new GraphQLNonNull(GraphQLString)},
                nombres: {type: new GraphQLNonNull(GraphQLString)},
                apellidos: {type: new GraphQLNonNull(GraphQLString)},
                celular: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve: async (parent, args)=>{
                //if(parseInt(args.ci)<5 || parseInt(args.ci)>10 ) throw new Error('El ci debe estar entre 5 y 10 digitos');
                if(await Pasajero.findOne({where: {ci: args.ci}})) throw new Error('El ci ya existe');
                return Pasajero.create(args);
            }
        }
    }
})

sequelize.sync()
    .then(() => {
        console.log('Base de datos conectada y tablas creadas/sincronizadas.');
    })
    .catch((err) => {
        console.error('Error al sincronizar la base de datos:', err);
    });

const schema = new GraphQLSchema({ query:RootQuery, mutation:Mutation});
const app=express();
app. use('/graphql', graphqlHTTP({schema,graphiql:true}))
app.listen(4000,()=>console.log('http://localhost:4000/graphql'))