<?php

namespace App\Console\Commands;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;

use function Laravel\Prompts\search;

class AdminUser extends Command implements PromptsForMissingInput
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:user:admin {user}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make user an admin';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $userId = $this->argument('user');

        $user = User::findOrFail($userId);

        $user->assignRole(UserRole::ADMIN);

        $this->info("$user->name ($user->email) is now an admin.");
    }

    /**
     * Prompt for missing input arguments using the returned questions.

     *

     * @return array<string, string>
     */
    protected function promptForMissingArgumentsUsing(): array
    {
        return [
            'user' => fn () => search(
                label: 'Search for a user:',
                placeholder: 'E.g. test@test or John Doe',
                options: function ($value) {
                    $len = strlen($value);
                    if ($len === 0) {
                        return [];
                    }

                    return User::where('email', 'like', "%{$value}%")
                        ->orWhere('name', 'like', "%{$value}%")
                        ->get(['id', 'name', 'email']) // Fetch only necessary columns
                        ->mapWithKeys(fn ($user) => [$user->id => "{$user->name} ({$user->email})"])
                        ->all();
                }
            ),
        ];

    }
}
