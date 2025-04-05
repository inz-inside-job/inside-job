<?php

namespace Database\Seeders;

use App\Models\CompanyClaimSubmission;
use Illuminate\Database\Seeder;

class CompanyClaimSubmissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // Remove all existing companies
        CompanyClaimSubmission::query()->delete();

        // Create 20 companies
        CompanyClaimSubmission::factory(20)->create();
    }
}
