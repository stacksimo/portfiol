"use client";

import { useStore } from "@/lib/store";

const TREE = `stacksimo-os/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx          shell mounts here, fonts, metadata
│  │  ├─ globals.css         entire design system — tokens + components
│  │  └─ [[...slug]]/        one catch-all; the shell routes panes itself
│  ├─ components/
│  │  ├─ Shell.tsx           titlebar · sidebar · tabs · keyboard map
│  │  ├─ CommandPalette.tsx  ⌘K — fuzzy-ish search over everything
│  │  ├─ DemoBrowser.tsx     the built-in browser: history, devices, fullscreen
│  │  ├─ Terminal.tsx        you found this already, right?
│  │  └─ panes/              Studio · Explorer · ProjectWindow · Services · …
│  └─ lib/
│     ├─ data.ts             every word of content, typed — zero hardcoded pages
│     └─ store.tsx           tabs, theme, favorites, achievements (localStorage)
└─ …`;

const DECISIONS: [string, string][] = [
  ["No UI library", "Every component is hand-written CSS on design tokens. Nothing to fight, nothing generic."],
  ["No screenshots", "Project previews are interactive reconstructions rendered from typed data — the portfolio demonstrates the craft it sells."],
  ["Client-routed shell", "One layout owns tabs/sidebar/palette; panes swap inside it. Feels like software, not pages."],
  ["Content as data", "projects, services, process, milestones all live in data.ts. Adding a project is a data change, not a build."],
  ["State that respects you", "Theme, favorites, recents, achievements persist in localStorage. No cookies, no tracking."],
];

export default function DevPage() {
  const s = useStore();
  return (
    <div>
      <h1 className="pane-title">How this site is built</h1>
      <p className="pane-sub">
        Developer mode is honest mode. This portfolio is a Next.js app with no UI library and a hand-written design system.
      </p>

      <div className="kicker">FOLDER STRUCTURE</div>
      <pre className="brief" style={{ fontSize: 12 }}>{TREE}</pre>

      <div className="kicker">TECHNICAL DECISIONS</div>
      {DECISIONS.map(([t, d]) => (
        <div className="mile" key={t}>
          <span className="yr" style={{ minWidth: 150 }}>{t}</span>
          <div>
            <p>{d}</p>
          </div>
        </div>
      ))}

      <div className="kicker">STACK & DEPLOY</div>
      <ul className="factlist">
        <li>Next.js (App Router) + TypeScript, static export</li>
        <li>CSS custom properties, dual theme, prefers-reduced-motion respected</li>
        <li>Fonts: Fraunces / Inter / IBM Plex Mono, self-hosted via next/font</li>
        <li>CI: lint + typecheck + build on every push</li>
      </ul>

      <p style={{ marginTop: 26 }}>
        <button
          className="escape-hatch"
          onClick={() => {
            s.setOverlay("terminal");
            s.achieve("terminal", "terminal mode found");
          }}
        >
          $ open terminal →
        </button>
      </p>
    </div>
  );
}
