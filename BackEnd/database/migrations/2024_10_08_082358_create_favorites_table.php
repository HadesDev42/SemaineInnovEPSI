<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // ID de l'utilisateur
            $table->foreignId('video_id')->constrained()->onDelete('cascade'); // ID de la vidéo
            $table->timestamps();
            $table->unique(['user_id', 'video_id']); // Assurer l'unicité pour un utilisateur et une vidéo
        });
    }

    public function down()
    {
        Schema::dropIfExists('favorites');
    }
};
