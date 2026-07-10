<?php

use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

// Rotas públicas
Route::post('login', [LoginController::class, 'logar']);

// Rotas protegidas por JWT
Route::middleware('auth:api')->group(function () {
    Route::get('perfil', [LoginController::class, 'perfil']);
    Route::post('recarregar', [LoginController::class, 'recarregar']);
    Route::post('sair', [LoginController::class, 'sair']);
});
