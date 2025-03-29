<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Review;
use Illuminate\Database\Seeder;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Remove all existing companies
        Company::query()->delete();

        // Create 20 companies
        $companies = Company::factory(20)->create();

        $logoPaths = glob(base_path('database/seeders/CompanyLogos').'/*.png');
        $headerPaths = glob(base_path('database/seeders/CompanyHeaders').'/*.jpg');

        foreach ($companies as $company) {
            $reviews = Review::factory(5)->for($company)->create();
            $logoPath = $logoPaths[array_rand($logoPaths)];
            $logo = new File($logoPath);
            $logoUrl = Storage::disk('public')->putFileAs('logos', $logo, "$company->slug.png");
            $company->logo = $logoUrl ?? null;

            $headerPath = $headerPaths[array_rand($headerPaths)];
            $header = new File($headerPath);
            $headerUrl = Storage::disk('public')->putFileAs('headers', $header, "$company->slug.png");
            $company->header = $headerUrl ?? null;
            $company->save();
        }
    }
}
