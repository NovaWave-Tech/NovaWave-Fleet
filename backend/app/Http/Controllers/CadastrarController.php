<?php

namespace App\Http\Controllers;

use App\Http\Requests\CadastrarRequest;
use App\Http\Resources\UsuarioResource;
use App\Models\Empresa;
use App\Models\Filial;
use App\Models\Usuario;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class CadastrarController extends Controller
{
    public function cadastrar(CadastrarRequest $request): JsonResponse
    {
        $dados = $request->validated();

        $usuario = DB::transaction(function () use ($dados) {
            $empresa = Empresa::create([
                'nome' => $dados['nome_empresa'],
                'cnpj' => $dados['cnpj'] ?? null,
            ]);

            $filial = Filial::create([
                'idempresa' => $empresa->idempresa,
                'nome' => 'Matriz',
            ]);

            return Usuario::create([
                'nome' => $dados['nome'],
                'email' => $dados['email'],
                'senha' => $dados['senha'],
                'idempresa' => $empresa->idempresa,
                'idfilial' => $filial->idfilial,
                'cargo' => 'Administrador',
                'situacao' => 1,
            ]);
        });

        $token = auth('api')->login($usuario);
        $usuario->forceFill(['ultimo_login' => now()])->save();

        return response()->json([
            'token' => $token,
            'tipo' => 'bearer',
            'expira_em' => auth('api')->factory()->getTTL() * 60,
            'usuario' => new UsuarioResource($usuario),
        ], 201);
    }
}
