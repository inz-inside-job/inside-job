<?php

namespace App\Providers;

use Laravel\Telescope\Telescope;
use Laravel\Telescope\TelescopeApplicationServiceProvider;

class TelescopeServiceProvider extends TelescopeApplicationServiceProvider
{
    // @codeCoverageIgnoreStart
    /**
     * Register any application services.
     */
    public function register(): void
    {
        Telescope::night();
    }
    // @codeCoverageIgnoreEnd
}
