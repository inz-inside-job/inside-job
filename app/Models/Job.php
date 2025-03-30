<?php

namespace App\Models;

use App\Enums\EmploymentExperience;
use App\Enums\EmploymentType;
use Database\Factories\JobFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

/**
 * @property int $id
 * @property int $company_id
 * @property string $title
 * @property string $location
 * @property EmploymentType $employment_type
 * @property EmploymentExperience $employment_experience
 * @property int $posted_date
 * @property string $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $slug
 * @property int $salary_min
 * @property int $salary_max
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $applications
 * @property-read int|null $applications_count
 * @property-read \App\Models\Company $company
 *
 * @method static \Database\Factories\JobFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job whereEmploymentExperience($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job whereEmploymentType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job wherePostedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job whereSalaryMax($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job whereSalaryMin($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class Job extends Model
{
    /** @use HasFactory<JobFactory> */
    use HasFactory, HasSlug;

    protected $fillable = [
        'company_id',
        'title',
        'location',
        'employment_type',
        'employment_experience',
        'posted_date',
        'salary_min',
        'salary_max',
        'description',
    ];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug')
            ->extraScope(function ($query) {
                $query->where('company_id', $this->company_id);
            });
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function applications(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'applications', 'job_id', 'user_id')
            ->as('applications')
            ->withTimestamps()
            ->withPivot('id', 'status', 'applied_date')
            ->using(Application::class);
    }

    protected function casts(): array
    {
        return [
            'posted_date' => 'timestamp',
            'employment_type' => EmploymentType::class,
            'employment_experience' => EmploymentExperience::class,
            'salary_min' => 'int',
            'salary_max' => 'int',
            'requirements' => 'array',
        ];
    }
}
