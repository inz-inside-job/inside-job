<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperCompanyClaimSubmission
 */
class CompanyClaimSubmission extends Model
{
    use HasFactory;

    protected $table = 'claim_company_submission';

    protected $fillable = [
        'company_id',
        'user_id',
        'job_title',
        'email',
        'verification_details',
        'status',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
