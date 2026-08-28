"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import HomeToolIcon from "./HomeToolIcon";

export type ToolCategory = "Planners" | "Database" | "Adventure" | "Utilities";

export type HubTool = {
  title: string;
  description: string;
  href: string;
  icon: string;
  category: ToolCategory;
  badge?: string;
};

const categories = ["All tools", "Planners", "Database", "Adventure", "Utilities"] as const;

export default function HomeToolLibrary({ tools }: Readonly<{ tools: HubTool[] }>) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All tools");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target;
      const isEditing = target instanceof Element && Boolean(target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])'));
      if (event.key === "/" && !isEditing && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape" && document.activeElement === searchRef.current) setQuery("");
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const filteredTools = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const categoryMatch = category === "All tools" || tool.category === category;
      const textMatch = !normalized ||
        `${tool.title} ${tool.description} ${tool.category}`.toLowerCase().includes(normalized);
      return categoryMatch && textMatch;
    });
  }, [category, query, tools]);

  return (
    <section className="tool-library" id="tools" aria-labelledby="tools-heading">
      <div className="library-heading">
        <div>
          <p className="eyebrow dark"><span /> Adventure library</p>
          <h2 id="tools-heading">Everything you need,<br />in one place.</h2>
        </div>
        <p>
          Filter this collection to find a tool, or use <a href="/search/">unified search</a> to search guides, monsters, cards, and equipment together.
        </p>
      </div>

      <div className="tool-controls">
        <label className="tool-search">
          <span aria-hidden="true">⌕</span>
          <span className="sr-only">Search tools</span>
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter tools by name or purpose…"
          />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button>}
        </label>
        <div className="category-tabs" aria-label="Filter tools by category">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? "is-active" : ""}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="tool-grid" aria-live="polite">
        {filteredTools.map((tool) => (
          <a className="tool-card" href={tool.href} key={tool.title}>
            <div className="tool-card-top">
              <span className="tool-icon"><HomeToolIcon icon={tool.icon} /></span>
              {tool.badge && <span className="tool-badge">{tool.badge}</span>}
            </div>
            <small>{tool.category}</small>
            <h3>{tool.title}</h3>
            <p>{tool.description}</p>
            <span className="tool-link">Open tool <span aria-hidden="true">→</span></span>
          </a>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="empty-state">
          <span aria-hidden="true">✧</span>
          <h3>No tools found</h3>
          <p>Try another search or reset the filters.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("All tools"); }}>Show every tool</button>
        </div>
      )}
    </section>
  );
}
