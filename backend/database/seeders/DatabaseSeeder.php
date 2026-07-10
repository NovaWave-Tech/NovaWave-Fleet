<?php

namespace Database\Seeders;

use App\Models\Empresa;
use App\Models\Filial;
use App\Models\Usuario;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Popula dados iniciais para autenticação (empresa, filial e usuário admin).
     */
    public function run(): void
    {
        $empresa = Empresa::firstOrCreate(
            ['cnpj' => '00000000000191'],
            ['nome' => 'NovaWave Transportes']
        );

        $filial = Filial::firstOrCreate(
            ['idempresa' => $empresa->idempresa, 'nome' => 'Matriz'],
        );

        Usuario::firstOrCreate(
            ['email' => 'admin@novawave.com'],
            [
                'nome' => 'Administrador',
                'senha' => 'senha123',
                'idempresa' => $empresa->idempresa,
                'idfilial' => $filial->idfilial,
                'cargo' => 'Administrador',
                'situacao' => 1,
            ]
        );
    }
}
