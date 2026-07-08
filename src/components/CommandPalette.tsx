"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { experiments, projects, services } from "@/lib/data";

interface Item {
  id: string;
  section: string;
  label: string;
  hint?: string;
  glyph: string;
  run: () => void;
}

export default function CommandPalette() {
  const s = useStore();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => inputRef.current?.focus(), []);

  const items: Item[] = useMemo(() => {
    const nav = (path: string, label: string) => () => {
      s.setOverlay(null);
      s.navigate(path, label);
    };
    const all: Item[] = [
      ...s.recentItems.slice(0, 3).map((r, i) => ({
        id: `r${i}`,
        section: "Recent",
        label: r.label,
        glyph: "↺",
        run: nav(r.path, r.label),
      })),
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        section: "Projects",
        label: p.name,
        hint: p.kind,
        glyph: "▤",
        run: nav(`/work/${p.slug}`, p.name),
      })),
      ...services.map((sv) => ({
        id: `s-${sv.slug}`,
        section: "Services",
        label: sv.name,
        hint: sv.timeline,
        glyph: "◫",
        run: nav(`/services/${sv.slug}`, sv.name),
      })),
      ...experiments.map((e) => ({
        id: `e-${e.slug}`,
        section: "Playground",
        label: e.name,
        hint: e.kind,
        glyph: "✳",
        run: nav("/playground", "Playground"),
      })),
      { id: "c-plan", section: "Commands", label: "Plan a project", glyph: "+", hint: "contact", run: nav("/plan", "Plan") },
      {
        id: "c-theme",
        section: "Commands",
        label: "Toggle theme",
        glyph: "◐",
        run: () => {
          s.toggleTheme();
          s.setOverlay(null);
        },
      },
      {
        id: "c-dev",
        section: "Commands",
        label: "Toggle developer mode",
        glyph: "</>",
        hint: "⌘J",
        run: () => {
          s.toggleDevMode();
          s.achieve("dev", "developer mode discovered");
          s.setOverlay(null);
        },
      },
      {
        id: "c-term",
        section: "Commands",
        label: "Terminal",
        glyph: "$",
        hint: "secret",
        run: () => {
          s.setOverlay("terminal");
          s.achieve("terminal", "terminal mode found");
        },
      },
      {
        id: "c-help",
        section: "Commands",
        label: "Keyboard shortcuts",
        glyph: "?",
        run: () => s.setOverlay("cheatsheet"),
      },
      { id: "c-devpage", section: "Commands", label: "How this site is built", glyph: "◍", hint: "/dev", run: nav("/dev", "Dev") },
    ];
    if (!q.trim()) return all;
    const needle = q.toLowerCase();
    return all.filter((i) => i.label.toLowerCase().includes(needle) || i.section.toLowerCase().includes(needle) || i.hint?.toLowerCase().includes(needle));
  }, [q, s]);

  useEffect(() => setSel(0), [q]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((x) => Math.min(x + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((x) => Math.max(x - 1, 0));
    } else if (e.key === "Enter" && items[sel]) {
      items[sel].run();
    }
  };

  useEffect(() => {
    listRef.current?.querySelector(".sel")?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  let lastSection = "";

  return (
    <div className="overlay" onClick={() => s.setOverlay(null)}>
      <div className="palette" role="dialog" aria-label="Command palette" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKey}
          placeholder="Search projects, services, commands…"
          aria-label="Search"
        />
        <div className="palette-list" ref={listRef}>
          {items.length === 0 && <div className="palette-section">no results — try &quot;saas&quot; or &quot;terminal&quot;</div>}
          {items.map((it, i) => {
            const header = it.section !== lastSection ? <div className="palette-section" key={`h-${it.section}`}>{it.section.toUpperCase()}</div> : null;
            lastSection = it.section;
            return (
              <div key={it.id}>
                {header}
                <button className={`palette-item ${i === sel ? "sel" : ""}`} onMouseEnter={() => setSel(i)} onClick={it.run}>
                  <span className="glyph" aria-hidden>
                    {it.glyph}
                  </span>
                  {it.label}
                  {it.hint && <span className="hint">{it.hint}</span>}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
