<?php

namespace App\Models;

use App\Enums\CompanySubmissionStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperCompanySubmission
 */
class CompanySubmission extends Model
{
    use HasFactory;

    protected $table = 'company_submissions';

    protected $fillable = [
        'name',
        'industry',
        'description',
        'employee_count',
        'founded_year',
        'status',
        'user_id',
    ];

    protected $casts = [
        'founded_year' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeWithPendingCount(Builder $query): Builder
    {
        return $query->addSelect([
            'pending_count' => CompanySubmission::selectRaw('COUNT(*)')
                ->where('company_submissions.status', '=', CompanySubmissionStatus::PENDING->value),
        ]);
    }

    public function scopeWithApprovedCount(Builder $query): Builder
    {
        return $query->addSelect([
            'pending_count' => CompanySubmission::selectRaw('COUNT(*)')
                ->where('company_submissions.status', '=', CompanySubmissionStatus::APPROVED->value),
        ]);
    }

    public function scopeWithRejectedCount(Builder $query): Builder
    {
        return $query->addSelect([
            'pending_count' => CompanySubmission::selectRaw('COUNT(*)')
                ->where('company_submissions.status', '=', CompanySubmissionStatus::REJECTED->value),
        ]);
    }
}
