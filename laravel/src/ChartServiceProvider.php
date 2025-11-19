<?php

namespace Giobi\QuickChart;

use Illuminate\Support\ServiceProvider;

class ChartServiceProvider extends ServiceProvider
{
    /**
     * Register services
     */
    public function register(): void
    {
        $this->mergeConfigFrom(
            __DIR__ . '/../config/quickchart.php',
            'quickchart'
        );

        $this->app->singleton('quickchart', function ($app) {
            return new Chart(config('quickchart.base_url'));
        });
    }

    /**
     * Bootstrap services
     */
    public function boot(): void
    {
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../config/quickchart.php' => config_path('quickchart.php'),
            ], 'quickchart-config');
        }
    }
}
