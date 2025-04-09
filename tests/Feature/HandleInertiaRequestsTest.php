<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

// it('shares correct data', function () {
//    $middleware = new HandleInertiaRequests;
//    $request = Request::create('/');
//    $user = User::factory()->create();
//    $request->setUserResolver(fn () => $user);
//
//    Config::set('app.name', 'TestApp');
//
//    $shared = $middleware->share($request);
//
//    expect($shared['name'])->toBe('TestApp');
//    expect($shared['auth']['user'])->toBe($user);
//    expect($shared['auth']['isAdmin'])->toBeFalse();
//    expect($shared['ziggy']['location'])->toBe('/');
// });
