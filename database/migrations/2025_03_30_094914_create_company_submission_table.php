<?php

use App\Enums\CompanySubmissionStatus;
use App\Enums\CompanyType;
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
        Schema::create('company_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('industry');
            $table->text('description');
            $table->integer('employee_count');
            $table->timestamp('founded_year');
            $table->string('ceo');
            $table->enum('type', array_column(CompanyType::cases(), 'value'));
            $table->enum('status', array_column(CompanySubmissionStatus::cases(), 'value'))->default(CompanySubmissionStatus::PENDING);
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_submissions');
    }
};
