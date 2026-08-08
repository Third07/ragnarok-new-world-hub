"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const LANGUAGES = [
  { value: "en-US", label: "English" },
  { value: "zh-CN", label: "简体中文" },
  { value: "th-TH", label: "ไทย" },
  { value: "id-ID", label: "Bahasa Indonesia" },
] as const;

type Language = (typeof LANGUAGES)[number]["value"];

function normalizeLanguage(value: string | null | undefined): Language | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  const exact = LANGUAGES.find((language) => language.value.toLowerCase() === normalized);
  if (exact) return exact.value;
  if (normalized.startsWith("zh")) return "zh-CN";
  if (normalized.startsWith("th")) return "th-TH";
  if (normalized.startsWith("id") || normalized.startsWith("in")) return "id-ID";
  if (normalized.startsWith("en")) return "en-US";
  return null;
}

function updateToolLinks(language: Language) {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="/sea/"]').forEach((link) => {
    const url = new URL(link.getAttribute("href") || "", window.location.origin);
    url.searchParams.set("lang", language);
    const localizedHref = `${url.pathname}${url.search}${url.hash}`;
    if (link.getAttribute("href") !== localizedHref) link.setAttribute("href", localizedHref);
  });
}

function LanguageControl({
  language,
  onChange,
  mobileMenu = false,
  fallback = false,
}: {
  language: Language;
  onChange: (language: Language) => void;
  mobileMenu?: boolean;
  fallback?: boolean;
}) {
  const className = mobileMenu
    ? "mobile-language-switcher"
    : fallback
      ? "header-language-switcher header-language-switcher--fallback"
      : "header-language-switcher";

  return (
    <label className={className} title="Change language">
      <span className="language-switcher-icon" aria-hidden="true">◎</span>
      <span className="language-switcher-label">Language</span>
      <select
        aria-label="Change language"
        value={language}
        onChange={(event) => onChange(event.target.value as Language)}
      >
        {LANGUAGES.map((option) => (
          <option value={option.value} key={option.value}>{option.label}</option>
        ))}
      </select>
      <span className="language-switcher-caret" aria-hidden="true">⌄</span>
    </label>
  );
}

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<Language>("en-US");
  const [desktopHost, setDesktopHost] = useState<Element | null>(null);
  const [mobileHost, setMobileHost] = useState<Element | null>(null);
  const [fallbackHost, setFallbackHost] = useState(false);

  useEffect(() => {
    const queryLanguage = normalizeLanguage(new URLSearchParams(window.location.search).get("lang"));
    const storedLanguage = normalizeLanguage(window.localStorage.getItem("ro_lang"));
    const browserLanguage = normalizeLanguage(window.navigator.language);
    const initialLanguage = queryLanguage || storedLanguage || browserLanguage || "en-US";

    queueMicrotask(() => setLanguage(initialLanguage));
    window.localStorage.setItem("ro_lang", initialLanguage);
    document.documentElement.lang = initialLanguage;
    updateToolLinks(initialLanguage);

    const findHosts = () => {
      const normalHost = document.querySelector(".header-actions");
      const fallback = normalHost ? null : document.querySelector("header");
      setDesktopHost(normalHost || fallback);
      setFallbackHost(Boolean(fallback));
      setMobileHost(document.querySelector(".mobile-menu"));
      const currentLanguage = normalizeLanguage(window.localStorage.getItem("ro_lang")) || initialLanguage;
      updateToolLinks(currentLanguage);
    };

    findHosts();
    const observer = new MutationObserver(findHosts);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("ro_lang", nextLanguage);
    document.documentElement.lang = nextLanguage;

    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLanguage);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);

    updateToolLinks(nextLanguage);
    window.dispatchEvent(new CustomEvent("ro-language-change", { detail: nextLanguage }));
  };

  return (
    <>
      {desktopHost && createPortal(
        <LanguageControl language={language} onChange={changeLanguage} fallback={fallbackHost} />,
        desktopHost,
      )}
      {mobileHost && createPortal(
        <LanguageControl language={language} onChange={changeLanguage} mobileMenu />,
        mobileHost,
      )}
    </>
  );
}
