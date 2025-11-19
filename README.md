# QuickChart

Server-side Chart.js rendering with **Cloudflare Workers** + **Laravel Package**.

Zero-ops deployment with ultra-fast global caching.

## 🚀 Features

- ✅ **Cloudflare Workers** - Zero cold start (~50ms), global edge distribution
- ✅ **KV Caching** - 10-day TTL, ~30ms cache hits
- ✅ **Laravel Package** - Fluent API for easy integration
- ✅ **Multiple Chart Types** - bar, line, pie, doughnut, radar
- ✅ **Free Tier** - 100k requests/day = 3M/month
- ✅ **Open Source** - MIT License

## 📊 Live API

**Base URL**: https://quickchart.giobi.workers.dev

### Quick Example

```
GET /chart?type=bar&data=10,20,30,25&labels=Q1,Q2,Q3,Q4&title=Sales
```

![Example Chart](https://quickchart.giobi.workers.dev/chart?type=bar&data=10,20,30,25&labels=Q1,Q2,Q3,Q4&title=Sales&width=600&height=300)

### API Documentation

- **Interactive API**: https://quickchart.giobi.workers.dev
- **Bootstrap Demo**: [View visual examples with code samples →](demo/index.html)

## 📦 Laravel Package

### Installation

```bash
composer require giobi/quickchart-laravel
```

### Usage

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
    ->size(600, 300)
    ->render() !!}

// Pie chart
{!! Chart::pie([30, 50, 20])
    ->labels(['Red', 'Blue', 'Yellow'])
    ->render() !!}
```

See [Laravel Package README](laravel/README.md) for full documentation.

## ⚡ Performance

- **Cache MISS**: ~400-500ms (render + cache write)
- **Cache HIT**: ~20-50ms (edge-cached PNG)
- **Cache TTL**: 10 days (864000 seconds)
- **Global**: 300+ Cloudflare edge locations

### Verify Cache Status

```bash
curl -I "https://quickchart.giobi.workers.dev/chart?type=bar&data=10,20,30"
# X-Cache: MISS (first request)
# X-Cache: HIT  (subsequent requests)
```

## 🛠️ Tech Stack

### Cloudflare Worker (TypeScript)

- Runtime: V8 isolates
- Bundle: 8.12 KiB / gzip: 2.91 KiB
- Cold start: <50ms
- KV Storage: Distributed caching

### Laravel Package (PHP)

- Requirements: PHP 8.1+, Laravel 10.x/11.x
- Pattern: Fluent API + Facade
- Auto-discovery: Service Provider

## 🏗️ Project Structure

```
quickchart/
├── src/                    # Cloudflare Worker (TypeScript)
│   └── index.ts           # Main worker logic
├── laravel/               # Laravel Package
│   ├── src/
│   │   ├── Chart.php      # Main class
│   │   ├── ChartServiceProvider.php
│   │   └── Facades/Chart.php
│   ├── config/
│   │   └── quickchart.php
│   ├── composer.json
│   └── README.md
├── wrangler.toml          # Cloudflare config
├── package.json           # Node dependencies
└── README.md              # This file
```

## 🚀 Deployment

### Cloudflare Worker

```bash
# Install dependencies
npm install

# Deploy to Cloudflare
export CLOUDFLARE_API_TOKEN="your_token"
npx wrangler deploy
```

### Laravel Package

```bash
cd laravel/
composer install
php test.php  # Run local tests
```

## 🔧 Configuration

### Environment Variables

#### Cloudflare (wrangler.toml)

```toml
[vars]
CACHE_TTL = "864000"  # 10 days
MAX_WIDTH = "2000"
MAX_HEIGHT = "2000"
```

#### Laravel (.env)

```env
QUICKCHART_URL=https://quickchart.giobi.workers.dev
```

## 📖 API Reference

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `type` | string | Yes | `bar` | Chart type: bar, line, pie, doughnut, radar |
| `data` | string | Yes | - | Comma-separated values |
| `labels` | string | No | - | Comma-separated labels |
| `width` | int | No | 800 | Image width (max 2000) |
| `height` | int | No | 400 | Image height (max 2000) |
| `title` | string | No | - | Chart title |
| `backgroundColor` | string | No | - | Bar/line background color |
| `borderColor` | string | No | - | Border color |

### Endpoints

- `GET /chart` - Generate chart image
- `GET /health` - Health check (JSON)
- `GET /` - API documentation (HTML)

## 🧪 Testing

### Worker Tests

```bash
# Lint TypeScript
npm run lint

# Deploy to dev environment
npm run dev
```

### Laravel Package Tests

```bash
cd laravel/

# Syntax check
php -l src/Chart.php

# Run test script
php test.php
```

## 📝 License

MIT License - see LICENSE file

## 🙏 Credits

- Built with [Cloudflare Workers](https://workers.cloudflare.com/)
- Chart rendering via [Chart.js](https://www.chartjs.org/)
- Inspired by [QuickChart.io](https://quickchart.io/)

## 🔗 Links

- **Live API**: https://quickchart.giobi.workers.dev
- **GitHub**: https://github.com/giobi/quickchart
- **Laravel Package**: [laravel/README.md](laravel/README.md)

## 📧 Contact

**Author**: Giobi
**Email**: giobi@giobi.com
**Website**: https://giobi.com

---

**Status**: ✅ Deployed & Live (POC) - Version ec303ff7-3c7a-47ca-965b-ff018af51012
