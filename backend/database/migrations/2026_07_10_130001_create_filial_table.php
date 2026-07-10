<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('filial', function (Blueprint $table) {
            $table->increments('idfilial');
            $table->integer('idempresa');
            $table->string('nome');
            $table->smallInteger('situacao')->default(1);
            $table->timestamp('criado_em')->useCurrent();

            $table->foreign('idempresa')
                ->references('idempresa')->on('empresa')
                ->onUpdate('cascade')->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('filial');
    }
};
