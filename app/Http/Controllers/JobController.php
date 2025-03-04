<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobRequest;
use App\Models\Job;

class JobController
{
    public function index()
    {
        return Job::all();
    }

    public function store(JobRequest $request)
    {
        return Job::create($request->validated());
    }

    public function show(Job $job)
    {
        return $job;
    }

    public function update(JobRequest $request, Job $job)
    {
        $job->update($request->validated());

        return $job;
    }

    public function destroy(Job $job)
    {
        $job->delete();

        return response()->json();
    }
}
