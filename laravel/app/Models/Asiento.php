<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asiento extends Model
{
    //
    protected $fillable = [
        'salida', 'numero', 'ci'
    ];
}
