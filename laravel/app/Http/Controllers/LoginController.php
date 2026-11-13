<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Firebase\JWT\JWT;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $usuario = User::where('email', $request->email)->first();
        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            return response()->json(['mensaje' => 'Credenciales incorrectas'], 401);
        }

        $time = time();
        $payload = [
            'iat' => $time,
            'exp' => $time + 13600,
            'data' => ['user_id' => $usuario->id, 'email' => $usuario->email],
        ];
        $jwt = JWT::encode($payload, env('JWT_SECRET'), env('JWT_ALGORITHM'));
        return response()->json(['token' => $jwt, 'type' => 'bearer']);
    }
}
