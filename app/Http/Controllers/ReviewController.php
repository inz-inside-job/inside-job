<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewRequest;
use App\Models\Review;

class ReviewController extends Controller
{
    public function index()
    {
        return Review::all();
    }

    public function store(ReviewRequest $request)
    {
        return Review::create($request->validated());
    }

    public function show(Review $review)
    {
        return $review;
    }

    public function update(ReviewRequest $request, Review $review)
    {
        $review->update($request->validated());

        return $review;
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json();
    }
}
