<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\HomepageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomepageController::class, 'view'])->name('home');

Route::get('/companies', [CompanyController::class, 'index'])
    ->name('companies');

Route::get('/jobs', function () {
    return Inertia::render('jobs');
})->name('jobs');

Route::get('/companies/{slug}', [CompanyController::class, 'show'])->name('company');
Route::impersonate();

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
