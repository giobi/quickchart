/**
 * QuickChart Clone - Cloudflare Worker POC
 *
 * Server-side Chart.js rendering with KV caching
 *
 * API: /chart?type=bar&data=10,20,30&labels=A,B,C&width=800&height=400
 */

import { demoHTML } from './demo-html';

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
  return demoHTML;
}
