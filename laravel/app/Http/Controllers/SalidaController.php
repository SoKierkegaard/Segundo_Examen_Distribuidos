<?php

namespace App\Http\Controllers;

use App\Models\Salida;
use Illuminate\Http\Request;

class SalidaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $datos=$request->validate([
            'destino'=>'required',
            'fecha'=>'required',
            'hora'=>'required',
            'bus'=>'required',
            'precio'=>'required',
            'capacidad'=>'required',
        ]);

        if(Salida::where('destino', $datos['destino'])->where('fecha', $datos['fecha'])->exists())
            return response()->json(['mensaje'=> 'ya existe esa salida']);

        $salida=Salida::create($datos);
        return response()->json($salida,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Salida $salida)
    {
        //
        return response()->json($salida);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Salida $salida)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Salida $salida)
    {
        //
    }
}
