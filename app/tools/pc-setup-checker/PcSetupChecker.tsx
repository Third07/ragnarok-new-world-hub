"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "../../field-guide.module.css";
import actionStyles from "../../tool-actions.module.css";

type Route = "steam" | "emulator" | "cloud";
type Virtualization = "unknown" | "yes" | "no";
type Graphics = "dedicated" | "integrated" | "old";
type Priority = "simple" | "mobile" | "low-spec";

type SavedSetup = {
  id: string;
  savedAt: string;
  label: string;
  ram: number;
  storage: number;
  virtualization: Virtualization;
  gpu: Graphics;
  priority: Priority;
};

const STORAGE_KEY = "rtnw:pc-setup-results";
const DEFAULTS = {
  ram: 8,
  storage: 40,
  virtualization: "unknown" as Virtualization,
  gpu: "integrated" as Graphics,
  priority: "simple" as Priority,
};

function numberParam(params: URLSearchParams, name: string, fallback: number) {
  const value = Number(params.get(name));
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

function allowedParam<T extends string>(
  params: URLSearchParams,
  name: string,
  allowed: readonly T[],
  fallback: T,
) {
  const value = params.get(name) as T | null;
  return value && allowed.includes(value) ? value : fallback;
}

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function createId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function PcSetupChecker() {
  const [ram, setRam] = useState(DEFAULTS.ram);
  const [storage, setStorage] = useState(DEFAULTS.storage);
  const [virtualization, setVirtualization] = useState<Virtualization>(DEFAULTS.virtualization);
  const [gpu, setGpu] = useState<Graphics>(DEFAULTS.gpu);
  const [priority, setPriority] = useState<Priority>(DEFAULTS.priority);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState<SavedSetup[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // URL parameters intentionally hydrate these client-only controls after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRam(numberParam(params, "ram", DEFAULTS.ram));
    setStorage(numberParam(params, "storage", DEFAULTS.storage));
    setVirtualization(
      allowedParam(params, "vt", ["unknown", "yes", "no"] as const, DEFAULTS.virtualization),
    );
    setGpu(
      allowedParam(params, "gpu", ["dedicated", "integrated", "old"] as const, DEFAULTS.gpu),
    );
    setPriority(
      allowedParam(params, "priority", ["simple", "mobile", "low-spec"] as const, DEFAULTS.priority),
    );

    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(stored)) setSaved(stored.slice(0, 5));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }

    setReady(true);
  }, []);

  const result = useMemo(() => {
    const scores: Record<Route, number> = { steam: 0, emulator: 0, cloud: 0 };
    const notes: string[] = [];

    if (ram >= 16) scores.steam += 4;
    else if (ram >= 12) scores.steam += 3;
    else scores.cloud += 2;

    if (ram >= 12) scores.emulator += 3;
    else if (ram >= 8) scores.emulator += 1;
    else scores.cloud += 3;

    if (storage >= 45) scores.steam += 3;
    else if (storage >= 30) scores.steam += 1;
    else scores.cloud += 3;

    if (storage >= 20) scores.emulator += 2;
    else scores.cloud += 2;

    if (virtualization === "yes") scores.emulator += 4;
    if (virtualization === "no") {
      scores.emulator -= 3;
      notes.push("Enable Intel VT-x or AMD-V before relying on an emulator.");
    }
    if (virtualization === "unknown") {
      notes.push("Check Task Manager → Performance → CPU to see whether virtualization is enabled.");
    }

    if (gpu === "dedicated") scores.steam += 3;
    if (gpu === "integrated") {
      scores.emulator += 1;
      notes.push("Start at 720p or medium settings and test busy areas before raising graphics quality.");
    }
    if (gpu === "old") scores.cloud += 3;

    if (priority === "simple") scores.steam += 3;
    if (priority === "mobile") scores.emulator += 3;
    if (priority === "low-spec") scores.cloud += 4;

    const winner = (Object.entries(scores) as [Route, number][]).sort((a, b) => b[1] - a[1])[0][0];
    const labels: Record<Route, string> = {
      steam: "Try the official Steam client first",
      emulator: "Try a 64-bit Android emulator first",
      cloud: "Test a cloud route before installing locally",
    };
    const descriptions: Record<Route, string> = {
      steam:
        "Your answers favor the cleaner native PC route. Install to an SSD when possible, start at 60 FPS and medium settings, and keep extra free space for updates.",
      emulator:
        "Your answers favor the Android build on PC. Use a current 64-bit instance, allocate resources conservatively, and confirm virtualization before troubleshooting graphics settings.",
      cloud:
        "Local RAM, storage, graphics, or your stated priority makes a short cloud trial worth testing. Verify latency, billing, persistent storage, and account security before paying for a long plan.",
    };

    if (ram < 12) {
      notes.push("The published Steam memory baseline is above this value, so native PC performance is uncertain.");
    }
    if (storage < 30) {
      notes.push("Keep additional storage free for patches, extraction, and temporary files.");
    }

    return { winner, title: labels[winner], description: descriptions[winner], notes, scores };
  }, [gpu, priority, ram, storage, virtualization]);

  const buildUrl = () => {
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("ram", String(ram));
    url.searchParams.set("storage", String(storage));
    url.searchParams.set("vt", virtualization);
    url.searchParams.set("gpu", gpu);
    url.searchParams.set("priority", priority);
    return url.toString();
  };

  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("ram", String(ram));
    url.searchParams.set("storage", String(storage));
    url.searchParams.set("vt", virtualization);
    url.searchParams.set("gpu", gpu);
    url.searchParams.set("priority", priority);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, [gpu, priority, ram, ready, storage, virtualization]);

  const persistSaved = (items: SavedSetup[]) => {
    const next = items.slice(0, 5);
    setSaved(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const shareResult = async () => {
    const url = buildUrl();
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My RTNW PC setup recommendation",
          text: result.title,
          url,
        });
        setStatus("Result shared.");
      } else {
        await copyText(url);
        setStatus("Share link copied.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("Sharing was unavailable. Use Copy link instead.");
    }
  };

  const copyLink = async () => {
    try {
      await copyText(buildUrl());
      setStatus("Result link copied.");
    } catch {
      setStatus("The browser could not copy the link.");
    }
  };

  const saveResult = () => {
    const entry: SavedSetup = {
      id: createId(),
      savedAt: new Date().toISOString(),
      label: `${result.title} · ${ram} GB RAM / ${storage} GB free`,
      ram,
      storage,
      virtualization,
      gpu,
      priority,
    };
    persistSaved([entry, ...saved]);
    setStatus("Saved on this device.");
  };

  const loadSaved = (entry: SavedSetup) => {
    setRam(entry.ram);
    setStorage(entry.storage);
    setVirtualization(entry.virtualization);
    setGpu(entry.gpu);
    setPriority(entry.priority);
    setStatus("Saved setup loaded.");
  };

  const reset = () => {
    setRam(DEFAULTS.ram);
    setStorage(DEFAULTS.storage);
    setVirtualization(DEFAULTS.virtualization);
    setGpu(DEFAULTS.gpu);
    setPriority(DEFAULTS.priority);
    setStatus("Inputs reset.");
  };

  return (
    <div className={styles.toolShell}>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label htmlFor="ram">Installed RAM</label>
          <select id="ram" value={ram} onChange={(event) => setRam(Number(event.target.value))}>
            <option value={4}>4 GB</option>
            <option value={8}>8 GB</option>
            <option value={12}>12 GB</option>
            <option value={16}>16 GB</option>
            <option value={24}>24 GB</option>
            <option value={32}>32 GB or more</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="storage">Free storage for the game</label>
          <input
            id="storage"
            type="number"
            min="0"
            max="1000"
            value={storage}
            onChange={(event) => setStorage(Math.max(0, Number(event.target.value) || 0))}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="virtualization">Hardware virtualization</label>
          <select
            id="virtualization"
            value={virtualization}
            onChange={(event) => setVirtualization(event.target.value as Virtualization)}
          >
            <option value="unknown">I do not know</option>
            <option value="yes">Enabled</option>
            <option value="no">Disabled</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="gpu">Graphics hardware</label>
          <select id="gpu" value={gpu} onChange={(event) => setGpu(event.target.value as Graphics)}>
            <option value="dedicated">Modern dedicated GPU</option>
            <option value="integrated">Integrated graphics</option>
            <option value="old">Older or unsupported GPU</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="priority">Your main priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value as Priority)}
          >
            <option value="simple">Simplest official PC setup</option>
            <option value="mobile">Use the Android/mobile version</option>
            <option value="low-spec">Avoid local hardware and storage load</option>
          </select>
        </div>
      </div>

      <section className={styles.result} aria-live="polite">
        <strong>{result.title}</strong>
        <p>{result.description}</p>
        <dl>
          <dt>Steam route score</dt>
          <dd>{result.scores.steam}</dd>
          <dt>Emulator route score</dt>
          <dd>{result.scores.emulator}</dd>
          <dt>Cloud route score</dt>
          <dd>{result.scores.cloud}</dd>
        </dl>
        {result.notes.length > 0 && (
          <ul>{result.notes.map((note) => <li key={note}>{note}</li>)}</ul>
        )}
      </section>

      <div className={actionStyles.actions} aria-label="Result actions">
        <button className={`${actionStyles.button} ${actionStyles.primary}`} type="button" onClick={shareResult}>
          Share result
        </button>
        <button className={actionStyles.button} type="button" onClick={copyLink}>Copy link</button>
        <button className={actionStyles.button} type="button" onClick={saveResult}>Save</button>
        <button className={actionStyles.button} type="button" onClick={() => window.print()}>Print</button>
        <button className={actionStyles.button} type="button" onClick={reset}>Reset</button>
        <p className={actionStyles.status} aria-live="polite">{status}</p>
      </div>

      <section className={actionStyles.saved} aria-labelledby="saved-pc-setups">
        <h2 id="saved-pc-setups">Saved setups</h2>
        {saved.length === 0 ? (
          <p className={actionStyles.empty}>No saved setups yet. Choose Save to keep this result.</p>
        ) : (
          <ul className={actionStyles.savedList}>
            {saved.map((entry) => (
              <li className={actionStyles.savedItem} key={entry.id}>
                <span className={actionStyles.savedCopy}>
                  <strong>{entry.label}</strong>
                  <span>{new Date(entry.savedAt).toLocaleString()}</span>
                </span>
                <span className={actionStyles.savedButtons}>
                  <button type="button" onClick={() => loadSaved(entry)}>Load</button>
                  <button type="button" onClick={() => persistSaved(saved.filter((item) => item.id !== entry.id))}>
                    Delete
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
