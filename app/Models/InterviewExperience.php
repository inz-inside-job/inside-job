<?php

namespace App\Models;

use App\Enums\InterviewDifficulty;
use App\Enums\InterviewExperience as InterviewExperienceEnum;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property int $company_id
 * @property string $job_title
 * @property InterviewDifficulty $difficulty_level
 * @property string|null $interview_questions
 * @property InterviewExperienceEnum $overall_experience
 * @property int $submitted_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InterviewExperience newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InterviewExperience newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InterviewExperience query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InterviewExperience whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InterviewExperience whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InterviewExperience whereDifficultyLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InterviewExperience whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InterviewExperience whereInterviewQuestions($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InterviewExperience whereJobTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InterviewExperience whereOverallExperience($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InterviewExperience whereSubmittedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InterviewExperience whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InterviewExperience whereUserId($value)
 * @mixin \Eloquent
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
        'submitted_date' => 'timestamp',
        'difficulty_level' => InterviewDifficulty::class,
        'overall_experience' => InterviewExperienceEnum::class,
    ];
}
