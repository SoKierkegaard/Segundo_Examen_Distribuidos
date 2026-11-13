using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Web;
using System.Web.Services;


public class Salida
{
    public string destino;
    public string fecha;
    public string hora;
    public int bus;
    public double precio;
    public int cantidad;
}

public class Boleto
{
    public string salida;
    public int numero;
    public string ci;
}

/// <summary>
/// Descripción breve de WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
// [System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService
{

    public WebService()
    {

        //Elimine la marca de comentario de la línea siguiente si utiliza los componentes diseñados 
        //InitializeComponent(); 
    }

    [WebMethod]
    public Salida VerSalidas(String destino, String fecha)
    {
        return new Salida();
    }


    [WebMethod]
    public Boleto VenderBoleto(String destino, String fecha)
    {
        return new Boleto();
    }
}
