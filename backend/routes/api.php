<?php

use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

// Rotas públicas
Route::post('login', [LoginController::class, 'logar']);

// Rotas protegidas por JWT
Route::middleware('auth:api')->group(function () {
    Route::get('eu', [LoginController::class, 'eu']);
    Route::post('renovar', [LoginController::class, 'renovar']);
    Route::post('sair', [LoginController::class, 'sair']);
});
