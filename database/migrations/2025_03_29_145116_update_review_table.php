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
        Schema::table('reviews', function (Blueprint $table) {
            $table->json('pros')->nullable(false)->default('[]');
            $table->json('cons')->nullable(false)->default('[]');
            $table->string('position')->nullable(false);
            $table->tinyInteger('work_life_balance')->nullable(false);
            $table->tinyInteger('culture_values')->nullable(false);
            $table->tinyInteger('career_opportunities')->nullable(false);
            $table->tinyInteger('compensation_benefits')->nullable(false);
            $table->tinyInteger('senior_management')->nullable(false);
            $table->boolean('recommend')->nullable(false);
            $table->boolean('approve_of_ceo')->nullable(false);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->dropColumn('pros');
            $table->dropColumn('cons');
            $table->dropColumn('position');
            $table->dropColumn('work_life_balance');
            $table->dropColumn('culture_values');
            $table->dropColumn('career_opportunities');
            $table->dropColumn('compensation_benefits');
            $table->dropColumn('senior_management');
            $table->dropColumn('recommend');
            $table->dropColumn('approve_of_ceo');
        });
    }
};
