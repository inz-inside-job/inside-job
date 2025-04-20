<?php

use App\Http\Controllers\Dashboard\CompanyDashboardController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth', 'prefix' => 'dashboard'], function () {
    Route::get('/', [CompanyDashboardController::class, 'dashboard'])->name('dashboard');

    Route::group(['prefix' => '{company}'], function () {
        Route::get('edit', [CompanyDashboardController::class, 'edit'])
            ->name('dashboard.view');

        Route::post('edit', [CompanyDashboardController::class, 'update'])
            ->name('dashboard.edit');
    });
});
