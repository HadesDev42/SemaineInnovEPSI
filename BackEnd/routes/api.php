<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\TagsController;
use App\Http\Controllers\API\TrainingsController;
use App\Http\Controllers\API\TagsTrainingController;

Route::controller(AuthController::class)->group(function(){
    Route::post('auth/register', 'register');
    Route::post('auth/login', 'login');
    Route::post('auth/logout', 'logout')->middleware('auth:sanctum');
});

Route::controller(TagsController::class)->group(function(){
    Route::post('tags/create', 'create');
});

Route::controller(TagsTrainingController::class)->group(function(){
    Route::post('tags-training/create', 'create');
    Route::get('tags-training/getTagsByTrainingId/{training_id}', 'getTagsByTrainingId')->middleware('auth:sanctum');
});

Route::controller(TrainingsController::class)->group(function(){
    Route::post('trainings/create', 'create');
    Route::get('trainings', 'index');
    Route::get('trainings/getByID/{id}', 'getByID')->middleware('auth:sanctum');
});
