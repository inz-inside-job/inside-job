<?php

namespace Database\Seeders;

use App\Models\Company;
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

        $companies = Company::all();

        foreach ($companies as $company) {
            // Create company claims for half of the companies
            if ($company->id % 2 == 0) {
                CompanyClaimSubmission::factory()->for($company)->create();
            }
        }
    }
}
