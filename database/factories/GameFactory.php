<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Game;
use App\Models\User;

class GameFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = Game::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    $ids = [
      User::inRandomOrder()->first()->id,
      User::inRandomOrder()->first()->id,
    ];

    return [
      "size"        =>  3,
      "user_id"     =>  $ids[0],
      "oponent_id"  =>  $ids[1],
      "winner_id"   =>  $ids[rand(0, 1)],
    ];
  }
}
