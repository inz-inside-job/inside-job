<?php

namespace App\Providers;

use App\Enums\UserRole;
use App\Extensions\LaravelData\PrecognitivelyValidatePropertiesDataPipe;
use App\Search\GlobalSearch;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Spatie\LaravelData\DataPipes\ValidatePropertiesDataPipe;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // @codeCoverageIgnoreStart
        // Register Telescope only in local environment
        if ($this->app->environment('local')) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
        }
        // @codeCoverageIgnoreEnd
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Replace validation pipe for laravel-data with a custom one that supports precognitive validation
        $this->app->bind(ValidatePropertiesDataPipe::class, PrecognitivelyValidatePropertiesDataPipe::class);

        Vite::prefetch(concurrency: 3);

        // Register the global search
        GlobalSearch::bootSearchable();

        // A few failsafes to prevent data loss and performance issues
        Model::shouldBeStrict(! $this->app->isProduction());
        Model::automaticallyEagerLoadRelationships();
        DB::prohibitDestructiveCommands($this->app->isProduction());

        // Do not encrypt the appearance cookie
        EncryptCookies::except('appearance');

        // Only allow admin users to perform any action
        Gate::before(function ($user, $ability) {
            return $user->hasRole(UserRole::ADMIN) ? true : null;
        });
    }
}
