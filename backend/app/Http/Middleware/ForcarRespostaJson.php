<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Garante que toda requisição de API seja tratada como JSON, fazendo o Laravel
 * responder erros (401, 422, etc.) em JSON mesmo quando o cliente não envia o
 * cabeçalho Accept: application/json.
 */
class ForcarRespostaJson
{
    public function handle(Request $request, Closure $next): Response
    {
        $request->headers->set('Accept', 'application/json');

        return $next($request);
    }
}
