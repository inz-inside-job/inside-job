<?php

namespace App\Models;

use App\Enums\UserRole;
use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Lab404\Impersonate\Models\Impersonate;
use Spatie\Permission\Traits\HasRoles;

/**
 * @property int $id
 * @property string $name
 * @property string|null $image
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Job> $applications
 * @property-read int|null $applications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Company> $companies
 * @property-read int|null $companies_count
 * @property-read \App\Models\CompanyFollowed|null $companies_followed
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Company> $companiesFollowed
 * @property-read int|null $companies_followed_count
 * @property-read \App\Models\InterviewExperience|null $interview_experiences
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Company> $interviewExperiences
 * @property-read int|null $interview_experiences_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Company> $reviews
 * @property-read int|null $reviews_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Role> $roles
 * @property-read int|null $roles_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Company> $salaries
 * @property-read int|null $salaries_count
 *
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User permission($permissions, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User role($roles, $guard = null, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutPermission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutRole($roles, $guard = null)
 *
 * @mixin \Eloquent
 */
class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, HasRoles, Impersonate, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'image',
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

    public function canImpersonate(): bool
    {
        return $this->hasRole(UserRole::ADMIN);
    }

    public function companySubmittions(): HasMany
    {
        return $this->hasMany(CompanySubmission::class);
    }

    public function companiesFollowed(): BelongsToMany
    {
        return $this->belongsToMany(Company::class, 'companies_followed', 'user_id', 'company_id')
            ->as('companies_followed')
            ->withTimestamps()
            ->withPivot('id', 'followed_date')
            ->using(CompanyFollowed::class);
    }

    public function applications(): BelongsToMany
    {
        return $this->belongsToMany(Job::class, 'applications', 'user_id', 'job_id')
            ->as('applications')
            ->withTimestamps()
            ->withPivot('id', 'status', 'applied_date')
            ->using(Application::class);
    }

    public function interviewExperiences(): BelongsToMany
    {
        return $this->belongsToMany(Company::class, 'interview_experiences', 'user_id', 'company_id')
            ->as('interview_experiences')
            ->withTimestamps()
            ->withPivot('id', 'job_title', 'difficulty_level', 'interview_questions', 'overall_experience', 'submitted_date')
            ->using(InterviewExperience::class);
    }

    public function reviews(): BelongsToMany
    {
        return $this->belongsToMany(Company::class, 'reviews', 'user_id', 'company_id')
            ->as('reviews')
            ->withTimestamps()
            ->withPivot('id', 'rating', 'review', 'submitted_date')
            ->using(Review::class);
    }

    public function salaries(): BelongsToMany
    {
        return $this->belongsToMany(Company::class, 'salaries', 'user_id', 'company_id')
            ->as('salaries')
            ->withTimestamps()
            ->withPivot('id', 'job_title', 'salary_amount', 'location', 'submitted_date')
            ->using(Salary::class);
    }

    public function companies(): BelongsToMany
    {
        return $this->belongsToMany(Company::class, 'user_company', 'user_id', 'company_id')
            ->as('companies')
            ->withTimestamps()
            ->withPivot('id')
            ->using(CompanyUser::class);
    }
}
