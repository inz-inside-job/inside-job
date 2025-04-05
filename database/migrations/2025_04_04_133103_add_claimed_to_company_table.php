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
        Schema::table('companies', function (Blueprint $table) {
            $table->boolean('claimed')->default(false)->after('slug');
            $table->foreignId('claimed_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete()
                ->after('claimed');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropForeign(['claimed_by']);
            $table->dropColumn('claimed_by');
            $table->dropColumn('claimed');
        });
    }
};
