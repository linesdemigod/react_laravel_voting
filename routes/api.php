<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ElectionController;
use App\Http\Controllers\CandidateController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::controller(AuthController::class)->group(function () {
        Route::get('/user', 'user');
        Route::get('/login-status', 'login_status');
        Route::post('/logout', 'logout');

    });

    Route::controller(ElectionController::class)->group(function () {
        Route::get('/get-elections', 'index');
        Route::post('/store-election', 'store');
        Route::get('/get-election/{election}', 'show');
        Route::put('/update-election/{election}', 'update');
        Route::delete('/delete-election/{election}', 'destroy');

    });

    Route::controller(CandidateController::class)->group(function () {
        Route::get('/get-candidates', 'index');
        Route::post('/store-candidate', 'store');
        Route::get('/get-candidate/{candidate}', 'show');
        Route::post('/update-candidate/{candidate}', 'update');
        Route::delete('/delete-candidate/{candidate}', 'destroy');

    });


    Route::controller(UserController::class)->group(function () {
        Route::get('/get-users', 'index');
        Route::post('/store-user', 'store');
        Route::get('/get-user/{user}', 'show');
        Route::put('/update-user/{user}', 'update');
        Route::delete('/delete-user/{user}', 'destroy');

    });
});
