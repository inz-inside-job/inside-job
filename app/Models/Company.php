<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Company extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'name',
        'industry',
        'location',
        'website',
        'employee_count',
        'founded_year',
    ];

    protected function casts(): array
    {
        return [
            'founded_year' => 'timestamp',
        ];
    }

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function followers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'companies_followed', 'company_id', 'user_id')
            ->as('followers')
            ->withTimestamps()
            ->withPivot('id', 'followed_date')
            ->using(CompanyFollowed::class);
    }

    public function interviewExperiences(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'interview_experiences', 'company_id', 'user_id')
            ->as('interview_experiences')
            ->withTimestamps()
            ->withPivot('id', 'job_title', 'difficulty_level', 'interview_questions', 'overall_experience', 'submitted_date')
            ->using(InterviewExperience::class);
    }

    public function reviews(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'reviews', 'company_id', 'user_id')
            ->as('reviews')
            ->withTimestamps()
            ->withPivot('id', 'rating', 'review', 'submitted_date')
            ->using(Review::class);
    }

    public function salaries(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'salaries', 'company_id', 'user_id')
            ->as('salaries')
            ->withTimestamps()
            ->withPivot('id', 'job_title', 'salary_amount', 'location', 'submitted_date')
            ->using(Salary::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_company', 'company_id', 'user_id')
            ->as('users')
            ->withTimestamps()
            ->withPivot('id')
            ->using(CompanyUser::class);
    }
}
