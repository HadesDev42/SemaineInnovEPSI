<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->uuid('training_id');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('training_id')->references('id')->on('trainings')->onDelete('cascade');
            // Ensure the combination of user_id and training_id is unique
            $table->unique(['user_id', 'training_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('favorites');
    }
};
