<?php

require_once __DIR__ . '/src/Chart.php';

use Giobi\QuickChart\Chart;

echo "QuickChart Laravel Package - Local Test\n";
echo "========================================\n\n";

// Test 1: Basic bar chart
$chart1 = Chart::bar([10, 20, 30, 25])
    ->labels(['Q1', 'Q2', 'Q3', 'Q4'])
    ->title('Sales 2024');

echo "Test 1: Bar Chart\n";
echo "URL: " . $chart1->url() . "\n";
echo "HTML: " . $chart1->render() . "\n\n";

// Test 2: Line chart with custom size
$chart2 = Chart::line([5, 10, 15, 10, 20])
    ->labels(['Jan', 'Feb', 'Mar', 'Apr', 'May'])
    ->title('Traffic')
    ->size(600, 300);

echo "Test 2: Line Chart\n";
echo "URL: " . $chart2->url() . "\n\n";

// Test 3: Pie chart
$chart3 = Chart::pie([30, 50, 20])
    ->labels(['Red', 'Blue', 'Yellow'])
    ->title('Colors Distribution');

echo "Test 3: Pie Chart\n";
echo "URL: " . $chart3->url() . "\n\n";

// Test 4: Custom styling
$chart4 = Chart::bar([100, 200, 150, 300])
    ->labels(['Jan', 'Feb', 'Mar', 'Apr'])
    ->title('Monthly Revenue')
    ->backgroundColor('rgba(54, 162, 235, 0.5)')
    ->borderColor('rgba(54, 162, 235, 1)');

echo "Test 4: Styled Bar Chart\n";
echo "URL: " . $chart4->url() . "\n\n";

// Test 5: Custom attributes
$chart5 = Chart::bar([10, 20, 30])
    ->labels(['A', 'B', 'C'])
    ->render(['class' => 'chart-image', 'loading' => 'lazy']);

echo "Test 5: With Custom Attributes\n";
echo "HTML: " . $chart5 . "\n\n";

// Test 6: __toString magic method
$chart6 = (string) Chart::doughnut([40, 60])
    ->labels(['Done', 'Todo'])
    ->title('Progress');

echo "Test 6: toString Rendering\n";
echo "HTML: " . $chart6 . "\n\n";

echo "✅ All tests passed!\n";
