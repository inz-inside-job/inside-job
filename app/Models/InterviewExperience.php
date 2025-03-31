<?php

namespace App\Models;

use App\Enums\InterviewDifficulty;
use App\Enums\InterviewExperience as InterviewExperienceEnum;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @mixin IdeHelperInterviewExperience
 */
class InterviewExperience extends Pivot
{
    public $incrementing = true;

    public $table = 'interview_experiences';

    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'company_id',
        'job_title',
        'difficulty_level',
        'interview_questions',
        'overall_experience',
        'submitted_date',
    ];

    protected $casts = [
        'submitted_date' => 'datetime',
        'difficulty_level' => InterviewDifficulty::class,
        'overall_experience' => InterviewExperienceEnum::class,
    ];
}
