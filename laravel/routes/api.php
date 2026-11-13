<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\SalidaController;
use App\Http\Middleware\JwtMiddleware;

Route::post('/login', [LoginController::class, 'login']);
Route::post('/salidas', [SalidaController::class, 'store'])->middleware(JwtMiddleware::class);

Route::get('/salidas/{id}',[SalidaController::class,'show']);