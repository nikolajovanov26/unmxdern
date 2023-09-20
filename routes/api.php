<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/review', \App\Http\Controllers\ReviewController::class);
Route::post('/rating', \App\Http\Controllers\RatingController::class);

Route::get('/favorites', [\App\Http\Controllers\FavoritesController::class, 'show']);
Route::post('/favorites', [\App\Http\Controllers\FavoritesController::class, 'store']);

Route::get('/user-data', [\App\Http\Controllers\WebflowUserController::class, 'data']);
Route::post('/new-user', [\App\Http\Controllers\WebflowUserController::class, 'newUser']);
