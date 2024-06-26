<?php

use Illuminate\Http\Request;
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

// group of routes for the API
Route::group(['prefix' => 'v1'], function () {

    Route::post('auth/login', [App\Http\Controllers\Api\AuthController::class, 'login']);
    Route::post('auth/register', [App\Http\Controllers\Api\AuthController::class, 'register']);

    Route::group(['prefix' => 'pdf'], function () {
        Route::post('check-url', [App\Http\Controllers\Api\PdfController::class, 'checkUrl']);
        Route::post('get-editor', [App\Http\Controllers\Api\PdfController::class, 'getEditor']);
        Route::post('generate-pdf', [App\Http\Controllers\Api\PdfController::class, 'generatePdf']);
    });

    // auth/verifyToken sanctum group prefix
    Route::group(['prefix' => 'auth', 'middleware' => 'auth:sanctum'], function () {
        // Route::get('user', [App\Http\Controllers\Api\AuthController::class, 'user']);
        // Route::post('logout', [App\Http\Controllers\Api\AuthController::class, 'logout']);
        Route::post('verifyToken', [App\Http\Controllers\Api\AuthController::class, 'verifyToken']);
    });





});
