<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Http\Requests\GameRequest;

use App\Models\Game;
use App\Models\GameLogs;

class GameController extends Controller
{
  public function __construct()
  {
    $this->authorizeResource(Game::class, "game");
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $user = Auth::user();

    $games = Game::where([
      "user_id" => $user->id,
    ])->get();

    return $games;
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
   * @param  App\Http\Requests\GameRequest  $request
   * @return \Illuminate\Http\Response
   */
  public function store(GameRequest $request)
  {
    $data = $request->validated();

    if ($data) {
      $user = Auth::user();

      $data["user_id"] = $user->id;

      $data["p1_name"] = empty($request->p1_name) ? "Player #" . mt_rand(1, 100) : $request->p1_name;
      $data["p2_name"] = empty($request->p2_name) ? "Player #" . mt_rand(1, 100) : $request->p2_name;

      $game = Game::create($data);

      return response([
        "payload" => $game,
        "message" => "Game successfully added",
      ], 201);
    }

    return response([
      "message" => "Server internal error",
    ], 500);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Game  $game
   * @return \Illuminate\Http\Response
   */
  public function show(Game $game)
  {
    $game->user = $game->user;
    $game->logs = $game->logs;

    return $game;
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Game  $game
   * @return \Illuminate\Http\Response
   */
  public function edit(Game $game)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  App\Http\Requests\GameRequest  $request
   * @param  \App\Models\Game  $game
   * @return \Illuminate\Http\Response
   */
  public function update(GameRequest $request, Game $game)
  {
    if (isset($request->play))
    {
      if ($game->winner != null)
        return response([
          "message" => "Game is finished",
        ], 403);


      $coords = "{$request->play['row']}|{$request->play['col']}";
      $check = GameLogs::where([
        "game_id" => $game->id,
        "coords"  => $coords,
      ])->count();

      if ($check)
        return response([
          "message" => "This position already selected.",
        ], 403);

      $last = GameLogs::where([
        "game_id" => $game->id,
      ])->orderBy("id", "DESC")->first(["player"]);
      $player = !empty($last) && $last->player == 0 ? 1 : 0;

      $log = GameLogs::create([
        "player"  =>  $player,
        "game_id" =>  $game->id,
        "coords"  =>  $coords,
      ]);

      $winLines = [];

      $aLine = [];
      $aRLine = [];
      for ($i = 0; $i < $game->size; $i++) {
        $hLine = [];
        $vLine = [];

        for ($j = 0; $j < $game->size; $j++)
        {
          $hLine[] = "$i|$j";
          $vLine[] = "$j|$i";
        }

        $winLines[] = $hLine;
        $winLines[] = $vLine;

        $diff = $game->size - 1 - $i;
        $aLine[] = "$i|$i";
        $aRLine[] = "$i|$diff";
      }

      $winLines[] = $aLine;
      $winLines[] = $aRLine;

      $logs = GameLogs::where([
        "game_id" => $game->id,
        "player" => $player,
      ])->get(["coords"])->toArray();

      $logs = array_map(function($log) {
        return $log["coords"];
      }, $logs);

      $message = NULL;

      $winLine = NULL;
      if (count($logs) >= $game->size)
      {
        foreach ($winLines as $line) {
          $diffCount = count(array_diff($line, $logs));
          if ($diffCount === 0) {
            $winLine = $line;

            $break;
          }
        }
      }

      if (!empty($winLine)) {
        $player_name = "p{$player}_name";
        $message = $game->$player_name . " is win";

        $game->winner = $player;
        $game->save();
      } else {
        $count = GameLogs::where([
          "game_id" => $game->id,
        ])->count();

        if ($count === $game->size * $game->size) {
          $message = "The game ended in a draw";

          $game->winner = 3;
          $game->save();
        }
      }

      $game->logs = $game->logs;

      return response([
        "payload" => $game,
        "winLine" => $winLine,
        "message" => $message,
      ], 200);
    }

    $data = $request->except(["id"]);

    if ($data) {
      $game->fill($data);
      $game->save();

      return response([
        "payload" => $game,
        "message" => "Game successfully updated",
      ], 200);
    }

    return response([
      "message" => "Server internal error",
    ], 500);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Game  $game
   * @return \Illuminate\Http\Response
   */
  public function destroy(Game $game)
  {
    if ($game->delete()) {
      GameLogs::where([
        "game_id" => $game->id,
      ])->delete();

      return response([
        "payload" => $game,
        "message" => "Game successfully deleted!"
      ], 200);
    }

    return response([
      "message" => "Server internal error"
    ], 500);
  }
}
