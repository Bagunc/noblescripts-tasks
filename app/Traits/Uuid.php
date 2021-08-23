<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait Uuid
{
  protected static function bootUuid()
  {
    static::creating(static function($model) {
      if (!empty($model->getKeyName()))
        $model->{$model->getKeyName()} = Str::uuid()->toString();
    });
  }

  public function getIncrementing()
  {
    return false;
  }

  public function getKeyType()
  {
    return "string";
  }

}
