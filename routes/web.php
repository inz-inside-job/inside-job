<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\GlobalSearchController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\JobController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomepageController::class, 'view'])->name('home');

Route::get('/companies', [CompanyController::class, 'index'])
    ->name('companies');

Route::get('/companies/{slug}', [CompanyController::class, 'show'])
    ->name('companies.show');

Route::get('/jobs', [JobController::class, 'index'])
    ->name('jobs');

Route::get('/search', [GlobalSearchController::class, 'search'])->name('search');

Route::impersonate();

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
