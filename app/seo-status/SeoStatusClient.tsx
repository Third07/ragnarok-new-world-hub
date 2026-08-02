"use client";

import { useEffect, useState } from "react";
import styles from "./seo-status.module.css";

type AuditStatus = "pass" | "warn" | "error";

type AuditResult = {
  status: AuditStatus;
  id: string;
  message: string;
  details?: unknown;
};

type AuditReport = {
  generatedAt: string;
  site: string;
  sitemap: {
    url: string;
    urlCount: number;
    expectedRouteCount: number;
  };
  verification: {
    google: boolean;
    bing: boolean;
  };
  summary: {
    pass: number;
    warn: number;
    error: number;
  };
  results: AuditResult[];
};

function StatusPill({ status }: { status: AuditStatus }) {
  const label = status === "pass" ? "Passed" : status === "warn" ? "Review" : "Error";
  return <span className={`${styles.statusPill} ${styles[status]}`}>{label}</span>;
}

export default function SeoStatusClient() {
  const [report, setReport] = useState<AuditReport | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetch("/seo-audit.json", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`Audit report returned ${response.status}`);
        return response.json() as Promise<AuditReport>;
      })
      .then((data) => {
        if (active) setReport(data);
      })
      .catch((reason: unknown) => {
        if (active) setError(reason instanceof Error ? reason.message : "Unable to load the audit report.");
      });

    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return (
      <section className={styles.reportPanel} aria-live="polite">
        <p className={styles.kicker}>Build report unavailable</p>
        <h2>Run the SEO audit once.</h2>
        <p>
          The dashboard could not read <code>/seo-audit.json</code>. Run <code>npm run seo:audit</code> locally or redeploy so the prebuild audit can generate the report.
        </p>
        <small>{error}</small>
      </section>
    );
  }

  if (!report) {
    return (
      <section className={styles.reportPanel} aria-live="polite">
        <p className={styles.kicker}>Loading diagnostics</p>
        <h2>Reading the latest build report…</h2>
      </section>
    );
  }

  return (
    <>
      <section className={styles.summaryGrid} aria-label="SEO audit summary">
        <article>
          <span>Routes in sitemap</span>
          <strong>{report.sitemap.urlCount}</strong>
          <small>Expected: {report.sitemap.expectedRouteCount}</small>
        </article>
        <article>
          <span>Passed checks</span>
          <strong>{report.summary.pass}</strong>
          <small>Automated crawl and metadata checks</small>
        </article>
        <article>
          <span>Warnings</span>
          <strong>{report.summary.warn}</strong>
          <small>Usually pending ownership verification</small>
        </article>
        <article>
          <span>Errors</span>
          <strong>{report.summary.error}</strong>
          <small>The strict production audit blocks on these</small>
        </article>
      </section>

      <section className={styles.verificationPanel} aria-labelledby="verification-title">
        <div>
          <p className={styles.kicker}>Search ownership</p>
          <h2 id="verification-title">Verification configuration</h2>
          <p>Tokens are read from deployment environment variables and emitted as public HTML meta tags.</p>
        </div>
        <div className={styles.verificationGrid}>
          <article>
            <span>Google Search Console</span>
            <strong>{report.verification.google ? "Configured" : "Not configured"}</strong>
            <StatusPill status={report.verification.google ? "pass" : "warn"} />
          </article>
          <article>
            <span>Bing Webmaster Tools</span>
            <strong>{report.verification.bing ? "Configured" : "Not configured"}</strong>
            <StatusPill status={report.verification.bing ? "pass" : "warn"} />
          </article>
        </div>
      </section>

      <section className={styles.checksPanel} aria-labelledby="checks-title">
        <div className={styles.panelHeading}>
          <div>
            <p className={styles.kicker}>Latest audit</p>
            <h2 id="checks-title">Crawl and metadata checks</h2>
          </div>
          <time dateTime={report.generatedAt}>
            {new Date(report.generatedAt).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </time>
        </div>
        <div className={styles.checkList}>
          {report.results.map((result) => (
            <article key={result.id}>
              <StatusPill status={result.status} />
              <div>
                <strong>{result.id.replaceAll("-", " ")}</strong>
                <p>{result.message}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
