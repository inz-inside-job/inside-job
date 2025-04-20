<?php

namespace Database\Seeders;

use App\Models\Application;
use App\Models\Company;
use Illuminate\Database\Seeder;

class ApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Application::query()->delete();

        foreach (Company::all() as $company) {
            Application::factory(10)->create([
                'job_id' => $company->jobs->random()->id,
            ]);
        }
    }
}
