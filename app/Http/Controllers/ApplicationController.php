<?php

namespace App\Http\Controllers;

    use App\Http\Requests\ApplicationRequest;
    use App\Models\Application;

class ApplicationController
{
    public function index()
    {
        return Application::all();
    }

    public function store(ApplicationRequest $request)
    {
        return Application::create($request->validated());
    }

    public function show(Application $application)
    {
        return $application;
    }

    public function update(ApplicationRequest $request, Application $application)
    {
        $application->update($request->validated());

        return $application;
    }

    public function destroy(Application $application)
    {
        $application->delete();

        return response()->json();
    }
}
