<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Traits\Uuid;

class Game extends Model
{
  use Uuid, HasFactory;

  protected static function boot()
  {
    parent::boot();

    static::addGlobalScope('order', function (Builder $builder) {
      $builder->orderBy('created_at', 'desc');
    });
  }

  public $fillable = [
    "user_id",
    "size",
    "winner",
    "p1_name",
    "p2_name",
  ];

  public function user()
  {
    return $this->belongsTo("App\Models\User", "user_id");
  }

  public function logs()
  {
    return $this->hasMany("App\Models\GameLogs", "game_id");
  }

}
