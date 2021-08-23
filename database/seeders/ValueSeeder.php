<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Value;

class ValueSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    Value::factory()->count(36)->create();
  }
}
