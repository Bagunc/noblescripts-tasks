<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class ValueRequest extends FormRequest
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
        {
          return [
            "value" => "required",
          ];
        }
        case "DELETE":
        {
          return [
            "id" => "required",
          ];
        }
        case "PUT":
        {
          return [
            "id" => "required",
            "value" => "required",
          ];
        }
      }
    }
}
