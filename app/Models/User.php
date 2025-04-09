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
 * @mixin IdeHelperUser
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

    //    public function canImpersonate(): bool
    //    {
    //        return $this->hasRole(UserRole::ADMIN);
    //    }

    //    public function companySubmittions(): HasMany
    //    {
    //        return $this->hasMany(CompanySubmission::class);
    //    }

    //    public function companiesFollowed(): BelongsToMany
    //    {
    //        return $this->belongsToMany(Company::class, 'companies_followed', 'user_id', 'company_id')
    //            ->as('companies_followed')
    //            ->withTimestamps()
    //            ->withPivot('id', 'followed_date')
    //            ->using(CompanyFollowed::class);
    //    }

    //    public function applications(): BelongsToMany
    //    {
    //        return $this->belongsToMany(Job::class, 'applications', 'user_id', 'job_id')
    //            ->as('applications')
    //            ->withTimestamps()
    //            ->withPivot('id', 'status', 'applied_date')
    //            ->using(Application::class);
    //    }
    //
    //    public function reviews(): BelongsToMany
    //    {
    //        return $this->belongsToMany(Company::class, 'reviews', 'user_id', 'company_id')
    //            ->as('reviews')
    //            ->withTimestamps()
    //            ->withPivot('id', 'rating', 'review', 'submitted_date')
    //            ->using(Review::class);
    //    }
    //
    //    public function companies(): BelongsToMany
    //    {
    //        return $this->belongsToMany(Company::class, 'user_company', 'user_id', 'company_id')
    //            ->as('companies')
    //            ->withTimestamps()
    //            ->withPivot('id')
    //            ->using(CompanyUser::class);
    //    }
}
