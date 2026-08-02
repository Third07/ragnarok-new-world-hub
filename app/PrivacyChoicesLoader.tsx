"use client";

import { useEffect } from "react";

const CONSENT_SCRIPT = "/shared/responsive_ads.js?v=20260803-consent1";

export default function PrivacyChoicesLoader() {
  useEffect(() => {
    if (document.querySelector("script[data-rtnw-ads]") || window.__RTNW_ADS_READY__) return;

    const script = document.createElement("script");
    script.src = CONSENT_SCRIPT;
    script.async = true;
    script.dataset.rtnwAds = "true";
    document.body.appendChild(script);
  }, []);

  return null;
}

declare global {
  interface Window {
    __RTNW_ADS_READY__?: boolean;
  }
}
