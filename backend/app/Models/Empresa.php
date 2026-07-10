<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['nome', 'cnpj', 'situacao'])]
class Empresa extends Model
{
    protected $table = 'empresa';

    protected $primaryKey = 'idempresa';

    public $timestamps = false;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'criado_em' => 'datetime',
            'situacao' => 'integer',
        ];
    }

    public function filiais(): HasMany
    {
        return $this->hasMany(Filial::class, 'idempresa', 'idempresa');
    }

    public function usuarios(): HasMany
    {
        return $this->hasMany(Usuario::class, 'idempresa', 'idempresa');
    }
}
