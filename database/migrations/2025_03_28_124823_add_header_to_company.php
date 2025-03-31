<?php

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
        Schema::table('companies', function (Blueprint $table) {
            $table->string('header')->nullable()->default(null);
            $table->string('ceo')->nullable(false);
            $table->text('mission')->nullable()->default(null);
            $table->json('benefits')->nullable()->default('[]');
            $table->enum('type', array_column(CompanyType::cases(), 'value'));

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn('header');
            $table->dropColumn('ceo');
            $table->dropColumn('mission');
            $table->dropColumn('benefits');
            $table->dropColumn('type');
        });
    }
};
