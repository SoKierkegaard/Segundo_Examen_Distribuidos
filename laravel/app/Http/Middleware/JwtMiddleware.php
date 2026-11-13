<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $jwt = $request->bearerToken();
        if (!$jwt) return response()->json(['mensaje' => 'Falta token'], 401);

        try {
            $datos = JWT::decode($jwt, new Key(env('JWT_SECRET'), env('JWT_ALGORITHM')));
            $request->attributes->add(['user' => $datos->data]);
        } catch (\Exception $e) {
            return response()->json(['mensaje' => 'Token invalido o vencido'], 401);
        }

        return $next($request);
    }
}
