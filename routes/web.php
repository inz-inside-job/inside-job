<?php

use App\Http\Controllers\CompanyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Company;
use App\Data\CompanyData;

Route::get('/', function () {
    return Inertia::render('homepage');
})->name('home');

Route::get('/companies', [CompanyController::class, 'index'])
    ->name('companies');

Route::get('/jobs', function () {
    return Inertia::render('jobs');
})->name('jobs');

Route::get('/companies/{company}', function (Company $company) {
    $company->append(['rating', 'average_salary', 'recommended']);
    return Inertia::render('company', ["company" => CompanyData::from($company)]);
})->name('company');

Route::impersonate();

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
 