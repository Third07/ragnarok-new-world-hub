"use client";

import { useMemo, useState } from "react";
import styles from "../../field-guide.module.css";

const currencySymbols: Record<string, string> = {
  PHP: "₱",
  USD: "$",
  IDR: "Rp ",
  THB: "฿",
  MYR: "RM ",
  SGD: "S$",
};

export default function TopUpCalculator() {
  const [currency, setCurrency] = useState("PHP");
  const [price, setPrice] = useState(499);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [fee, setFee] = useState(0);
  const [fixedFee, setFixedFee] = useState(0);

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
  const money = (value: number) => `${symbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className={styles.toolShell}>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label htmlFor="currency">Currency</label>
          <select id="currency" value={currency} onChange={(event) => setCurrency(event.target.value)}>
            <option value="PHP">PHP — Philippine peso</option><option value="USD">USD — US dollar</option><option value="IDR">IDR — Indonesian rupiah</option><option value="THB">THB — Thai baht</option><option value="MYR">MYR — Malaysian ringgit</option><option value="SGD">SGD — Singapore dollar</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="price">Price per package</label>
          <input id="price" type="number" min="0" step="0.01" value={price} onChange={(event) => setPrice(Number(event.target.value))} />
        </div>
        <div className={styles.field}>
          <label htmlFor="quantity">Number of packages</label>
          <input id="quantity" type="number" min="1" step="1" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} />
        </div>
        <div className={styles.field}>
          <label htmlFor="discount">Discount (%)</label>
          <input id="discount" type="number" min="0" max="100" step="0.01" value={discount} onChange={(event) => setDiscount(Number(event.target.value))} />
        </div>
        <div className={styles.field}>
          <label htmlFor="fee">Payment/service fee (%)</label>
          <input id="fee" type="number" min="0" step="0.01" value={fee} onChange={(event) => setFee(Number(event.target.value))} />
        </div>
        <div className={styles.field}>
          <label htmlFor="fixedFee">Fixed fee</label>
          <input id="fixedFee" type="number" min="0" step="0.01" value={fixedFee} onChange={(event) => setFixedFee(Number(event.target.value))} />
        </div>
      </div>

      <section className={styles.result} aria-live="polite">
        <strong>Final checkout estimate: {money(result.total)}</strong>
        <p>Use the amount shown on the last payment screen as the final authority. Taxes, wallet conversion, regional pricing, and voucher rules may be applied differently by each provider.</p>
        <dl>
          <dt>Package subtotal</dt><dd>{money(result.subtotal)}</dd>
          <dt>Discount</dt><dd>−{money(result.discountValue)}</dd>
          <dt>Percentage fee</dt><dd>+{money(result.percentageFee)}</dd>
          <dt>Fixed fee</dt><dd>+{money(Math.max(0, fixedFee || 0))}</dd>
          <dt>Effective cost per package</dt><dd>{money(result.perPack)}</dd>
          <dt>Quantity</dt><dd>{result.quantity}</dd>
        </dl>
      </section>
    </div>
  );
}
