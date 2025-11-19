# QuickChart Laravel Package

Laravel package for [QuickChart](https://quickchart.giobi.workers.dev) - Server-side Chart.js rendering with Cloudflare Workers.

## Features

- ✅ Fluent API for chart generation
- ✅ Laravel Facade support
- ✅ Cached globally via Cloudflare KV (10-day TTL)
- ✅ Multiple chart types: bar, line, pie, doughnut, radar
- ✅ Zero-ops deployment (Cloudflare Workers)
- ✅ Ultra-fast response times (~30ms cached, ~450ms uncached)

## Installation

```bash
composer require giobi/quickchart-laravel
```

### Publish Config (Optional)

```bash
php artisan vendor:publish --tag=quickchart-config
```

This creates `config/quickchart.php` where you can customize the base URL.

## Usage

### Basic Examples

```php
use Giobi\QuickChart\Facades\Chart;

// Bar chart
{!! Chart::bar([10, 20, 30, 25])
    ->labels(['Q1', 'Q2', 'Q3', 'Q4'])
    ->title('Sales 2024')
    ->render() !!}

// Line chart
{!! Chart::line([5, 10, 15, 10, 20])
    ->labels(['Jan', 'Feb', 'Mar', 'Apr', 'May'])
    ->title('Traffic')
    ->size(600, 300)
    ->render() !!}

// Pie chart
{!! Chart::pie([30, 50, 20])
    ->labels(['Red', 'Blue', 'Yellow'])
    ->title('Colors')
    ->render() !!}
```

### Method Chaining

```php
Chart::bar([100, 200, 150, 300])
    ->labels(['Jan', 'Feb', 'Mar', 'Apr'])
    ->title('Monthly Revenue')
    ->size(800, 400)
    ->backgroundColor('rgba(54, 162, 235, 0.5)')
    ->borderColor('rgba(54, 162, 235, 1)')
    ->render();
```

### Available Methods

#### Static Constructors
- `Chart::bar(array $data)` - Create bar chart
- `Chart::line(array $data)` - Create line chart
- `Chart::pie(array $data)` - Create pie chart
- `Chart::doughnut(array $data)` - Create doughnut chart
- `Chart::radar(array $data)` - Create radar chart

#### Configuration Methods
- `->labels(array $labels)` - Set axis/slice labels
- `->title(string $title)` - Set chart title
- `->size(int $width, int $height)` - Set dimensions
- `->width(int $width)` - Set width only
- `->height(int $height)` - Set height only
- `->backgroundColor(string $color)` - Set bar/line background color
- `->borderColor(string $color)` - Set border color

#### Output Methods
- `->render(array $attributes = [])` - Render as `<img>` tag
- `->toHtml()` - Alias for `render()`
- `->url()` - Get raw chart URL
- `->__toString()` - Auto-render when cast to string

### Custom Attributes

```php
Chart::bar([10, 20, 30])
    ->labels(['A', 'B', 'C'])
    ->render([
        'class' => 'chart-image',
        'loading' => 'lazy',
        'alt' => 'Sales Chart'
    ]);

// Output:
// <img src="..." class="chart-image" loading="lazy" alt="Sales Chart">
```

### Get URL Only

```php
$url = Chart::bar([10, 20, 30])
    ->labels(['A', 'B', 'C'])
    ->url();

// https://quickchart.giobi.workers.dev/chart?type=bar&data=10,20,30&labels=A,B,C&width=800&height=400
```

### Blade Templates

```blade
<!-- Simple bar chart -->
{!! Chart::bar([10, 20, 30])->labels(['A', 'B', 'C'])->render() !!}

<!-- Line chart with styling -->
<div class="chart-container">
    {!! Chart::line([5, 10, 15, 20])
        ->title('Growth')
        ->size(600, 300)
        ->render(['class' => 'img-fluid']) !!}
</div>

<!-- Auto-rendering (toString) -->
{{ Chart::pie([30, 50, 20])->labels(['Red', 'Blue', 'Yellow']) }}
```

### Controller Example

```php
namespace App\Http\Controllers;

use Giobi\QuickChart\Facades\Chart;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function index(): View
    {
        $salesChart = Chart::bar([100, 150, 120, 200])
            ->labels(['Q1', 'Q2', 'Q3', 'Q4'])
            ->title('Quarterly Sales')
            ->size(800, 400);

        $trafficChart = Chart::line([1200, 1900, 3000, 5000])
            ->labels(['Week 1', 'Week 2', 'Week 3', 'Week 4'])
            ->title('Weekly Traffic');

        return view('dashboard', [
            'salesChart' => $salesChart,
            'trafficChart' => $trafficChart
        ]);
    }
}
```

```blade
<!-- dashboard.blade.php -->
<div class="row">
    <div class="col-md-6">
        <h3>Sales</h3>
        {!! $salesChart->render(['class' => 'img-fluid']) !!}
    </div>
    <div class="col-md-6">
        <h3>Traffic</h3>
        {!! $trafficChart->render(['class' => 'img-fluid']) !!}
    </div>
</div>
```

## Configuration

### Environment Variables

Add to `.env`:

```env
QUICKCHART_URL=https://quickchart.giobi.workers.dev
```

### Config File

After publishing the config (`config/quickchart.php`):

```php
return [
    'base_url' => env('QUICKCHART_URL', 'https://quickchart.giobi.workers.dev'),
];
```

## Caching

Charts are automatically cached for **10 days** using Cloudflare KV:

- **Cache MISS**: ~450ms (render + cache write)
- **Cache HIT**: ~30ms (edge-cached PNG)
- **Same configuration = same cached image**
- **Global edge distribution** (300+ Cloudflare locations)

### Verify Cache Status

Check the `X-Cache` header:

```bash
curl -I "https://quickchart.giobi.workers.dev/chart?type=bar&data=10,20,30"
# X-Cache: MISS (first request)
# X-Cache: HIT  (subsequent requests)
```

## Requirements

- PHP 8.1+
- Laravel 10.x or 11.x

## Testing

```bash
cd laravel/
composer install
vendor/bin/phpunit
```

## License

MIT License

## Credits

- Built with [QuickChart Worker](https://github.com/giobi/quickchart)
- Powered by [Cloudflare Workers](https://workers.cloudflare.com/)
- Chart rendering via [Chart.js](https://www.chartjs.org/)

## Links

- [QuickChart API Docs](https://quickchart.giobi.workers.dev)
- [GitHub Repository](https://github.com/giobi/quickchart)
- [Cloudflare Workers](https://workers.cloudflare.com/)
