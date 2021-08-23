<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class GameLogs extends Model
{
  use HasFactory;

  public $fillable = [
    "action",
    "game_id",
    "player",
    "coords",
  ];

  public function game()
  {
    return $this->belongsTo(User::class, "game_id", "id");
  }

}
