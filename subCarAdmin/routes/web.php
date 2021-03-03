<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Route::resource('admin', AdminController::class);
Route::POST('admin', [AdminController::class, 'store']);
Route::GET('admin', [AdminController::class, 'index']);

Route::put('admin/{admin}', [AdminController::class, 'update']);
Route::delete('admin/{admin}', [AdminController::class, 'destroy']);
    //->middleware(Cors::class);
