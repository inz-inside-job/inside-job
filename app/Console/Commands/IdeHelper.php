<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class IdeHelper extends Command
{
    // @codeCoverageIgnoreStart
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ide-helper:all';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run all IDE Helper commands';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->call('ide-helper:generate');
        $this->call('ide-helper:meta');
        $this->call('ide-helper:models', ['--write-mixin' => true]);

        $this->info('All IDE Helper commands executed successfully.');

        return 0;
    }
    // @codeCoverageIgnoreEnd
}
