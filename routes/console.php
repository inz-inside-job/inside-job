<?php

use Illuminate\Support\Facades\Schedule;

if (app()->environment('local')) {
    Schedule::command('telescope:prune')->daily();
}
