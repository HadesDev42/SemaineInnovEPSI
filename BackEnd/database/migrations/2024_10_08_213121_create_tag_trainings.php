<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tag_trainings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('training_id');  // Foreign key to trainings table
            $table->uuid('tag_id');  // Foreign key to tags table
            $table->timestamps();
            $table->foreign('training_id')->references('id')->on('trainings')->onDelete('cascade');
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tag_trainings');
    }
};
