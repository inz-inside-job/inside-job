<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('homepage');
})->name('home');

Route::get('/companies', function () {
    return Inertia::render('companies');
})->name('companies');

Route::impersonate();

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
