<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGamesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('games', function (Blueprint $table) {
      $table->uuid("id")->primary();
      $table->uuid("user_id")->required();
      $table->integer("symbol")->default(0);
      $table->integer("oponent")->default(0);
      $table->integer("size")->required()->default(3);
      $table->uuid("winner")->nullable();
      $table->text("p1_name")->nullable();
      $table->text("p2_name")->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('games');
  }
}
