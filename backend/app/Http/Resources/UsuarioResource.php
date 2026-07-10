<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsuarioResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'idusuario' => $this->idusuario,
            'nome' => $this->nome,
            'email' => $this->email,
            'idempresa' => $this->idempresa,
            'idfilial' => $this->idfilial,
            'telefone' => $this->telefone,
            'cargo' => $this->cargo,
            'ultimo_login' => $this->ultimo_login,
            'situacao' => $this->situacao,
        ];
    }
}
