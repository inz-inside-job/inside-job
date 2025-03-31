<?php

namespace Database\Seeders;

use App\Models\CompanySubmission;
use Illuminate\Database\Seeder;

class CompanySubmissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // Remove all existing companies
        CompanySubmission::query()->delete();

        // Create 20 companies
        CompanySubmission::factory(20)->create();
    }
}
