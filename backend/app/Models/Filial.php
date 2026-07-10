<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['idempresa', 'nome', 'situacao'])]
class Filial extends Model
{
    protected $table = 'filial';

    protected $primaryKey = 'idfilial';

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

    public function empresa(): BelongsTo
    {
        return $this->belongsTo(Empresa::class, 'idempresa', 'idempresa');
    }
}
