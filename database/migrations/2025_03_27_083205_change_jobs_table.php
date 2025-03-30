<?php

use App\Enums\EmploymentExperience;
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
        Schema::table('jobs', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->unique(['slug', 'company_id']);
            $table->dropColumn('salary_range');
            $table->unsignedBigInteger('salary_min');
            $table->unsignedBigInteger('salary_max');
            $table->enum('employment_experience', array_column(EmploymentExperience::cases(), 'value'));
            $table->json('requirements')->default('[]');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->string('salary_range')->nullable();
            $table->dropColumn('salary_min');
            $table->dropColumn('salary_max');
            $table->dropColumn('employment_experience');
            $table->dropUnique(['slug', 'company_id']);
            $table->unique(['slug']);
            $table->dropColumn('requirements');
        });
    }
};
