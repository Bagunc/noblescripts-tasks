<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Models\Value;
use App\Http\Requests\ValueRequest;

class ValueController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Value::where([
          "user_id" => Auth::user()->id,
        ])->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\ValueRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ValueRequest $request)
    {
        $data = $request->validated();

        if ($data) {
          $data["user_id"] = Auth::user()->id;

          $value = Value::create($data);
          if ($value)
            return response([
              "payload" => $value,
              "message" => "Value successful added",
            ], 201);
        }

        return response(["message" => "Internal server error"], 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Value  $value
     * @return \Illuminate\Http\Response
     */
    public function show(ValueRequest $value)
    {
        return $value;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Value  $value
     * @return \Illuminate\Http\Response
     */
    public function edit(Value $value)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  App\Http\Requests\ValueRequest  $request
     * @param  \App\Models\Value  $value
     * @return \Illuminate\Http\Response
     */
    public function update(ValueRequest $request, Value $value)
    {
      $data = $request->except(["id"]);

      if ($data) {
        $value->fill($data);
        $value->save();

        return response([
          "payload" => $value,
          "message" => "Value successful updated",
        ], 200);
      }

      return response(["message" => "Internal server error"], 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Value  $value
     * @return \Illuminate\Http\Response
     */
    public function destroy(Value $value)
    {
      if ($value->delete())
        return response([
          "payload" => $value,
          "message" => "Value successful deleted"
        ], 200);

      return response(["message" => "Internal server error"], 500);
    }
}
