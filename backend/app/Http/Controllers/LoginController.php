<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UsuarioResource;
use Illuminate\Http\JsonResponse;

class LoginController extends Controller
{
    /**
     * Autentica o usuário e devolve o token JWT.
     */
    public function logar(LoginRequest $request): JsonResponse
    {
        $credenciais = [
            'email' => $request->input('email'),
            'password' => $request->input('senha'),
            'situacao' => 1,
        ];

        $token = auth('api')->attempt($credenciais);

        if (! $token) {
            return response()->json([
                'mensagem' => 'E-mail ou senha inválidos.',
            ], 401);
        }

        $usuario = auth('api')->user();
        $usuario->forceFill(['ultimo_login' => now()])->save();

        return $this->respostaComToken($token);
    }

    /**
     * Retorna o usuário autenticado.
     */
    public function eu(): UsuarioResource
    {
        return new UsuarioResource(auth('api')->user());
    }

    /**
     * Renova o token JWT do usuário autenticado.
     */
    public function renovar(): JsonResponse
    {
        return $this->respostaComToken(auth('api')->refresh());
    }

    /**
     * Encerra a sessão invalidando o token atual.
     */
    public function sair(): JsonResponse
    {
        auth('api')->logout();

        return response()->json([
            'mensagem' => 'Sessão encerrada com sucesso.',
        ]);
    }

    /**
     * Monta a resposta padrão de autenticação com o token.
     */
    protected function respostaComToken(string $token): JsonResponse
    {
        return response()->json([
            'token' => $token,
            'tipo' => 'bearer',
            'expira_em' => auth('api')->factory()->getTTL() * 60,
            'usuario' => new UsuarioResource(auth('api')->user()),
        ]);
    }
}
