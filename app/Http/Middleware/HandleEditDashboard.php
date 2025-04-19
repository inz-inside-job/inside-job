<?php

namespace App\Http\Middleware;

use Closure;
use Gate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class HandleEditDashboard
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response|RedirectResponse)  $next
     */
    public function handle(Request $request, Closure $next): Response|RedirectResponse
    {
        $company = $request->route()->parameter('company');

        Gate::authorize('update', $company);

        return $next($request);
    }
}
