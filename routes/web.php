<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\GlobalSearchController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\JobController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomepageController::class, 'view'])->name('home');

Route::group(['prefix' => 'companies'], function () {
    Route::get('/', [CompanyController::class, 'index'])
        ->name('companies');

    Route::get('{slug}', [CompanyController::class, 'show'])
        ->name('companies.show');

    Route::group(['middleware' => 'auth'], function () {
        Route::post('{company}/claim', [CompanyController::class, 'submitClaim'])
            ->name('companies.submitClaim');

        Route::post('{company}/reviews', [CompanyController::class, 'storeReview'])
            ->name('companies.reviews.store');

        Route::post('{company}/follow', [CompanyController::class, 'follow'])
            ->name('companies.follow');

        Route::post('{company}/unfollow', [CompanyController::class, 'unfollow'])
            ->name('companies.unfollow');

        Route::post('submit', [CompanyController::class, 'submit'])
            ->name('companies.submit');
    });
});

Route::group(['prefix' => 'jobs'], function () {

    Route::get('/', [JobController::class, 'index'])
        ->name('jobs');

    Route::group(['middleware' => 'auth'], function () {
        Route::get('{slug}', [JobController::class, 'show'])
            ->name('jobs.show');

        Route::get('{slug}/apply', [JobController::class, 'apply'])
            ->name('jobs.apply');

        Route::post('{job}/apply', [JobController::class, 'storeApplication'])
            ->name('jobs.apply.store');
    });
});

Route::get('/search', [GlobalSearchController::class, 'search'])->name('search');

Route::impersonate();

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
