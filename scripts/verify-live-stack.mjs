function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestWithRetry(url, options = {}) {
  const retries = options.retries ?? 20;
  const delayMs = options.delayMs ?? 500;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, { method: 'GET' });
      if (response.ok) {
        return response;
      }
      if (attempt < retries) {
        await sleep(delayMs);
        continue;
      }
      throw new Error(`${url} -> ${response.status} ${response.statusText}`);
    } catch (error) {
      if (attempt < retries) {
        await sleep(delayMs);
        continue;
      }
      throw error;
    }
  }

  throw new Error(`retry budget exhausted for ${url}`);
}

async function main() {
  const vitePort = Number(process.env.VITE_PORT) || 5173;
  const socketPort = Number(process.env.SOCKET_PORT) || 3000;

  const appUrl = `http://127.0.0.1:${vitePort}`;
  const healthUrl = `http://127.0.0.1:${socketPort}/health`;

  const appResponse = await requestWithRetry(appUrl);
  const healthResponse = await requestWithRetry(healthUrl);
  const health = await healthResponse.json();

  if (health.status !== 'ok') {
    throw new Error(`health status invalid: ${JSON.stringify(health)}`);
  }

  if (!Array.isArray(health.allowedOrigins) || health.allowedOrigins.length === 0) {
    throw new Error(`health allowedOrigins invalid: ${JSON.stringify(health)}`);
  }

  console.log(`LIVE_STACK_APP_OK status=${appResponse.status} url=${appUrl}`);
  console.log(`LIVE_STACK_HEALTH_OK status=${health.status} socketPort=${health.socketPort} origins=${health.allowedOrigins.length}`);
  console.log('LIVE_STACK_OK');
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`LIVE_STACK_FAIL ${message}`);
  process.exit(1);
});
