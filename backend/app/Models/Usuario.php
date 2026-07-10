<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

#[Fillable(['nome', 'email', 'senha', 'idempresa', 'idfilial', 'telefone', 'cargo', 'situacao'])]
#[Hidden(['senha'])]
class Usuario extends Authenticatable implements JWTSubject
{
    protected $table = 'usuario';

    protected $primaryKey = 'idusuario';

    /**
     * A tabela usa apenas "criado_em" (sem updated_at); o valor é preenchido
     * pelo DEFAULT do banco.
     */
    public $timestamps = false;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'ultimo_login' => 'datetime',
            'criado_em' => 'datetime',
            'senha' => 'hashed',
            'situacao' => 'integer',
        ];
    }

    /**
     * Coluna usada como senha pela autenticação (padrão do Laravel é "password").
     */
    public function getAuthPassword(): string
    {
        return $this->senha;
    }

    /**
     * Identificador armazenado na claim "sub" do JWT.
     */
    public function getJWTIdentifier(): mixed
    {
        return $this->getKey();
    }

    /**
     * Claims customizadas adicionadas ao JWT.
     *
     * @return array<string, mixed>
     */
    public function getJWTCustomClaims(): array
    {
        return [];
    }

    public function empresa(): BelongsTo
    {
        return $this->belongsTo(Empresa::class, 'idempresa', 'idempresa');
    }

    public function filial(): BelongsTo
    {
        return $this->belongsTo(Filial::class, 'idfilial', 'idfilial');
    }
}
