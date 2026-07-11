<?php

use App\Http\Controllers\CadastrarController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

// Rotas públicas
Route::post('login', [LoginController::class, 'logar']);
Route::post('cadastrar', [CadastrarController::class, 'cadastrar']);

// Rotas protegidas por JWT
Route::middleware('auth:api')->group(function () {
    Route::get('perfil', [LoginController::class, 'perfil']);
    Route::post('recarregar', [LoginController::class, 'recarregar']);
    Route::post('sair', [LoginController::class, 'sair']);
});
