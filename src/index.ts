/**
 * QuickChart Clone - Cloudflare Worker POC
 *
 * Server-side Chart.js rendering with KV caching
 *
 * API: /chart?type=bar&data=10,20,30&labels=A,B,C&width=800&height=400
 */

export interface Env {
  CHART_CACHE?: KVNamespace;
  CACHE_TTL: string;
  MAX_WIDTH: string;
  MAX_HEIGHT: string;
}

interface ChartConfig {
  type: string;
  data: number[];
  labels?: string[];
  width: number;
  height: number;
  title?: string;
  backgroundColor?: string;
  borderColor?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Health check
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({
        status: 'ok',
        service: 'quickchart-worker',
        version: '0.1.0-poc',
        timestamp: new Date().toISOString()
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Chart endpoint
    if (url.pathname === '/chart') {
      return handleChartRequest(url, env);
    }

    // Root - API docs
    if (url.pathname === '/') {
      return new Response(getApiDocs(), {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};

async function handleChartRequest(url: URL, env: Env): Promise<Response> {
  try {
    // Parse parameters
    const config = parseChartConfig(url, env);

    // Generate cache key
    const cacheKey = generateCacheKey(config);

    // Try cache first (if KV is available)
    if (env.CHART_CACHE) {
      const cached = await env.CHART_CACHE.get(cacheKey, 'arrayBuffer');
      if (cached) {
        return new Response(cached, {
          headers: {
            'Content-Type': 'image/png',
            'Cache-Control': `public, max-age=${env.CACHE_TTL}`,
            'X-Cache': 'HIT'
          }
        });
      }
    }

    // Render chart (POC: proxy to quickchart.io for now)
    const imageBuffer = await renderChart(config);

    // Store in cache (if KV is available)
    if (env.CHART_CACHE && imageBuffer) {
      await env.CHART_CACHE.put(cacheKey, imageBuffer, {
        expirationTtl: parseInt(env.CACHE_TTL)
      });
    }

    return new Response(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': `public, max-age=${env.CACHE_TTL}`,
        'X-Cache': 'MISS'
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Chart generation failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

function parseChartConfig(url: URL, env: Env): ChartConfig {
  const params = url.searchParams;

  // Type (required)
  const type = params.get('type') || 'bar';
  if (!['bar', 'line', 'pie', 'doughnut', 'radar'].includes(type)) {
    throw new Error(`Invalid chart type: ${type}`);
  }

  // Data (required)
  const dataStr = params.get('data');
  if (!dataStr) {
    throw new Error('Missing required parameter: data');
  }
  const data = dataStr.split(',').map(v => parseFloat(v.trim()));

  // Labels (optional)
  const labelsStr = params.get('labels');
  const labels = labelsStr ? labelsStr.split(',').map(l => l.trim()) : undefined;

  // Dimensions
  const maxWidth = parseInt(env.MAX_WIDTH);
  const maxHeight = parseInt(env.MAX_HEIGHT);

  let width = parseInt(params.get('width') || '800');
  let height = parseInt(params.get('height') || '400');

  if (width > maxWidth) width = maxWidth;
  if (height > maxHeight) height = maxHeight;

  // Optional styling
  const title = params.get('title') || undefined;
  const backgroundColor = params.get('backgroundColor') || undefined;
  const borderColor = params.get('borderColor') || undefined;

  return {
    type,
    data,
    labels,
    width,
    height,
    title,
    backgroundColor,
    borderColor
  };
}

function generateCacheKey(config: ChartConfig): string {
  // Generate deterministic cache key from config
  const configStr = JSON.stringify(config);
  return `chart:${hashString(configStr)}`;
}

function hashString(str: string): string {
  // Simple hash function (for POC - use crypto.subtle in production)
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

async function renderChart(config: ChartConfig): Promise<ArrayBuffer> {
  // POC: Proxy to quickchart.io for now
  // TODO: Replace with native rendering (puppeteer-core or canvas)

  const chartJsConfig = {
    type: config.type,
    data: {
      labels: config.labels || config.data.map((_, i) => `Label ${i + 1}`),
      datasets: [{
        label: config.title || 'Dataset',
        data: config.data,
        backgroundColor: config.backgroundColor || 'rgba(54, 162, 235, 0.2)',
        borderColor: config.borderColor || 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        title: {
          display: !!config.title,
          text: config.title
        }
      }
    }
  };

  // Encode config for URL
  const configEncoded = encodeURIComponent(JSON.stringify(chartJsConfig));

  // Proxy to quickchart.io (temporary)
  const proxyUrl = `https://quickchart.io/chart?c=${configEncoded}&width=${config.width}&height=${config.height}`;

  const response = await fetch(proxyUrl);

  if (!response.ok) {
    throw new Error(`Chart rendering failed: ${response.statusText}`);
  }

  return await response.arrayBuffer();
}

function getApiDocs(): string {
  return `<!DOCTYPE html>
<html>
<head>
  <title>QuickChart Clone API</title>
  <style>
    body { font-family: system-ui; max-width: 800px; margin: 40px auto; padding: 0 20px; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
    pre { background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
    h1 { color: #333; }
    .example { margin: 20px 0; }
  </style>
</head>
<body>
  <h1>🚀 QuickChart Clone API</h1>
  <p>Server-side Chart.js rendering with Cloudflare Workers</p>

  <h2>Endpoint</h2>
  <pre>GET /chart</pre>

  <h2>Parameters</h2>
  <ul>
    <li><code>type</code> - Chart type (bar, line, pie, doughnut, radar)</li>
    <li><code>data</code> - Comma-separated values (required)</li>
    <li><code>labels</code> - Comma-separated labels (optional)</li>
    <li><code>width</code> - Image width in pixels (default: 800)</li>
    <li><code>height</code> - Image height in pixels (default: 400)</li>
    <li><code>title</code> - Chart title (optional)</li>
    <li><code>backgroundColor</code> - Bar/line color (optional)</li>
    <li><code>borderColor</code> - Border color (optional)</li>
  </ul>

  <h2>Examples</h2>

  <div class="example">
    <h3>Bar Chart</h3>
    <pre>/chart?type=bar&data=10,20,30,25&labels=A,B,C,D&title=Sales</pre>
    <img src="/chart?type=bar&data=10,20,30,25&labels=A,B,C,D&title=Sales&width=600&height=300" />
  </div>

  <div class="example">
    <h3>Line Chart</h3>
    <pre>/chart?type=line&data=5,10,15,10,20&width=600&height=300</pre>
    <img src="/chart?type=line&data=5,10,15,10,20&width=600&height=300" />
  </div>

  <div class="example">
    <h3>Pie Chart</h3>
    <pre>/chart?type=pie&data=30,50,20&labels=Red,Blue,Yellow</pre>
    <img src="/chart?type=pie&data=30,50,20&labels=Red,Blue,Yellow&width=400&height=400" />
  </div>

  <h2>⚡ Caching</h2>
  <p>Charts are cached using Cloudflare KV for ultra-fast subsequent requests.</p>

  <h3>How it works</h3>
  <ul>
    <li><strong>Cache Key:</strong> Generated from chart configuration (type, data, labels, dimensions, styling)</li>
    <li><strong>TTL:</strong> 3600 seconds (1 hour) - configurable</li>
    <li><strong>Storage:</strong> Cloudflare KV (distributed globally)</li>
    <li><strong>Invalidation:</strong> Automatic after TTL expires</li>
  </ul>

  <h3>Verifying Cache Status</h3>
  <p>Check the <code>X-Cache</code> response header:</p>
  <pre>curl -I "https://quickchart.giobi.workers.dev/chart?type=bar&data=10,20,30"

X-Cache: MISS   # First request - chart rendered and cached
X-Cache: HIT    # Subsequent requests - served from cache (~50ms)</pre>

  <h3>Performance</h3>
  <ul>
    <li><strong>Cache MISS:</strong> ~400-500ms (includes rendering)</li>
    <li><strong>Cache HIT:</strong> ~20-50ms (edge-cached PNG)</li>
    <li><strong>Global Distribution:</strong> Served from 300+ Cloudflare edge locations</li>
  </ul>

  <h3>Same Chart = Same Cache</h3>
  <p>Identical parameters always return the same cached image:</p>
  <pre>/chart?type=bar&data=10,20,30&labels=A,B,C
/chart?type=bar&data=10,20,30&labels=A,B,C  ← Cache HIT!</pre>

  <h2>Health Check</h2>
  <pre>GET /health</pre>

  <h2>Status</h2>
  <p><strong>Version:</strong> 0.1.0-poc</p>
  <p><strong>Cache:</strong> Cloudflare KV ✅ Active</p>
  <p><strong>Rendering:</strong> Proxying to quickchart.io (temporary)</p>

  <hr>
  <p><small>POC by Giobi · <a href="https://github.com/giobi/quickchart">GitHub</a></small></p>
</body>
</html>`;
}
