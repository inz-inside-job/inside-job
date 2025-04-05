<?php

namespace App\Models;

use Database\Factories\CompanyFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

/**
 * @mixin IdeHelperCompany
 */
class Company extends Model
{
    /** @use HasFactory<CompanyFactory> */
    use HasFactory, HasSlug, Searchable;

    protected $fillable = [
        'name',
        'industry',
        'location',
        'website',
        'employee_count',
        'founded_year',
        'description',
        'ceo',
        'type',
    ];

    protected function casts(): array
    {
        return [
            'benefits' => 'array',
            'founded_year' => 'datetime',
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

    public function jobs(): HasMany
    {
        return $this->hasMany(Job::class);
    }

    public function interviewExperiences(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'interview_experiences', 'company_id', 'user_id')
            ->as('interview_experiences')
            ->withTimestamps()
            ->withPivot('id', 'job_title', 'difficulty_level', 'interview_questions', 'overall_experience', 'submitted_date')
            ->using(InterviewExperience::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function reviewUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'reviews', 'company_id', 'user_id')
            ->as('reviews')
            ->withTimestamps()
            ->withPivot('id', 'rating', 'review', 'submitted_date')
            ->using(Review::class);
    }

    public function getRatingAttribute(): ?float
    {
        // If scoped with rating
        if (isset($this->attributes['rating']) && $this->attributes['rating'] !== null) {
            return $this->attributes['rating'];
        }

        // If not scoped, calculate
        $average = $this->reviews->avg('reviews.rating');

        return $average !== null ? $average : 0;
    }

    public function scopeWithRating(Builder $query): Builder
    {
        return $query->addSelect([
            'rating' => Review::selectRaw('COALESCE(AVG(reviews.rating), 0)')
                ->whereColumn('companies.id', 'reviews.company_id'),
        ]);
    }

    public function getRecommendAttribute(): ?float
    {
        // If scoped with recommended
        if (isset($this->attributes['recommend']) && $this->attributes['recommend'] !== null) {
            return $this->attributes['recommend'];
        }

        // If not scoped, calculate
        $totalReviews = $this->reviews->count();
        if ($totalReviews === 0) {
            return 0;
        }

        $recommendedCount = $this->reviews->where('recommend', true)->count();
        $recommendedPercentage = ($recommendedCount / $totalReviews) * 100;

        return $recommendedPercentage;
    }

    public function scopeWithRecommend(Builder $query): Builder
    {
        return $query->addSelect([
            'recommend' => Review::selectRaw('
                COALESCE(100 * COUNT(CASE WHEN reviews.recommend = true THEN 1 END) / NULLIF(COUNT(*), 0), 0)
            ')->whereColumn('companies.id', 'reviews.company_id'),
        ]);
    }

    public function salaries(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'salaries', 'company_id', 'user_id')
            ->as('salaries')
            ->withTimestamps()
            ->withPivot('id', 'job_title', 'salary_amount', 'location', 'submitted_date')
            ->using(Salary::class);
    }

    public function getAverageSalarayAttribute(): ?float
    {
        // If scoped with rating
        if (isset($this->attributes['average_salary']) && $this->attributes['average_salary'] !== null) {
            return $this->attributes['average_salary'];
        }

        // If not scoped, calculate
        $average = $this->jobs()->avg('job.salary_min');

        return $average !== null ? $average : 0;
    }

    public function scopeWithAverageSalary(Builder $query): Builder
    {
        return $query->addSelect([
            'average_salary' => Job::selectRaw('COALESCE(AVG(jobs.salary_min), 0)')
                ->whereColumn('companies.id', 'jobs.company_id'),
        ]);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_company', 'company_id', 'user_id')
            ->as('users')
            ->withTimestamps()
            ->withPivot('id')
            ->using(CompanyUser::class);
    }

    public function getApproveOfCeoAttribute(): ?float
    {
        // If scoped with approve_of_ceo
        if (isset($this->attributes['approve_of_ceo']) && $this->attributes['approve_of_ceo'] !== null) {
            return $this->attributes['approve_of_ceo'];
        }

        // If not scoped, calculate
        $totalReviews = $this->reviews->count();
        if ($totalReviews === 0) {
            return 0;
        }

        $approveOfCeo = $this->reviews->where('approve_of_ceo', true)->count();
        $approvePercent = ($approveOfCeo / $totalReviews) * 100;

        return $approvePercent;
    }

    public function scopeWithApproveOfCeo(Builder $query): Builder
    {
        return $query->addSelect([
            'approve_of_ceo' => Review::selectRaw('
               COALESCE(100 * COUNT(CASE WHEN reviews.approve_of_ceo = true THEN 1 END) / NULLIF(COUNT(*), 0), 0)
           ')->whereColumn('companies.id', 'reviews.company_id'),
        ]);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
