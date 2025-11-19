// Auto-generated from demo/index.html
export const demoHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuickChart Laravel Package - Demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet">
    <style>
        body {
            padding-top: 20px;
            padding-bottom: 40px;
        }
        .chart-container {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
        }
        .chart-container img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 20px auto;
        }
        pre[class*="language-"] {
            border-radius: 8px;
            font-size: 14px;
        }
        .feature-badge {
            display: inline-block;
            padding: 4px 12px;
            font-size: 12px;
            font-weight: 600;
            border-radius: 12px;
            margin-right: 8px;
            margin-bottom: 8px;
        }
        .badge-cache {
            background: #d1ecf1;
            color: #0c5460;
        }
        .badge-fast {
            background: #d4edda;
            color: #155724;
        }
        .badge-global {
            background: #fff3cd;
            color: #856404;
        }
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 60px 0;
            margin-bottom: 40px;
            border-radius: 12px;
        }
        .color-swatch {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 4px;
            margin-right: 8px;
            vertical-align: middle;
            border: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Hero Section -->
        <div class="hero text-center">
            <h1 class="display-4 mb-3">QuickChart Laravel Package</h1>
            <p class="lead">Server-side Chart.js rendering with Cloudflare Workers</p>
            <div class="mt-4">
                <span class="feature-badge badge-cache">10-day cache</span>
                <span class="feature-badge badge-fast">~30ms cache hit</span>
                <span class="feature-badge badge-global">Global edge</span>
            </div>
            <div class="mt-4">
                <a href="https://github.com/giobi/quickchart" class="btn btn-light btn-lg">
                    <svg width="16" height="16" fill="currentColor" class="me-2" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    GitHub
                </a>
                <a href="https://quickchart.giobi.workers.dev" class="btn btn-outline-light btn-lg">API Docs</a>
            </div>
        </div>

        <!-- Installation -->
        <section class="mb-5">
            <h2 class="mb-4">Installation</h2>
            <pre><code class="language-bash">composer require giobi/quickchart-laravel</code></pre>
        </section>

        <!-- Basic Examples -->
        <section class="mb-5">
            <h2 class="mb-4">Basic Examples</h2>

            <!-- Bar Chart -->
            <div class="chart-container">
                <h4>Bar Chart - Sales Report</h4>
                <img src="https://quickchart.giobi.workers.dev/chart?type=bar&data=10,20,30,25&labels=Q1,Q2,Q3,Q4&title=Quarterly%20Sales&width=700&height=400" alt="Bar Chart">
                <pre><code class="language-php">&lt;?php
use Giobi\QuickChart\Facades\Chart;

Chart::bar([10, 20, 30, 25])
    ->labels(['Q1', 'Q2', 'Q3', 'Q4'])
    ->title('Quarterly Sales')
    ->render();</code></pre>
            </div>

            <!-- Line Chart -->
            <div class="chart-container">
                <h4>Line Chart - Traffic Growth</h4>
                <img src="https://quickchart.giobi.workers.dev/chart?type=line&data=5,10,15,10,20,25,30&labels=Mon,Tue,Wed,Thu,Fri,Sat,Sun&title=Weekly%20Traffic&width=700&height=400" alt="Line Chart">
                <pre><code class="language-php">&lt;?php
Chart::line([5, 10, 15, 10, 20, 25, 30])
    ->labels(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
    ->title('Weekly Traffic')
    ->render();</code></pre>
            </div>

            <!-- Pie Chart -->
            <div class="chart-container">
                <h4>Pie Chart - Market Share</h4>
                <img src="https://quickchart.giobi.workers.dev/chart?type=pie&data=30,50,20&labels=Product%20A,Product%20B,Product%20C&title=Market%20Share&width=500&height=500" alt="Pie Chart">
                <pre><code class="language-php">&lt;?php
Chart::pie([30, 50, 20])
    ->labels(['Product A', 'Product B', 'Product C'])
    ->title('Market Share')
    ->size(500, 500)
    ->render();</code></pre>
            </div>
        </section>

        <!-- Custom Colors -->
        <section class="mb-5">
            <h2 class="mb-4">Custom Colors & Styling</h2>

            <!-- Blue Theme -->
            <div class="chart-container">
                <h4>
                    Blue Theme
                    <span class="color-swatch" style="background: rgba(54, 162, 235, 0.8);"></span>
                </h4>
                <img src="https://quickchart.giobi.workers.dev/chart?type=bar&data=100,150,120,200,180&labels=Jan,Feb,Mar,Apr,May&title=Revenue%20(Blue)&backgroundColor=rgba(54,%20162,%20235,%200.8)&borderColor=rgba(54,%20162,%20235,%201)&width=700&height=400" alt="Blue Chart">
                <pre><code class="language-php">&lt;?php
Chart::bar([100, 150, 120, 200, 180])
    ->labels(['Jan', 'Feb', 'Mar', 'Apr', 'May'])
    ->title('Revenue (Blue)')
    ->backgroundColor('rgba(54, 162, 235, 0.8)')
    ->borderColor('rgba(54, 162, 235, 1)')
    ->render();</code></pre>
            </div>

            <!-- Green Theme -->
            <div class="chart-container">
                <h4>
                    Green Theme
                    <span class="color-swatch" style="background: rgba(75, 192, 192, 0.8);"></span>
                </h4>
                <img src="https://quickchart.giobi.workers.dev/chart?type=bar&data=50,80,60,90,70&labels=Week%201,Week%202,Week%203,Week%204,Week%205&title=Growth%20(Green)&backgroundColor=rgba(75,%20192,%20192,%200.8)&borderColor=rgba(75,%20192,%20192,%201)&width=700&height=400" alt="Green Chart">
                <pre><code class="language-php">&lt;?php
Chart::bar([50, 80, 60, 90, 70])
    ->labels(['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'])
    ->title('Growth (Green)')
    ->backgroundColor('rgba(75, 192, 192, 0.8)')
    ->borderColor('rgba(75, 192, 192, 1)')
    ->render();</code></pre>
            </div>

            <!-- Red Theme -->
            <div class="chart-container">
                <h4>
                    Red Theme
                    <span class="color-swatch" style="background: rgba(255, 99, 132, 0.8);"></span>
                </h4>
                <img src="https://quickchart.giobi.workers.dev/chart?type=line&data=30,45,35,50,40,55,48&labels=Day%201,Day%202,Day%203,Day%204,Day%205,Day%206,Day%207&title=Alerts%20(Red)&backgroundColor=rgba(255,%2099,%20132,%200.8)&borderColor=rgba(255,%2099,%20132,%201)&width=700&height=400" alt="Red Chart">
                <pre><code class="language-php">&lt;?php
Chart::line([30, 45, 35, 50, 40, 55, 48])
    ->labels(['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'])
    ->title('Alerts (Red)')
    ->backgroundColor('rgba(255, 99, 132, 0.8)')
    ->borderColor('rgba(255, 99, 132, 1)')
    ->render();</code></pre>
            </div>
        </section>

        <!-- All Chart Types -->
        <section class="mb-5">
            <h2 class="mb-4">All Chart Types</h2>

            <div class="row">
                <!-- Bar -->
                <div class="col-md-6 mb-4">
                    <div class="chart-container">
                        <h5>Bar</h5>
                        <img src="https://quickchart.giobi.workers.dev/chart?type=bar&data=12,19,15,25,22&labels=A,B,C,D,E&width=400&height=300" alt="Bar">
                        <pre><code class="language-php">Chart::bar([12, 19, 15, 25, 22])
    ->labels(['A','B','C','D','E'])
    ->render();</code></pre>
                    </div>
                </div>

                <!-- Line -->
                <div class="col-md-6 mb-4">
                    <div class="chart-container">
                        <h5>Line</h5>
                        <img src="https://quickchart.giobi.workers.dev/chart?type=line&data=12,19,15,25,22&labels=A,B,C,D,E&width=400&height=300" alt="Line">
                        <pre><code class="language-php">Chart::line([12, 19, 15, 25, 22])
    ->labels(['A','B','C','D','E'])
    ->render();</code></pre>
                    </div>
                </div>

                <!-- Pie -->
                <div class="col-md-6 mb-4">
                    <div class="chart-container">
                        <h5>Pie</h5>
                        <img src="https://quickchart.giobi.workers.dev/chart?type=pie&data=30,50,20&labels=Red,Blue,Yellow&width=350&height=350" alt="Pie">
                        <pre><code class="language-php">Chart::pie([30, 50, 20])
    ->labels(['Red','Blue','Yellow'])
    ->size(350, 350)
    ->render();</code></pre>
                    </div>
                </div>

                <!-- Doughnut -->
                <div class="col-md-6 mb-4">
                    <div class="chart-container">
                        <h5>Doughnut</h5>
                        <img src="https://quickchart.giobi.workers.dev/chart?type=doughnut&data=40,60&labels=Done,Todo&width=350&height=350" alt="Doughnut">
                        <pre><code class="language-php">Chart::doughnut([40, 60])
    ->labels(['Done','Todo'])
    ->size(350, 350)
    ->render();</code></pre>
                    </div>
                </div>

                <!-- Radar -->
                <div class="col-md-6 mb-4">
                    <div class="chart-container">
                        <h5>Radar</h5>
                        <img src="https://quickchart.giobi.workers.dev/chart?type=radar&data=80,90,70,85,75&labels=Speed,Quality,Cost,Reliability,Support&width=400&height=400" alt="Radar">
                        <pre><code class="language-php">Chart::radar([80, 90, 70, 85, 75])
    ->labels(['Speed','Quality','Cost',
              'Reliability','Support'])
    ->size(400, 400)
    ->render();</code></pre>
                    </div>
                </div>
            </div>
        </section>

        <!-- Sizes -->
        <section class="mb-5">
            <h2 class="mb-4">Custom Sizes</h2>

            <div class="row">
                <div class="col-md-4">
                    <div class="chart-container text-center">
                        <h5>Small (400x300)</h5>
                        <img src="https://quickchart.giobi.workers.dev/chart?type=bar&data=5,8,6,9,7&labels=A,B,C,D,E&title=Small&width=400&height=300" alt="Small">
                        <pre><code class="language-php">->size(400, 300)</code></pre>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="chart-container text-center">
                        <h5>Medium (600x400)</h5>
                        <img src="https://quickchart.giobi.workers.dev/chart?type=bar&data=5,8,6,9,7&labels=A,B,C,D,E&title=Medium&width=600&height=400" alt="Medium">
                        <pre><code class="language-php">->size(600, 400)</code></pre>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="chart-container text-center">
                        <h5>Large (800x500)</h5>
                        <img src="https://quickchart.giobi.workers.dev/chart?type=bar&data=5,8,6,9,7&labels=A,B,C,D,E&title=Large&width=800&height=500" alt="Large">
                        <pre><code class="language-php">->size(800, 500)</code></pre>
                    </div>
                </div>
            </div>
        </section>

        <!-- Laravel Integration -->
        <section class="mb-5">
            <h2 class="mb-4">Laravel Integration Examples</h2>

            <div class="card mb-4">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Controller Example</h5>
                </div>
                <div class="card-body">
                    <pre><code class="language-php">&lt;?php

namespace App\Http\Controllers;

use Giobi\QuickChart\Facades\Chart;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function index(): View
    {
        // Sales chart
        $salesChart = Chart::bar([100, 150, 120, 200])
            ->labels(['Q1', 'Q2', 'Q3', 'Q4'])
            ->title('Quarterly Sales')
            ->backgroundColor('rgba(54, 162, 235, 0.8)')
            ->size(800, 400);

        // Traffic chart
        $trafficChart = Chart::line([1200, 1900, 3000, 5000])
            ->labels(['Week 1', 'Week 2', 'Week 3', 'Week 4'])
            ->title('Weekly Traffic')
            ->backgroundColor('rgba(75, 192, 192, 0.8)');

        // Market share
        $marketChart = Chart::pie([30, 50, 20])
            ->labels(['Product A', 'Product B', 'Product C'])
            ->title('Market Share')
            ->size(500, 500);

        return view('dashboard', compact(
            'salesChart',
            'trafficChart',
            'marketChart'
        ));
    }
}</code></pre>
                </div>
            </div>

            <div class="card mb-4">
                <div class="card-header bg-success text-white">
                    <h5 class="mb-0">Blade Template Example</h5>
                </div>
                <div class="card-body">
                    <pre><code class="language-blade">{{-- resources/views/dashboard.blade.php --}}

@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Dashboard</h1>

    <div class="row">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Sales Overview</div>
                <div class="card-body text-center">
                    {!! $salesChart->render(['class' => 'img-fluid']) !!}
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card">
                <div class="card-header">Market Share</div>
                <div class="card-body text-center">
                    {!! $marketChart->render() !!}
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header">Traffic Growth</div>
                <div class="card-body text-center">
                    {!! $trafficChart->render(['class' => 'img-fluid', 'loading' => 'lazy']) !!}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection</code></pre>
                </div>
            </div>
        </section>

        <!-- Common Color Palettes -->
        <section class="mb-5">
            <h2 class="mb-4">Common Color Palettes</h2>

            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead class="table-light">
                        <tr>
                            <th>Color</th>
                            <th>Preview</th>
                            <th>RGBA (Background)</th>
                            <th>RGBA (Border)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Blue</strong></td>
                            <td><span class="color-swatch" style="background: rgba(54, 162, 235, 0.8);"></span></td>
                            <td><code>rgba(54, 162, 235, 0.8)</code></td>
                            <td><code>rgba(54, 162, 235, 1)</code></td>
                        </tr>
                        <tr>
                            <td><strong>Green</strong></td>
                            <td><span class="color-swatch" style="background: rgba(75, 192, 192, 0.8);"></span></td>
                            <td><code>rgba(75, 192, 192, 0.8)</code></td>
                            <td><code>rgba(75, 192, 192, 1)</code></td>
                        </tr>
                        <tr>
                            <td><strong>Red</strong></td>
                            <td><span class="color-swatch" style="background: rgba(255, 99, 132, 0.8);"></span></td>
                            <td><code>rgba(255, 99, 132, 0.8)</code></td>
                            <td><code>rgba(255, 99, 132, 1)</code></td>
                        </tr>
                        <tr>
                            <td><strong>Yellow</strong></td>
                            <td><span class="color-swatch" style="background: rgba(255, 206, 86, 0.8);"></span></td>
                            <td><code>rgba(255, 206, 86, 0.8)</code></td>
                            <td><code>rgba(255, 206, 86, 1)</code></td>
                        </tr>
                        <tr>
                            <td><strong>Purple</strong></td>
                            <td><span class="color-swatch" style="background: rgba(153, 102, 255, 0.8);"></span></td>
                            <td><code>rgba(153, 102, 255, 0.8)</code></td>
                            <td><code>rgba(153, 102, 255, 1)</code></td>
                        </tr>
                        <tr>
                            <td><strong>Orange</strong></td>
                            <td><span class="color-swatch" style="background: rgba(255, 159, 64, 0.8);"></span></td>
                            <td><code>rgba(255, 159, 64, 0.8)</code></td>
                            <td><code>rgba(255, 159, 64, 1)</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- API Methods -->
        <section class="mb-5">
            <h2 class="mb-4">Available Methods</h2>

            <div class="row">
                <div class="col-md-6">
                    <div class="card mb-3">
                        <div class="card-header"><strong>Static Constructors</strong></div>
                        <div class="card-body">
                            <ul class="list-unstyled">
                                <li><code>Chart::bar(array $data)</code></li>
                                <li><code>Chart::line(array $data)</code></li>
                                <li><code>Chart::pie(array $data)</code></li>
                                <li><code>Chart::doughnut(array $data)</code></li>
                                <li><code>Chart::radar(array $data)</code></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card mb-3">
                        <div class="card-header"><strong>Configuration Methods</strong></div>
                        <div class="card-body">
                            <ul class="list-unstyled">
                                <li><code>->labels(array $labels)</code></li>
                                <li><code>->title(string $title)</code></li>
                                <li><code>->size(int $width, int $height)</code></li>
                                <li><code>->width(int $width)</code></li>
                                <li><code>->height(int $height)</code></li>
                                <li><code>->backgroundColor(string $color)</code></li>
                                <li><code>->borderColor(string $color)</code></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card mb-3">
                        <div class="card-header"><strong>Output Methods</strong></div>
                        <div class="card-body">
                            <ul class="list-unstyled">
                                <li><code>->render(array $attributes = [])</code></li>
                                <li><code>->toHtml()</code></li>
                                <li><code>->url()</code></li>
                                <li><code>->__toString()</code></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Performance -->
        <section class="mb-5">
            <h2 class="mb-4">Performance</h2>

            <div class="row">
                <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-body">
                            <h1 class="display-4 text-primary">~30ms</h1>
                            <p class="text-muted">Cache Hit</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-body">
                            <h1 class="display-4 text-success">~450ms</h1>
                            <p class="text-muted">Cache Miss</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-body">
                            <h1 class="display-4 text-info">10 days</h1>
                            <p class="text-muted">Cache TTL</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="alert alert-info mt-4">
                <strong>Cache Strategy:</strong> Charts are cached globally via Cloudflare KV.
                Same configuration = same cached image served from 300+ edge locations worldwide.
            </div>
        </section>

        <!-- Footer -->
        <footer class="text-center py-4 border-top">
            <p class="text-muted mb-2">
                <strong>QuickChart</strong> - Server-side Chart.js rendering with Cloudflare Workers
            </p>
            <p class="text-muted small">
                <a href="https://github.com/giobi/quickchart" class="text-decoration-none">GitHub</a> ·
                <a href="https://quickchart.giobi.workers.dev" class="text-decoration-none">API Docs</a> ·
                <a href="https://giobi.com" class="text-decoration-none">giobi.com</a>
            </p>
        </footer>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-php.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
</body>
</html>
`;
