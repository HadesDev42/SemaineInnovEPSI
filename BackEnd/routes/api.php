<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\TagsController;
use App\Http\Controllers\API\TrainingsController;
use PHPUnit\Event\Tracer\Tracer;

Route::controller(AuthController::class)->group(function(){
    Route::post('auth/register', 'register');
    Route::post('auth/login', 'login');
});

Route::controller(TagsController::class)->group(function(){
    Route::post('tags/create', 'create');
});

Route::controller(TrainingsController::class)->group(function(){
    Route::post('trainings/create', 'create');
    Route::get('trainings', 'index');
});

// Route::middleware('auth:sanctum')->group(function(){
//     Route::post('auth/logout', 'logout');
// });