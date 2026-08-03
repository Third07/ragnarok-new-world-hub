"use client";

import { useState } from "react";
import styles from "./redeem-codes.module.css";

export type RedeemCode = {
  code: string;
  rewards: string;
  note?: string;
  confidence: "Cross-checked" | "Reported";
};

type RedeemCodeListProps = {
  codes: RedeemCode[];
};

export default function RedeemCodeList({ codes }: RedeemCodeListProps) {
  const [copied, setCopied] = useState<string | null>(null);

  async function copyText(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied((current) => (current === label ? null : current)), 1800);
    } catch {
      setCopied(null);
    }
  }

  const copyAll = () => copyText(codes.map((item) => item.code).join("\n"), "all");

  return (
    <div className={styles.codeList}>
      <div className={styles.listActions}>
        <p>{codes.length} codes ready to copy</p>
        <button type="button" onClick={copyAll}>
          {copied === "all" ? "Copied all" : "Copy all codes"}
        </button>
      </div>

      <div className={styles.codeGrid}>
        {codes.map((item) => (
          <article className={styles.codeCard} key={item.code}>
            <div className={styles.codeHeader}>
              <code>{item.code}</code>
              <span className={item.confidence === "Cross-checked" ? styles.checked : styles.reported}>
                {item.confidence}
              </span>
            </div>
            <p>{item.rewards}</p>
            {item.note && <small>{item.note}</small>}
            <button type="button" onClick={() => copyText(item.code, item.code)}>
              {copied === item.code ? "Copied" : "Copy code"}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
