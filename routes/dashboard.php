<?php

use App\Http\Controllers\Dashboard\CompanyDashboardController;
use App\Http\Middleware\HandleEditDashboard;
use App\Http\Middleware\HandleViewDashboard;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', HandleViewDashboard::class])->group(function () {
    Route::get('/dashboard', [CompanyDashboardController::class, 'dashboard'])->name('dashboard');
    Route::get('/dashboard/{slug}/edit', [CompanyDashboardController::class, 'edit'])->name('dashboard.view');

    Route::post('/dashboard/{company}/edit', [CompanyDashboardController::class, 'update'])
        ->middleware([HandleEditDashboard::class])
        ->name('dashboard.edit');
});
