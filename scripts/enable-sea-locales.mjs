#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';

async function patch(path, transformations) {
  const original = await readFile(path, 'utf8');
  let updated = original;
  for (const [from, to, label] of transformations) {
    if (updated.includes(to)) continue;
    if (!updated.includes(from)) throw new Error(`${path}: could not find ${label || from}`);
    updated = updated.replace(from, to);
  }
  if (updated !== original) {
    await writeFile(path, updated, 'utf8');
    console.log(`Enabled SEA locales in ${path}`);
  }
}

await patch('public/shared/asset_version.js', [
  [
    'const SUPPORTED_LOCALES = [ "en-US" ];',
    'const SUPPORTED_LOCALES = ACTIVE_CLIENT === "SEA" ? CLIENT_LOCALES.SEA : CLIENT_LOCALES.HMT;',
    'supported locale declaration',
  ],
  [
    'if (normalized === "zh" || normalized.startsWith("zh-")) return "zh-TW";',
    'if (normalized === "zh" || normalized.startsWith("zh-")) return ACTIVE_CLIENT === "SEA" ? "zh-CN" : "zh-TW";',
    'generic Chinese locale mapping',
  ],
  [
    'const activeLocale = DEFAULT_LOCALE;',
    'const activeLocale = normalizedQueryLocale || normalizedStoredLocale || normalizeLocale(navigator.language) || (Array.isArray(navigator.languages) ? navigator.languages.map(normalizeLocale).find(Boolean) : null) || DEFAULT_LOCALE;\n\n    if (!rawQueryLocale || normalizedQueryLocale !== activeLocale) {\n        const url = new URL(window.location.href);\n        url.searchParams.set("lang", activeLocale);\n        window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);\n    }',
    'active locale selection',
  ],
]);

await patch('public/sea/skill-simulator/skill_locale_bootstrap.js', [
  [
    'function installPicker() {\n    if (document.getElementById("skill-locale-select")) return;',
    'function installPicker() {\n    if ((window.RO_SUPPORTED_LOCALES || []).length > 1 || document.getElementById("skill-locale-select")) return;',
    'duplicate skill language picker guard',
  ],
]);

await patch('scripts/generate-performance-data.mjs', [
  [
    'for (const locale of ["en-US", "zh-TW"]) {',
    'for (const locale of ["en-US", "zh-TW", "zh-CN", "th-TH", "id-ID"]) {',
    'performance data locale loop',
  ],
]);
