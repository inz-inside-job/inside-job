<?php

namespace App\Models;

use App\Enums\ApplicationStatus;
use Illuminate\Database\Eloquent\Relations\Pivot;

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
    ];

    protected $casts = [
        'applied_date' => 'timestamp',
        'status' => ApplicationStatus::class,
    ];
}
