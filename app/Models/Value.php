<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Value extends Model
{
    use HasFactory;

    protected static function boot()
    {
      parent::boot();

      static::addGlobalScope('order', function (Builder $builder) {
        $builder->orderBy('created_at', 'desc');
      });
    }

    public $fillable = [
      "value",
      "user_id",
    ];
}
