<?php

namespace Database\Seeders;

use App\Models\Company;
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

        foreach ($companies as $company) {
            $logoPath = $logoPaths[array_rand($logoPaths)];
            $logo = new File($logoPath);
            $logoUrl = Storage::disk('public')->putFileAs('logos', $logo, "$company->slug.png");
            $company->logo = $logoUrl ?? null;
            $company->save();
        }
    }
}
