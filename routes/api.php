<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\ValueController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post("/login", [AuthController::class, "login"])->name("login");
Route::post("/register", [AuthController::class, "register"])->name("register");

Route::middleware("auth:api")->group(function() {
  Route::post("/auth", [AuthController::class, "auth"])->name("auth");
  Route::post("/logout", [AuthController::class, "logout"])->name("logout");

  Route::apiResource("game", GameController::class);
  Route::apiResource("value", ValueController::class);
});
