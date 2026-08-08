"use client";

import { useMemo, useState } from "react";
import styles from "./ZenySessionCalculator.module.css";

function safeNumber(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function formatZeny(value: number) {
  const rounded = Math.round(value);
  return `${rounded < 0 ? "−" : ""}${Math.abs(rounded).toLocaleString()} Zeny`;
}

function inputValue(value: number) {
  return Number.isFinite(value) ? value : 0;
}

export default function ZenySessionCalculator() {
  const [directIncome, setDirectIncome] = useState(0);
  const [saleIncome, setSaleIncome] = useState(0);
  const [consumables, setConsumables] = useState(0);
  const [fees, setFees] = useState(0);
  const [minutes, setMinutes] = useState(30);

  const result = useMemo(() => {
    const income = safeNumber(directIncome) + safeNumber(saleIncome);
    const costs = safeNumber(consumables) + safeNumber(fees);
    const net = income - costs;
    const duration = Math.max(1, safeNumber(minutes));
    return { income, costs, net, hourly: net * (60 / duration) };
  }, [consumables, directIncome, fees, minutes, saleIncome]);

  const reset = () => {
    setDirectIncome(0);
    setSaleIncome(0);
    setConsumables(0);
    setFees(0);
    setMinutes(30);
  };

  return (
    <section className={styles.calculator} id="zeny-session-calculator" aria-labelledby="zeny-calculator-title">
      <h2 id="zeny-calculator-title">Zeny farming session calculator</h2>
      <p className={styles.intro}>
        Enter the results of an actual session. The calculator measures net Zeny and an hourly comparison rate without inventing drop chances, market prices, or expected income.
      </p>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="direct-zeny">Direct Zeny received</label>
          <input id="direct-zeny" type="number" min="0" step="1" inputMode="numeric" value={directIncome} onChange={(event) => setDirectIncome(inputValue(event.currentTarget.valueAsNumber))} />
        </div>
        <div className={styles.field}>
          <label htmlFor="sale-zeny">Completed sales or trade value</label>
          <input id="sale-zeny" type="number" min="0" step="1" inputMode="numeric" value={saleIncome} onChange={(event) => setSaleIncome(inputValue(event.currentTarget.valueAsNumber))} />
        </div>
        <div className={styles.field}>
          <label htmlFor="consumable-cost">Consumable and recovery costs</label>
          <input id="consumable-cost" type="number" min="0" step="1" inputMode="numeric" value={consumables} onChange={(event) => setConsumables(inputValue(event.currentTarget.valueAsNumber))} />
        </div>
        <div className={styles.field}>
          <label htmlFor="listing-cost">Travel, listing, or other fees</label>
          <input id="listing-cost" type="number" min="0" step="1" inputMode="numeric" value={fees} onChange={(event) => setFees(inputValue(event.currentTarget.valueAsNumber))} />
        </div>
        <div className={styles.field}>
          <label htmlFor="session-minutes">Session length in minutes</label>
          <input id="session-minutes" type="number" min="1" step="1" inputMode="numeric" value={minutes} onChange={(event) => setMinutes(inputValue(event.currentTarget.valueAsNumber))} />
        </div>
      </div>

      <output className={styles.result} aria-live="polite">
        <span className={styles.metric}><span>Total income</span><strong>{formatZeny(result.income)}</strong></span>
        <span className={styles.metric}><span>Total costs</span><strong>{formatZeny(result.costs)}</strong></span>
        <span className={`${styles.metric}${result.net < 0 ? ` ${styles.negative}` : ""}`}><span>Net session result</span><strong>{formatZeny(result.net)}</strong></span>
        <span className={`${styles.metric}${result.hourly < 0 ? ` ${styles.negative}` : ""}`}><span>Comparable net per hour</span><strong>{formatZeny(result.hourly)}</strong></span>
      </output>

      <div className={styles.footer}>
        <p>Track Bound Zeny separately. Unsold items are inventory, not completed income; add their value only after a sale or when comparing with a clearly stated estimate.</p>
        <button className={styles.reset} type="button" onClick={reset}>Reset session</button>
      </div>
    </section>
  );
}
