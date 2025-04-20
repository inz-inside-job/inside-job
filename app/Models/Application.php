<?php

namespace App\Models;

use App\Enums\ApplicationStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @mixin IdeHelperApplication
 */
class Application extends Pivot
{
    use HasFactory;

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

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
