const BASE_URL = process.env.AUTONOMY_BASE_URL || 'http://127.0.0.1:7860';

const profiles = [
  { key: 'low', width: 960, height: 540, fps: 24 },
  { key: 'medium', width: 1280, height: 720, fps: 30 },
  { key: 'high', width: 1600, height: 900, fps: 45 },
  { key: 'aaa', width: 1920, height: 1080, fps: 60 },
  { key: 'low', width: 960, height: 540, fps: 24 },
];

function fail(message) {
  console.error(`AUTONOMY_PROOF_FAIL: ${message}`);
  process.exit(1);
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestJson(url, init, options = {}) {
  const method = init?.method || 'GET';
  const retries = options.retries ?? 12;
  const delayMs = options.delayMs ?? 500;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, init);
      if (response.ok) {
        return response.json();
      }

      const text = await response.text();
      const isRetryableStatus = response.status === 409 || response.status >= 500;
      if (isRetryableStatus && attempt < retries) {
        await sleep(delayMs);
        continue;
      }

      fail(`${method} ${url} -> ${response.status} ${response.statusText} :: ${text}`);
    } catch (error) {
      if (attempt < retries) {
        await sleep(delayMs);
        continue;
      }
      throw error;
    }
  }

  fail(`${method} ${url} exhausted retry budget`);
}

function assertHealthShape(health) {
  const required = ['status', 'profile', 'width', 'height', 'transportSource', 'publicPort', 'internalPort'];
  for (const key of required) {
    if (!(key in health)) {
      fail(`health response missing key '${key}'`);
    }
  }
  if (health.status !== 'ok') {
    fail(`health status is not ok: ${health.status}`);
  }
}

async function main() {
  console.log(`AUTONOMY_PROOF_START base=${BASE_URL}`);

  const initialHealth = await requestJson(`${BASE_URL}/health`, undefined, { retries: 30, delayMs: 700 });
  assertHealthShape(initialHealth);

  console.log(
    `AUTONOMY_PROOF_HEALTH_INITIAL profile=${initialHealth.profile} transport=${initialHealth.transportSource} publicPort=${initialHealth.publicPort} internalPort=${initialHealth.internalPort} clients=${initialHealth.clients}`
  );

  for (const profile of profiles) {
    const switched = await requestJson(
      `${BASE_URL}/api/profile/${profile.key}`,
      { method: 'POST' },
      { retries: 30, delayMs: 700 }
    );

    if (!switched.ok || switched.profile !== profile.key) {
      fail(`profile switch failed for ${profile.key}: ${JSON.stringify(switched)}`);
    }

    if (switched.width !== profile.width || switched.height !== profile.height || switched.fps !== profile.fps) {
      fail(`profile ${profile.key} dimensions/fps mismatch in switch response: ${JSON.stringify(switched)}`);
    }

    await sleep(900);

    const health = await requestJson(`${BASE_URL}/health`, undefined, { retries: 30, delayMs: 700 });
    assertHealthShape(health);

    if (health.profile !== profile.key) {
      fail(`health profile mismatch expected=${profile.key} actual=${health.profile}`);
    }

    if (health.width !== profile.width || health.height !== profile.height) {
      fail(`health dimensions mismatch for ${profile.key}: ${JSON.stringify(health)}`);
    }

    console.log(
      `AUTONOMY_PROOF_PROFILE_OK profile=${profile.key} rendererFps=${health.rendererFps} viewerFps=${health.viewerFps} clients=${health.clients} transport=${health.transportSource}`
    );
  }

  console.log('AUTONOMY_PROOF_OK');
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
