<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @mixin IdeHelperReview
 */
class Review extends Pivot
{
    use HasFactory;

    public $incrementing = true;

    public $table = 'reviews';

    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'company_id',
        'rating',
        'review',
        'submitted_date',
        'pros',
        'cons',
        'position',
        'approve_of_ceo',
        'recommend',
        'senior_management',
        'compensation_benefits',
        'career_opportunities',
        'culture_values',
        'work_life_balance',
    ];

    protected $casts = [
        'submitted_date' => 'datetime',
        'pros' => 'array',
        'cons' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
