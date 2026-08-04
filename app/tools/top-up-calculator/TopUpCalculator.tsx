"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "../../field-guide.module.css";
import actionStyles from "../../tool-actions.module.css";

type Currency = "PHP" | "USD" | "IDR" | "THB" | "MYR" | "SGD";

type SavedCalculation = {
  id: string;
  savedAt: string;
  label: string;
  currency: Currency;
  price: number;
  quantity: number;
  discount: number;
  fee: number;
  fixedFee: number;
};

const STORAGE_KEY = "rtnw:topup-results";
const DEFAULTS = {
  currency: "PHP" as Currency,
  price: 499,
  quantity: 1,
  discount: 0,
  fee: 0,
  fixedFee: 0,
};

const currencySymbols: Record<Currency, string> = {
  PHP: "₱",
  USD: "$",
  IDR: "Rp ",
  THB: "฿",
  MYR: "RM ",
  SGD: "S$",
};

function numberParam(params: URLSearchParams, name: string, fallback: number) {
  const value = Number(params.get(name));
  return Number.isFinite(value) && value >= 0 ? value : fallback;
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

export default function TopUpCalculator() {
  const [currency, setCurrency] = useState<Currency>(DEFAULTS.currency);
  const [price, setPrice] = useState(DEFAULTS.price);
  const [quantity, setQuantity] = useState(DEFAULTS.quantity);
  const [discount, setDiscount] = useState(DEFAULTS.discount);
  const [fee, setFee] = useState(DEFAULTS.fee);
  const [fixedFee, setFixedFee] = useState(DEFAULTS.fixedFee);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState<SavedCalculation[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedCurrency = params.get("currency") as Currency | null;
    if (requestedCurrency && requestedCurrency in currencySymbols) setCurrency(requestedCurrency);
    setPrice(numberParam(params, "price", DEFAULTS.price));
    setQuantity(Math.max(1, Math.floor(numberParam(params, "quantity", DEFAULTS.quantity))));
    setDiscount(Math.min(100, numberParam(params, "discount", DEFAULTS.discount)));
    setFee(numberParam(params, "fee", DEFAULTS.fee));
    setFixedFee(numberParam(params, "fixed", DEFAULTS.fixedFee));

    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(stored)) setSaved(stored.slice(0, 5));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }

    setReady(true);
  }, []);

  const result = useMemo(() => {
    const safePrice = Math.max(0, price || 0);
    const safeQuantity = Math.max(1, Math.floor(quantity || 1));
    const safeDiscount = Math.min(100, Math.max(0, discount || 0));
    const safeFee = Math.max(0, fee || 0);
    const safeFixed = Math.max(0, fixedFee || 0);
    const subtotal = safePrice * safeQuantity;
    const discountValue = subtotal * (safeDiscount / 100);
    const afterDiscount = subtotal - discountValue;
    const percentageFee = afterDiscount * (safeFee / 100);
    const total = afterDiscount + percentageFee + safeFixed;
    const perPack = total / safeQuantity;
    return { subtotal, discountValue, percentageFee, total, perPack, quantity: safeQuantity };
  }, [discount, fee, fixedFee, price, quantity]);

  const symbol = currencySymbols[currency] ?? `${currency} `;
  const money = (value: number) =>
    `${symbol}${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const buildUrl = () => {
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("currency", currency);
    url.searchParams.set("price", String(price));
    url.searchParams.set("quantity", String(quantity));
    url.searchParams.set("discount", String(discount));
    url.searchParams.set("fee", String(fee));
    url.searchParams.set("fixed", String(fixedFee));
    return url.toString();
  };

  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("currency", currency);
    url.searchParams.set("price", String(price));
    url.searchParams.set("quantity", String(quantity));
    url.searchParams.set("discount", String(discount));
    url.searchParams.set("fee", String(fee));
    url.searchParams.set("fixed", String(fixedFee));
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, [currency, discount, fee, fixedFee, price, quantity, ready]);

  const persistSaved = (items: SavedCalculation[]) => {
    const next = items.slice(0, 5);
    setSaved(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const shareResult = async () => {
    const url = buildUrl();
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My RTNW top-up estimate",
          text: `Estimated checkout: ${money(result.total)}`,
          url,
        });
        setStatus("Calculation shared.");
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
      setStatus("Calculation link copied.");
    } catch {
      setStatus("The browser could not copy the link.");
    }
  };

  const saveResult = () => {
    const entry: SavedCalculation = {
      id: createId(),
      savedAt: new Date().toISOString(),
      label: `${money(result.total)} total · ${result.quantity} package${result.quantity === 1 ? "" : "s"}`,
      currency,
      price,
      quantity,
      discount,
      fee,
      fixedFee,
    };
    persistSaved([entry, ...saved]);
    setStatus("Saved on this device.");
  };

  const loadSaved = (entry: SavedCalculation) => {
    setCurrency(entry.currency);
    setPrice(entry.price);
    setQuantity(entry.quantity);
    setDiscount(entry.discount);
    setFee(entry.fee);
    setFixedFee(entry.fixedFee);
    setStatus("Saved calculation loaded.");
  };

  const reset = () => {
    setCurrency(DEFAULTS.currency);
    setPrice(DEFAULTS.price);
    setQuantity(DEFAULTS.quantity);
    setDiscount(DEFAULTS.discount);
    setFee(DEFAULTS.fee);
    setFixedFee(DEFAULTS.fixedFee);
    setStatus("Inputs reset.");
  };

  return (
    <div className={styles.toolShell}>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            value={currency}
            onChange={(event) => setCurrency(event.target.value as Currency)}
          >
            <option value="PHP">PHP — Philippine peso</option>
            <option value="USD">USD — US dollar</option>
            <option value="IDR">IDR — Indonesian rupiah</option>
            <option value="THB">THB — Thai baht</option>
            <option value="MYR">MYR — Malaysian ringgit</option>
            <option value="SGD">SGD — Singapore dollar</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="price">Price per package</label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="quantity">Number of packages</label>
          <input
            id="quantity"
            type="number"
            min="1"
            step="1"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="discount">Discount (%)</label>
          <input
            id="discount"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={discount}
            onChange={(event) => setDiscount(Number(event.target.value))}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="fee">Payment/service fee (%)</label>
          <input
            id="fee"
            type="number"
            min="0"
            step="0.01"
            value={fee}
            onChange={(event) => setFee(Number(event.target.value))}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="fixedFee">Fixed fee</label>
          <input
            id="fixedFee"
            type="number"
            min="0"
            step="0.01"
            value={fixedFee}
            onChange={(event) => setFixedFee(Number(event.target.value))}
          />
        </div>
      </div>

      <section className={styles.result} aria-live="polite">
        <strong>Final checkout estimate: {money(result.total)}</strong>
        <p>
          Use the amount shown on the last payment screen as the final authority. Taxes, wallet conversion,
          regional pricing, and voucher rules may be applied differently by each provider.
        </p>
        <dl>
          <dt>Package subtotal</dt>
          <dd>{money(result.subtotal)}</dd>
          <dt>Discount</dt>
          <dd>−{money(result.discountValue)}</dd>
          <dt>Percentage fee</dt>
          <dd>+{money(result.percentageFee)}</dd>
          <dt>Fixed fee</dt>
          <dd>+{money(Math.max(0, fixedFee || 0))}</dd>
          <dt>Effective cost per package</dt>
          <dd>{money(result.perPack)}</dd>
          <dt>Quantity</dt>
          <dd>{result.quantity}</dd>
        </dl>
      </section>

      <div className={actionStyles.actions} aria-label="Calculation actions">
        <button className={`${actionStyles.button} ${actionStyles.primary}`} type="button" onClick={shareResult}>
          Share result
        </button>
        <button className={actionStyles.button} type="button" onClick={copyLink}>Copy link</button>
        <button className={actionStyles.button} type="button" onClick={saveResult}>Save</button>
        <button className={actionStyles.button} type="button" onClick={() => window.print()}>Print</button>
        <button className={actionStyles.button} type="button" onClick={reset}>Reset</button>
        <p className={actionStyles.status} aria-live="polite">{status}</p>
      </div>

      <section className={actionStyles.saved} aria-labelledby="saved-top-up-results">
        <h2 id="saved-top-up-results">Saved calculations</h2>
        {saved.length === 0 ? (
          <p className={actionStyles.empty}>Saved calculations remain only in this browser.</p>
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
