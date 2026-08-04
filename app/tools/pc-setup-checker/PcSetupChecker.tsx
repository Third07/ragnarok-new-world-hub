"use client";

import { useMemo, useState } from "react";
import styles from "../../field-guide.module.css";

type Route = "steam" | "emulator" | "cloud";

export default function PcSetupChecker() {
  const [ram, setRam] = useState(8);
  const [storage, setStorage] = useState(40);
  const [virtualization, setVirtualization] = useState("unknown");
  const [gpu, setGpu] = useState("integrated");
  const [priority, setPriority] = useState("simple");

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
    if (virtualization === "unknown") notes.push("Check Task Manager → Performance → CPU to see whether virtualization is enabled.");

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
      steam: "Your answers favor the cleaner native PC route. Install to an SSD when possible, start at 60 FPS and medium settings, and keep extra free space for updates.",
      emulator: "Your answers favor the Android build on PC. Use a current 64-bit instance, allocate resources conservatively, and confirm virtualization before troubleshooting graphics settings.",
      cloud: "Local RAM, storage, graphics, or your stated priority makes a short cloud trial worth testing. Verify latency, billing, persistent storage, and account security before paying for a long plan.",
    };

    if (ram < 12) notes.push("The Steam listing publishes 12 GB RAM as its minimum, so native PC performance is uncertain below that value.");
    if (storage < 30) notes.push("The Steam listing publishes 30 GB available storage; keep more than the bare minimum for patches and temporary files.");

    return { winner, title: labels[winner], description: descriptions[winner], notes, scores };
  }, [gpu, priority, ram, storage, virtualization]);

  return (
    <div className={styles.toolShell}>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label htmlFor="ram">Installed RAM</label>
          <select id="ram" value={ram} onChange={(event) => setRam(Number(event.target.value))}>
            <option value={4}>4 GB</option><option value={8}>8 GB</option><option value={12}>12 GB</option><option value={16}>16 GB</option><option value={24}>24 GB</option><option value={32}>32 GB or more</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="storage">Free storage for the game</label>
          <input id="storage" type="number" min="0" max="1000" value={storage} onChange={(event) => setStorage(Math.max(0, Number(event.target.value) || 0))} />
        </div>
        <div className={styles.field}>
          <label htmlFor="virtualization">Hardware virtualization</label>
          <select id="virtualization" value={virtualization} onChange={(event) => setVirtualization(event.target.value)}>
            <option value="unknown">I do not know</option><option value="yes">Enabled</option><option value="no">Disabled</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="gpu">Graphics hardware</label>
          <select id="gpu" value={gpu} onChange={(event) => setGpu(event.target.value)}>
            <option value="dedicated">Modern dedicated GPU</option><option value="integrated">Integrated graphics</option><option value="old">Older or unsupported GPU</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="priority">Your main priority</label>
          <select id="priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option value="simple">Simplest official PC setup</option><option value="mobile">Use the Android/mobile version</option><option value="low-spec">Avoid local hardware and storage load</option>
          </select>
        </div>
      </div>

      <section className={styles.result} aria-live="polite">
        <strong>{result.title}</strong>
        <p>{result.description}</p>
        <dl>
          <dt>Steam route score</dt><dd>{result.scores.steam}</dd>
          <dt>Emulator route score</dt><dd>{result.scores.emulator}</dd>
          <dt>Cloud route score</dt><dd>{result.scores.cloud}</dd>
        </dl>
        {result.notes.length > 0 && <ul>{result.notes.map((note) => <li key={note}>{note}</li>)}</ul>}
      </section>
    </div>
  );
}
