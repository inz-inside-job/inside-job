<?php

use App\Enums\InterviewDifficulty;
use App\Enums\InterviewExperience;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('interview_experiences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('company_id')->constrained('companies');
            $table->string('job_title');
            $table->enum('difficulty_level', array_column(InterviewDifficulty::cases(), 'value'));
            $table->text('interview_questions');
            $table->enum('overall_experience', array_column(InterviewExperience::cases(), 'value'));
            $table->timestamp('submitted_date');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('interview_experiences');
    }
};
