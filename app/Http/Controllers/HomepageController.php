<?php

namespace App\Http\Controllers;

use App\Data\ReviewData;
use App\Models\Review;
use Inertia\Inertia;

class HomepageController extends Controller
{
    public function view()
    {
        $reviews = Review::inRandomOrder()
            ->limit(5)
            ->get();

        $data = ReviewData::collect($reviews);

        return Inertia::render('homepage', [
            'reviews' => $data,
        ]);

    }

    public function index()
    {
        return Review::all();
    }

    public function show(Review $review)
    {
        return $review;
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json();
    }
}
