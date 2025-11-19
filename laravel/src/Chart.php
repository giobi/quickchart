<?php

namespace Giobi\QuickChart;

class Chart
{
    protected string $type = 'bar';
    protected array $data = [];
    protected ?array $labels = null;
    protected int $width = 800;
    protected int $height = 400;
    protected ?string $title = null;
    protected ?string $backgroundColor = null;
    protected ?string $borderColor = null;
    protected string $baseUrl;

    public function __construct(?string $baseUrl = null)
    {
        if ($baseUrl !== null) {
            $this->baseUrl = $baseUrl;
        } elseif (function_exists('config')) {
            // Laravel environment
            $this->baseUrl = config('quickchart.base_url', 'https://quickchart.giobi.workers.dev');
        } else {
            // Standalone PHP
            $this->baseUrl = 'https://quickchart.giobi.workers.dev';
        }
    }

    /**
     * Create a bar chart
     */
    public static function bar(array $data): self
    {
        return (new static())->type('bar')->data($data);
    }

    /**
     * Create a line chart
     */
    public static function line(array $data): self
    {
        return (new static())->type('line')->data($data);
    }

    /**
     * Create a pie chart
     */
    public static function pie(array $data): self
    {
        return (new static())->type('pie')->data($data);
    }

    /**
     * Create a doughnut chart
     */
    public static function doughnut(array $data): self
    {
        return (new static())->type('doughnut')->data($data);
    }

    /**
     * Create a radar chart
     */
    public static function radar(array $data): self
    {
        return (new static())->type('radar')->data($data);
    }

    /**
     * Set chart type
     */
    public function type(string $type): self
    {
        $this->type = $type;
        return $this;
    }

    /**
     * Set chart data
     */
    public function data(array $data): self
    {
        $this->data = $data;
        return $this;
    }

    /**
     * Set chart labels
     */
    public function labels(array $labels): self
    {
        $this->labels = $labels;
        return $this;
    }

    /**
     * Set chart dimensions
     */
    public function size(int $width, int $height): self
    {
        $this->width = $width;
        $this->height = $height;
        return $this;
    }

    /**
     * Set chart width
     */
    public function width(int $width): self
    {
        $this->width = $width;
        return $this;
    }

    /**
     * Set chart height
     */
    public function height(int $height): self
    {
        $this->height = $height;
        return $this;
    }

    /**
     * Set chart title
     */
    public function title(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    /**
     * Set background color
     */
    public function backgroundColor(string $color): self
    {
        $this->backgroundColor = $color;
        return $this;
    }

    /**
     * Set border color
     */
    public function borderColor(string $color): self
    {
        $this->borderColor = $color;
        return $this;
    }

    /**
     * Generate the chart URL
     */
    public function url(): string
    {
        $params = [
            'type' => $this->type,
            'data' => implode(',', $this->data),
            'width' => $this->width,
            'height' => $this->height,
        ];

        if ($this->labels !== null) {
            $params['labels'] = implode(',', $this->labels);
        }

        if ($this->title !== null) {
            $params['title'] = $this->title;
        }

        if ($this->backgroundColor !== null) {
            $params['backgroundColor'] = $this->backgroundColor;
        }

        if ($this->borderColor !== null) {
            $params['borderColor'] = $this->borderColor;
        }

        return $this->baseUrl . '/chart?' . http_build_query($params);
    }

    /**
     * Render as HTML img tag
     */
    public function render(array $attributes = []): string
    {
        $url = $this->url();
        $attrs = array_merge(['alt' => $this->title ?? 'Chart'], $attributes);

        $attrString = '';
        foreach ($attrs as $key => $value) {
            $attrString .= sprintf(' %s="%s"', $key, htmlspecialchars($value, ENT_QUOTES));
        }

        return sprintf('<img src="%s"%s>', htmlspecialchars($url, ENT_QUOTES), $attrString);
    }

    /**
     * Alias for render()
     */
    public function toHtml(): string
    {
        return $this->render();
    }

    /**
     * Convert to string
     */
    public function __toString(): string
    {
        return $this->render();
    }
}
