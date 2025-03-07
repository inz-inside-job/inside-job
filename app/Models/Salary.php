<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Salary extends Pivot
{
    public $incrementing = true;

    public $table = 'salaries';

    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'job_id',
        'job_title',
        'salary_amount',
        'location',
        'submitted_date',
    ];

    protected $casts = [
        'submitted_date' => 'timestamp',
    ];
}
