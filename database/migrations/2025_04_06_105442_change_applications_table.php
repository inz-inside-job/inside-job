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
        Schema::table('applications', function (Blueprint $table) {
            $table->string('first_name')->nullable(false);
            $table->string('last_name')->nullable(false);
            $table->string('phone')->nullable(false);
            $table->string('linkedin')->nullable();
            $table->string('portfolio')->nullable();
            $table->string('resume')->nullable(false);
            $table->text('cover_letter')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropColumn('first_name');
            $table->dropColumn('last_name');
            $table->dropColumn('phone');
            $table->dropColumn('linkedin');
            $table->dropColumn('portfolio');
            $table->dropColumn('resume');
            $table->dropColumn('cover_letter');
        });
    }
};
