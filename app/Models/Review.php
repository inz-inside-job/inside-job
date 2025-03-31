<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @mixin IdeHelperReview
 */
class Review extends Pivot
{
    public $incrementing = true;

    public $table = 'reviews';

    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'company_id',
        'rating',
        'review',
        'submitted_date',
    ];

    protected $casts = [
        'submitted_date' => 'timestamp',
    ];
}
