<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('usuario', function (Blueprint $table) {
            $table->increments('idusuario');
            $table->string('nome');
            $table->string('email')->unique();
            $table->string('senha');
            $table->integer('idempresa');
            $table->integer('idfilial')->nullable();
            $table->string('telefone')->nullable();
            $table->string('cargo')->nullable();
            $table->timestamp('ultimo_login')->nullable();
            $table->smallInteger('situacao')->default(1);
            $table->timestamp('criado_em')->useCurrent();

            $table->foreign('idempresa')
                ->references('idempresa')->on('empresa')
                ->onUpdate('cascade')->onDelete('restrict');

            $table->foreign('idfilial')
                ->references('idfilial')->on('filial')
                ->onUpdate('cascade')->onDelete('set null');
        });

        // Restringe "situacao" aos valores 0 (inativo) e 1 (ativo).
        DB::statement('ALTER TABLE usuario ADD CONSTRAINT chk_usuario_situacao CHECK (situacao IN (0, 1))');
    }

    public function down(): void
    {
        Schema::dropIfExists('usuario');
    }
};
