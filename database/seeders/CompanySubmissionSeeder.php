<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\CompanySubmission;
use Illuminate\Database\Seeder;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

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
