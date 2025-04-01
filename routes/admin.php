<?php

use App\Enums\UserRole;
use App\Http\Controllers\Admin\AdminDashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:'.UserRole::ADMIN->value])->group(function () {
    Route::get('/admin', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

    Route::get('/admin/submissions/{submission}', [AdminDashboardController::class, 'view'])->name('admin.submission');

    Route::post('/admin/submissions/{submission}', [AdminDashboardController::class, 'update'])
        ->name('admin.submission.update');
});
