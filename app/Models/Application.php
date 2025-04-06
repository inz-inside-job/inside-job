<?php

namespace App\Models;

use App\Enums\ApplicationStatus;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @mixin IdeHelperApplication
 */
class Application extends Pivot
{
    public $incrementing = true;

    public $table = 'applications';

    public $timestamps = true;

    protected $fillable = [
        'job_id',
        'user_id',
        'status',
        'applied_date',
        'first_name',
        'last_name',
        'phone',
        'linkedin',
        'portfolio',
        'resume',
        'cover_letter',
    ];

    protected $casts = [
        'applied_date' => 'datetime',
        'status' => ApplicationStatus::class,
    ];
}
