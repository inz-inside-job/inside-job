<?php

namespace App\Models;

use Database\Factories\CompanyFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

/**
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string|null $logo
 * @property string $industry
 * @property string|null $location
 * @property string|null $website
 * @property int $employee_count
 * @property int $founded_year
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $slug
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $followers
 * @property-read int|null $followers_count
 * @property-read float|null $average_salaray
 * @property-read float|null $rating
 * @property-read float|null $recommended
 * @property-read \App\Models\InterviewExperience|null $interview_experiences
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $interviewExperiences
 * @property-read int|null $interview_experiences_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $reviews
 * @property-read int|null $reviews_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $salaries
 * @property-read int|null $salaries_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 *
 * @method static \Database\Factories\CompanyFactory factory($count = null, $state = [])
 * @method static Builder<static>|Company newModelQuery()
 * @method static Builder<static>|Company newQuery()
 * @method static Builder<static>|Company query()
 * @method static Builder<static>|Company whereCreatedAt($value)
 * @method static Builder<static>|Company whereDescription($value)
 * @method static Builder<static>|Company whereEmployeeCount($value)
 * @method static Builder<static>|Company whereFoundedYear($value)
 * @method static Builder<static>|Company whereId($value)
 * @method static Builder<static>|Company whereIndustry($value)
 * @method static Builder<static>|Company whereLocation($value)
 * @method static Builder<static>|Company whereLogo($value)
 * @method static Builder<static>|Company whereName($value)
 * @method static Builder<static>|Company whereSlug($value)
 * @method static Builder<static>|Company whereUpdatedAt($value)
 * @method static Builder<static>|Company whereWebsite($value)
 * @method static Builder<static>|Company withAverageSalary()
 * @method static Builder<static>|Company withRating()
 * @method static Builder<static>|Company withRecommended()
 *
 * @mixin \Eloquent
 */
class Company extends Model
{
    /** @use HasFactory<CompanyFactory> */
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

    public function getRecommendedAttribute(): ?float
    {
        // If scoped with rating
        if (isset($this->attributes['recommended']) && $this->attributes['recommended'] !== null) {
            return $this->attributes['recommended'];
        }

        // If not scoped, calculate
        $recommended = $this->reviews->filter(fn ($review) => $review->rating > 2.5)->count() / $this->reviews->count() * 100;

        return $recommended !== null ? $recommended : 0;
    }

    public function scopeWithRecommended(Builder $query): Builder
    {
        return $query->addSelect([
            'recommend' => Review::selectRaw('
                COALESCE(100 * COUNT(CASE WHEN reviews.rating > 2.5 THEN 1 END) / NULLIF(COUNT(*), 0), 0)
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
        $average = $this->salaries->avg('salaries.salary_amount');

        return $average !== null ? $average : 0;
    }

    public function scopeWithAverageSalary(Builder $query): Builder
    {
        return $query->addSelect([
            'average_salary' => Salary::selectRaw('COALESCE(AVG(salaries.salary_amount), 0)')
                ->whereColumn('companies.id', 'salaries.company_id'),
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
}
