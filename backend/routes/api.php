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
        Route::get('download-pdf/{code}/{timestamp}', [App\Http\Controllers\Api\PdfController::class, 'downloadPdf']);
        Route::get('preview-pdf/{code}/{timestamp?}', [App\Http\Controllers\Api\PdfController::class, 'previewPdf']);
        Route::get('wikipedia_handler/{code}', [App\Http\Controllers\Api\PdfController::class, 'wikipediaHandler'])->name('wikipedia_handler');
    });

    Route::group(['prefix' => 'auth', 'middleware' => 'auth:sanctum'], function () {
        
        Route::post('logout', [App\Http\Controllers\Api\AuthController::class, 'logout']);
        Route::post('update-profile', [App\Http\Controllers\Api\AuthController::class, 'updateProfile']);

        Route::group(['prefix' => 'admin', 'middleware' => 'auth:sanctum'], function () {
            Route::get('dashboard/statistics', [App\Http\Controllers\Api\DashboardController::class, 'statistics']);
            Route::get('users', [App\Http\Controllers\Api\UserController::class, 'index']);
            Route::get('user', [App\Http\Controllers\Api\UserController::class, 'show']);
            Route::delete('user/{id}', [App\Http\Controllers\Api\UserController::class, 'destroy']);
        });
        
        Route::group(['prefix' => 'pdf'], function () {
            Route::get('list', [App\Http\Controllers\Api\PdfController::class, 'index']);
            Route::delete('delete/{code}', [App\Http\Controllers\Api\PdfController::class, 'destroy']);
        });

        Route::post('verifyToken', [App\Http\Controllers\Api\AuthController::class, 'verifyToken']);
    });





});
