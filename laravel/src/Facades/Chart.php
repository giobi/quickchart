<?php

namespace Giobi\QuickChart\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static \Giobi\QuickChart\Chart bar(array $data)
 * @method static \Giobi\QuickChart\Chart line(array $data)
 * @method static \Giobi\QuickChart\Chart pie(array $data)
 * @method static \Giobi\QuickChart\Chart doughnut(array $data)
 * @method static \Giobi\QuickChart\Chart radar(array $data)
 * @method static \Giobi\QuickChart\Chart type(string $type)
 * @method static \Giobi\QuickChart\Chart data(array $data)
 * @method static \Giobi\QuickChart\Chart labels(array $labels)
 * @method static \Giobi\QuickChart\Chart size(int $width, int $height)
 * @method static \Giobi\QuickChart\Chart width(int $width)
 * @method static \Giobi\QuickChart\Chart height(int $height)
 * @method static \Giobi\QuickChart\Chart title(string $title)
 * @method static \Giobi\QuickChart\Chart backgroundColor(string $color)
 * @method static \Giobi\QuickChart\Chart borderColor(string $color)
 * @method static string url()
 * @method static string render(array $attributes = [])
 * @method static string toHtml()
 *
 * @see \Giobi\QuickChart\Chart
 */
class Chart extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'quickchart';
    }
}
