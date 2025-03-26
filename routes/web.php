<?php

use App\Http\Controllers\CompanyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('homepage');
})->name('home');

Route::get('/companies', [CompanyController::class, 'index'])
    ->name('companies');

Route::get('/jobs', function () {
    return Inertia::render('jobs');
})->name('jobs');

Route::impersonate();

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
