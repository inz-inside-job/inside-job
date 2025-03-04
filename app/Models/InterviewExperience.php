<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InterviewExperience extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_id',
        'job_title',
        'difficulty_level',
        'interview_questions',
        'overall_experience',
        'submitted_date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    protected function casts(): array
    {
        return [
            'submitted_date' => 'timestamp',
        ];
    }
}
