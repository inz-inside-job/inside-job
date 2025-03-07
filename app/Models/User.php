<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function companiesFollowed(): BelongsToMany
    {
        return $this->belongsToMany(Company::class, 'companies_followed', 'user_id', 'company_id')
            ->as('companies_followed')
            ->withPivot('followed_date');
    }

    public function applications(): BelongsToMany
    {
        return $this->belongsToMany(Job::class, 'applications', 'user_id', 'job_id')
            ->as('applications')
            ->withPivot('status', 'applied_date');
    }

    public function interviewExperiences(): BelongsToMany
    {
        return $this->belongsToMany(Company::class, 'interview_experiences', 'user_id', 'company_id')
            ->as('interview_experiences')
            ->withPivot('job_title', 'difficulty_level', 'interview_questions', 'overall_experience', 'submitted_date');
    }

    public function reviews(): BelongsToMany
    {
        return $this->belongsToMany(Company::class, 'reviews', 'user_id', 'company_id')
            ->as('reviews')
            ->withPivot('rating', 'review', 'submitted_date');
    }

    public function salaries(): BelongsToMany
    {
        return $this->belongsToMany(Company::class, 'salaries', 'user_id', 'company_id')
            ->as('salaries')
            ->withPivot('job_title', 'salary_amount', 'location', 'submitted_date');
    }
}
