<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Http\Requests\RegisterRequest;

use App\Models\User;

class AuthController extends Controller
{
  public function login(Request $request)
  {
    $login = $request->validate([
      "email" => "email|required",
      "password" => "string|required"
    ]);

    $response = $this->authenticate($login["email"], $login["password"]);

    if ($response["status"] == 200)
      $response["data"]["message"] = "Authorization was successful";

    return response($response["data"], $response["status"]);
  }

  public function register(RegisterRequest $request)
  {

    $register = $request->validated();

    if ($register)
    {
      $originalPassword = $register["password"];
      $register["password"] = Hash::make($originalPassword);
      $register["name"] = strstr($register["email"], '@', true);

      $user = User::create($register);
      $user->save();

      $response = [
        "message" => "Registration successfully done.",
      ];

      $authResponse = $this->authenticate($user->email, $originalPassword);
      if ($authResponse['status'] == 200)
        $response = array_merge($response, $authResponse["data"]);

      return response($response, 200);
    }

    return reponse([
      "message" => "System error. Please try again later.",
    ], 500);
  }

  private function authenticate($email, $password)
  {
    $login = Auth::guard('web')->attempt([
      "email" => $email,
      "password" => $password,
    ]);

    if (!$login)
      return [
        "data" => [
          "message" => "Invalid login credentials!"
        ],
        "status" => 404
      ];

    $user = Auth::guard('web')->user();

    $user->tokens->each(function($token) {
      $token->delete();
    });

    $accessToken = Auth::guard('web')->user()->createToken(1)->accessToken;

    return [
      "data" => [
        "user" => $user,
        "access_token" => $accessToken,
      ],
      "status" => 200,
    ];
  }

  public function logout()
  {
    $user = Auth::user();

    if ($user->AauthAcessToken()->delete())
      return response(NULL, 204);

    return response(["message" => "Server Internal Error"], 500);
  }

  public function auth()
  {
    return Auth::user();
  }
}
