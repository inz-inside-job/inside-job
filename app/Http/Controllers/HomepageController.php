<?php

namespace App\Http\Controllers;

use App\Data\Home\ReviewData;
use App\Models\Review;
use Inertia\Inertia;

class HomepageController extends Controller
{
    public function view()
    {
        $reviews = Review::inRandomOrder()
            ->with('company')
            ->with('user')
            ->limit(5)
            ->get();

        return Inertia::render('homepage', [
            'reviews' => ReviewData::collect($reviews),
        ]);

    }
}
