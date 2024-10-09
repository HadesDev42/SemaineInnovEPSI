<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('trainings')->insert([
            'id' => '42949a5e-a4eb-406a-b5da-16f3344aa93c',
            'title' => 'allergies piqure d\'insecte',
            'description' => 'Cette formation vous apprendra à reconnaître les signes d\'une allergie grave après une piqûre d\'insecte et à réagir rapidement. Vous y découvrirez les symptômes d\'une réaction allergique, comment utiliser un auto-injecteur d\'épinéphrine (EpiPen), et les actions à entreprendre pour assurer la sécurité de la personne concernée.',
            'created_at' => '2024-10-09 12:33:09',
            'updated_at' => '2024-10-09 12:33:09',
        ]);
        DB::table('tags')->insert([
            'id' => '1c3e8dc3-7d17-4bbf-94f4-35c04cf3b429',
            'name' => 'EpiPen',
            'created_at' => '2024-10-09 12:33:09',
            'updated_at' => '2024-10-09 12:33:09',
        ]);
        DB::table('tag_trainings')->insert([
            'id' => '42f12aa9-b4c8-4102-a20a-1d132cb30f10',
            'training_id' => '42949a5e-a4eb-406a-b5da-16f3344aa93c',
            'tag_id' => '1c3e8dc3-7d17-4bbf-94f4-35c04cf3b429',
            'created_at' => '2024-10-09 12:33:09',
            'updated_at' => '2024-10-09 12:33:09',
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('trainings')->where('id', '42949a5e-a4eb-406a-b5da-16f3344aa93c')->delete();
        DB::table('tags')->where('id', '1c3e8dc3-7d17-4bbf-94f4-35c04cf3b429')->delete();
        DB::table('tag_trainings')->where('id', '42f12aa9-b4c8-4102-a20a-1d132cb30f10')->delete();
    }
};
