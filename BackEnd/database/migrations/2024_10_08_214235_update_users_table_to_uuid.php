<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Add a new 'uuid' column
            $table->uuid('uuid')->nullable();
        });

        // Generate UUIDs for existing records
        DB::table('users')->get()->each(function ($user) {
            DB::table('users')
                ->where('id', $user->id)
                ->update(['uuid' => Str::uuid()]);
        });

        Schema::table('users', function (Blueprint $table) {
            // Drop the old integer 'id' column
            $table->dropColumn('id');

            // Rename the 'uuid' column to 'id'
            $table->renameColumn('uuid', 'id');
        });

        // Set 'id' as primary key
        Schema::table('users', function (Blueprint $table) {
            $table->primary('id');
        });
    }

    public function down()
    {
        // Reverse the changes if necessary (if you roll back the migration)
        Schema::table('users', function (Blueprint $table) {
            // Create the old 'id' column again
            $table->id();  // Auto-increment integer
        });

        Schema::table('users', function (Blueprint $table) {
            // Drop the 'id' column (which is now UUID)
            $table->dropColumn('id');
        });

        Schema::table('users', function (Blueprint $table) {
            // Rename 'uuid' back to 'id'
            $table->uuid('uuid')->nullable();
            $table->renameColumn('uuid', 'id');
        });
    }
};
