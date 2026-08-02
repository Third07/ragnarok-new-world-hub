const siteOrigin = "https://rtnw.online";
const key = process.env.INDEXNOW_KEY?.trim() || "4cc78cf9b31d099f4de23a0874b08a5e";
const keyLocation =
  process.env.INDEXNOW_KEY_LOCATION?.trim() || `${siteOrigin}/${key}.txt`;

async function main() {
  const response = await fetch(keyLocation, {
    headers: { "User-Agent": "RTNW-Hub-IndexNow-Check/1.0" },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`Key URL returned HTTP ${response.status}: ${keyLocation}`);
  }

  const body = (await response.text()).trim();
  if (body !== key) {
    throw new Error(
      `Key file contents do not match the configured key. Expected ${key}, received ${body || "an empty response"}.`,
    );
  }

  console.log(`IndexNow key verified: ${keyLocation}`);
  console.log("The key file is public and its contents match the configured key.");
  console.log(
    "To verify a submission, run npm run indexnow:submit and look for HTTP 200 or 202 in the output, then review the IndexNow section in Bing Webmaster Tools.",
  );
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`IndexNow verification failed: ${message}`);
  process.exitCode = 1;
});
