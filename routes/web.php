<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('homepage');
})->name('home');

Route::get('/companies', [CompanyController::class, 'index'])
    ->name('companies');

Route::get('/companies/{company}', [CompanyController::class, 'show'])
    ->name('companies.show');

Route::get('/jobs', [JobController::class, 'index'])
    ->name('jobs');

Route::impersonate();

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
