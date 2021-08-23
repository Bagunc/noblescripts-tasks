<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class GameRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return Auth::check();
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    switch ($this->getMethod())
    {
      case "POST":
        return [
          "size"      =>  "required|integer|min:3",
        ];
      case "PUT":
        return [
        ];
      case "DELETE":
        return [
          "id"        =>  "uuid|required",
        ];
    }
  }
}
