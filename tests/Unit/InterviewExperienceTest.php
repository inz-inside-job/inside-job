<?php

use App\Enums\InterviewExperience;

it('has all interview experience cases', function () {
    $cases = InterviewExperience::cases();

    expect($cases)->toHaveCount(3);
    expect($cases)->toContain(InterviewExperience::POSITIVE);
    expect($cases)->toContain(InterviewExperience::NEGATIVE);
    expect($cases)->toContain(InterviewExperience::NEUTRAL);
});
