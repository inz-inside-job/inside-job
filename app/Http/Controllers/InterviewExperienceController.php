<?php

namespace App\Http\Controllers;

use App\Http\Requests\InterviewExperienceRequest;
use App\Models\InterviewExperience;

class InterviewExperienceController extends Controller
{
    public function index()
    {
        return InterviewExperience::all();
    }

    public function store(InterviewExperienceRequest $request)
    {
        return InterviewExperience::create($request->validated());
    }

    public function show(InterviewExperience $interviewExperience)
    {
        return $interviewExperience;
    }

    public function update(InterviewExperienceRequest $request, InterviewExperience $interviewExperience)
    {
        $interviewExperience->update($request->validated());

        return $interviewExperience;
    }

    public function destroy(InterviewExperience $interviewExperience)
    {
        $interviewExperience->delete();

        return response()->json();
    }
}
