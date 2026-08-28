"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
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

function readStoredLanguage(): Language | null {
  try {
    return normalizeLanguage(window.localStorage.getItem("ro_lang"));
  } catch {
    return null;
  }
}

function rememberLanguage(language: Language) {
  try {
    window.localStorage.setItem("ro_lang", language);
  } catch {
    // Keep the preference for this visit when storage is blocked or full.
  }
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
    <label className={className} title="Tool language — guides remain in English">
      <span className="language-switcher-icon" aria-hidden="true">◎</span>
      <span className="language-switcher-label">Language</span>
      <select
        aria-label="Change tool language; guides remain in English"
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
  const pathname = usePathname();
  const [language, setLanguage] = useState<Language>("en-US");
  const languageRef = useRef<Language | null>(null);
  const [desktopHost, setDesktopHost] = useState<Element | null>(null);
  const [mobileHost, setMobileHost] = useState<Element | null>(null);
  const [fallbackHost, setFallbackHost] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const queryLanguage = normalizeLanguage(new URLSearchParams(window.location.search).get("lang"));
    const initialLanguage = queryLanguage || languageRef.current || readStoredLanguage() || normalizeLanguage(window.navigator.language) || "en-US";
    languageRef.current = initialLanguage;
    rememberLanguage(initialLanguage);
    updateToolLinks(initialLanguage);

    // SiteHeader is a stable layout component. Locate its slots once per route,
    // not on every mutation made by filters, FAQ accordions, or copy feedback.
    const normalHost = document.querySelector(".header-actions");
    const fallback = normalHost ? null : document.querySelector("header");
    const menuHost = document.querySelector(".mobile-menu");
    queueMicrotask(() => {
      if (cancelled) return;
      setLanguage(initialLanguage);
      setDesktopHost(normalHost || fallback);
      setFallbackHost(Boolean(fallback));
      setMobileHost(menuHost);
    });

    // Newly filtered or streamed tool links inherit the preference at activation.
    const localizeActivatedLink = (event: Event) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href^="/sea/"]');
      if (!link) return;
      const url = new URL(link.getAttribute("href") || "", window.location.origin);
      url.searchParams.set("lang", languageRef.current || "en-US");
      link.setAttribute("href", `${url.pathname}${url.search}${url.hash}`);
    };
    document.addEventListener("click", localizeActivatedLink, true);
    document.addEventListener("auxclick", localizeActivatedLink, true);
    return () => {
      cancelled = true;
      document.removeEventListener("click", localizeActivatedLink, true);
      document.removeEventListener("auxclick", localizeActivatedLink, true);
    };
  }, [pathname]);

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    languageRef.current = nextLanguage;
    rememberLanguage(nextLanguage);

    const url = new URL(window.location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.set("lang", nextLanguage);
      window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
    }

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
