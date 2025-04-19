<?php

namespace App\Http\Middleware;

use App\Models\Company;
use Closure;
use Gate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class HandleViewDashboard
{
    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param  Closure(Request): (Response|RedirectResponse)  $next
     */
    public function handle($request, Closure $next): Response|RedirectResponse
    {
        Gate::authorize('index', Company::class);

        return $next($request);
    }
}
