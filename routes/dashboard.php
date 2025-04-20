<?php

use App\Http\Controllers\Dashboard\CompanyDashboardController;
use App\Http\Controllers\Dashboard\CompanyJobsController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth', 'prefix' => 'dashboard'], function () {
    Route::get('/', [CompanyDashboardController::class, 'dashboard'])->name('dashboard');

    Route::group(['prefix' => '{company}'], function () {
        Route::get('edit', [CompanyDashboardController::class, 'edit'])
            ->name('dashboard.view');

        Route::post('edit', [CompanyDashboardController::class, 'update'])
            ->name('dashboard.edit');

        Route::group(['prefix' => 'jobs'], function () {
            Route::get('/', [CompanyJobsController::class, 'index'])
                ->name('dashboard.jobs');

            Route::get('create', [CompanyJobsController::class, 'create'])
                ->name('dashboard.jobs.create');

            Route::post('create', [CompanyJobsController::class, 'store'])
                ->name('dashboard.jobs.store');

            Route::get('{job}', [CompanyJobsController::class, 'edit'])
                ->name('dashboard.jobs.edit');

            Route::post('{job}', [CompanyJobsController::class, 'update'])
                ->name('dashboard.jobs.update');

            Route::delete('{job}', [CompanyJobsController::class, 'destroy'])
                ->name('dashboard.jobs.destroy');
        });
    });
});
