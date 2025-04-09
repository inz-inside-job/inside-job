<?php

namespace App\Models;

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
        'ceo',
        'type',
    ];

    protected $casts = [
        'founded_year' => 'datetime',
    ];

    // @codeCoverageIgnoreStart
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    // @codeCoverageIgnoreEnd

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
