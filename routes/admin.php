<?php

use App\Enums\UserRole;
use App\Http\Controllers\Admin\AdminDashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:'.UserRole::ADMIN->value])->group(function () {
    // Route::get('/admin')->name('admin.dashboard');
    Route::get('/admin/submissions', [AdminDashboardController::class, 'index']);
    Route::get('/admin/submissions/{submission}', [AdminDashboardController::class, 'view'])->name('admin.submission');

    Route::post('/admin/submissions/{submission}', [AdminDashboardController::class, 'updateSubmission'])
        ->name('admin.submission.update');

    Route::get('/admin/claims', [AdminDashboardController::class, 'claims'])->name('admin.claims');
    Route::get('/admin/claims/{claim}', [AdminDashboardController::class, 'viewClaim'])->name('admin.claim');
    Route::post('/admin/claims/{claim}', [AdminDashboardController::class, 'updateClaim'])
        ->name('admin.claim.update');

    Route::redirect('/admin', '/admin/submissions');
});
