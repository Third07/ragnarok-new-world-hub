"use client";

import { useEffect, useRef, useState } from "react";
import type { RedeemCode } from "./redeem-code-data";
import styles from "./redeem-codes.module.css";

type RedeemCodeListProps = {
  codes: readonly RedeemCode[];
  allowCopyAll?: boolean;
};

export default function RedeemCodeList({ codes, allowCopyAll = true }: RedeemCodeListProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestRef = useRef(0);

  useEffect(() => () => {
    requestRef.current += 1;
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  async function copyText(value: string, label: string) {
    const request = ++requestRef.current;
    if (timerRef.current) clearTimeout(timerRef.current);
    setCopied(null);
    setMessage("");
    try {
      await navigator.clipboard.writeText(value);
      if (request !== requestRef.current) return;
      setCopied(label);
      setMessage(label === "all" ? "Shared codes copied. Redeem them one at a time." : `${label} copied.`);
      timerRef.current = setTimeout(() => setCopied(null), 2000);
    } catch {
      if (request !== requestRef.current) return;
      setMessage("Clipboard unavailable. Select the code text and use your device's Copy command.");
    }
  }

  return (
    <div className={styles.codeList}>
      <div className={styles.listActions}>
        <p>{codes.length} {allowCopyAll ? "source-listed shared codes" : "disputed or older codes"}</p>
        {allowCopyAll && codes.length > 0 ? (
          <button type="button" onClick={() => copyText(codes.map((item) => item.code).join("\n"), "all")}>
            {copied === "all" ? "Copied all" : "Copy all codes"}
          </button>
        ) : null}
      </div>
      <p className={styles.copyStatus} role="status" aria-live="polite" aria-atomic="true">{message}</p>
      <div className={styles.codeGrid}>
        {codes.map((item) => (
          <article className={styles.codeCard} key={item.code}>
            <div className={styles.codeHeader}>
              <code tabIndex={0}>{item.code}</code>
              <span className={item.confidence === "Source listed" ? styles.checked : styles.reported}>{item.confidence}</span>
            </div>
            <p>{item.rewards}</p>
            {item.note ? <small>{item.note}</small> : null}
            <div className={styles.codeSources}>
              <span>Sources:</span>
              {item.sources.map((source, index) => (
                <a href={`#source-${source}`} key={source} aria-label={`Source ${index + 1} for ${item.code}: ${source}`}>{index + 1}</a>
              ))}
            </div>
            <button type="button" aria-label={`Copy ${item.code}`} onClick={() => copyText(item.code, item.code)}>
              {copied === item.code ? "Copied" : "Copy code"}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
