"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { email, projects, services } from "@/lib/data";
import Studio from "./panes/Studio";
import Explorer from "./panes/Explorer";
import ProjectWindow from "./panes/ProjectWindow";
import ServicesPane from "./panes/Services";
import ServiceDetail from "./panes/ServiceDetail";
import ProcessPane from "./panes/Process";
import AboutPane from "./panes/About";
import Playground from "./panes/Playground";
import Planner from "./panes/Planner";
import DevPage from "./panes/DevPage";
import CommandPalette from "./CommandPalette";
import Cheatsheet from "./Cheatsheet";
import Terminal from "./Terminal";
import ContextPanel from "./ContextPanel";

const NAV = [
  { path: "/", label: "Studio", glyph: "◉" },
  { path: "/work", label: "Work", glyph: "▤" },
  { path: "/services", label: "Services", glyph: "◫" },
  { path: "/process", label: "Process", glyph: "→" },
  { path: "/about", label: "About", glyph: "◍" },
  { path: "/playground", label: "Playground", glyph: "✳" },
];

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let konamiIdx = 0;

export default function Shell() {
  const s = useStore();
  const pathname = usePathname() || "/";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      const inInput = (e.target as HTMLElement)?.tagName === "INPUT" || (e.target as HTMLElement)?.tagName === "TEXTAREA";

      if (e.key === KONAMI[konamiIdx] && !inInput) {
        konamiIdx++;
        if (konamiIdx === KONAMI.length) {
          konamiIdx = 0;
          s.achieve("konami", "you found the studio's secret");
          s.toast("↑↑↓↓←→←→BA — nice.");
        }
      } else {
        konamiIdx = e.key === KONAMI[0] ? 1 : 0;
      }

      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        s.setOverlay(s.overlay === "palette" ? null : "palette");
      } else if (mod && e.key.toLowerCase() === "b") {
        e.preventDefault();
        s.toggleSidebar();
      } else if (mod && e.key.toLowerCase() === "j") {
        e.preventDefault();
        s.toggleDevMode();
        s.achieve("dev", "developer mode discovered");
      } else if (mod && e.key.toLowerCase() === "w") {
        e.preventDefault();
        if (s.activeTab) s.closeTab(s.activeTab);
      } else if (e.key === "?" && !inInput) {
        e.preventDefault();
        s.setOverlay(s.overlay === "cheatsheet" ? null : "cheatsheet");
      } else if (e.key === "Escape") {
        if (s.overlay) s.setOverlay(null);
        else if (s.compare) s.setCompare(null);
      } else if (!inInput && !mod && /^[1-9]$/.test(e.key)) {
        const t = s.tabs[parseInt(e.key, 10) - 1];
        if (t) s.activateTab(t.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [s]);

  const pane = useMemo(() => {
    const seg = pathname.split("/").filter(Boolean);
    if (seg.length === 0) return <Studio />;
    if (seg[0] === "work" && seg.length === 1) return <Explorer />;
    if (seg[0] === "work" && seg[1]) {
      const p = projects.find((x) => x.slug === seg[1]);
      return p ? <ProjectWindow project={p} /> : <NotFound />;
    }
    if (seg[0] === "services" && seg.length === 1) return <ServicesPane />;
    if (seg[0] === "services" && seg[1]) {
      const sv = services.find((x) => x.slug === seg[1]);
      return sv ? <ServiceDetail service={sv} /> : <NotFound />;
    }
    if (seg[0] === "process") return <ProcessPane />;
    if (seg[0] === "about") return <AboutPane />;
    if (seg[0] === "playground") return <Playground />;
    if (seg[0] === "plan") return <Planner />;
    if (seg[0] === "dev") return <DevPage />;
    return <NotFound />;
  }, [pathname]);

  return (
    <div className="shell boot-in">
      <a className="skip" href="#main">
        skip to content
      </a>

      <header className="titlebar">
        <span className="wordmark">
          STACKSIMO<span className="dot">_OS</span>
        </span>

        <nav className="tabstrip" aria-label="Open tabs">
          {s.tabs.map((t) => (
            <button
              key={t.id}
              className={`tab ${t.id === s.activeTab ? "active" : ""}`}
              onClick={() => s.activateTab(t.id)}
              aria-current={t.id === s.activeTab ? "page" : undefined}
            >
              {t.label}
              {s.tabs.length > 1 && (
                <span
                  className="x"
                  role="button"
                  aria-label={`Close ${t.label}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    s.closeTab(t.id);
                  }}
                >
                  ×
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="titlebar-actions">
          <button className="tbtn" onClick={() => s.setOverlay("palette")} aria-label="Open command palette">
            search <kbd>⌘K</kbd>
          </button>
          <button className={`tbtn ${s.devMode ? "on" : ""}`} onClick={s.toggleDevMode} aria-pressed={s.devMode} title="Developer mode (⌘J)">
            {"</>"}
          </button>
          <button className="tbtn" onClick={s.toggleTheme} aria-label="Toggle theme">
            {s.theme === "light" ? "◐" : "◑"}
          </button>
        </div>
      </header>

      <div className="shell-body">
        <nav className={`sidebar ${s.sidebarCollapsed ? "collapsed" : ""}`} aria-label="Main navigation">
          {NAV.map((n) => {
            const active = n.path === "/" ? pathname === "/" : pathname.startsWith(n.path);
            return (
              <button key={n.path} className={`side-item ${active ? "active" : ""}`} onClick={() => s.navigate(n.path, n.label)}>
                <span className="glyph" aria-hidden>
                  {n.glyph}
                </span>
                {!s.sidebarCollapsed && n.label}
              </button>
            );
          })}
          <div className="side-spacer" />
          <button className="side-item" onClick={s.toggleSidebar} aria-label="Toggle sidebar">
            <span className="glyph" aria-hidden>
              {s.sidebarCollapsed ? "»" : "«"}
            </span>
            {!s.sidebarCollapsed && "collapse"}
          </button>
          <button className={`side-item side-plan ${pathname === "/plan" ? "active" : ""}`} onClick={() => s.navigate("/plan", "Plan")}>
            {s.sidebarCollapsed ? "+" : "Plan a project"}
          </button>
        </nav>

        <main id="main" className="workspace">
          <div key={pathname} className="pane pane-anim">
            {pane}
            {s.devMode && <DevStrip path={pathname} />}
          </div>
        </main>

        <ContextPanel pathname={pathname} />
      </div>

      <nav className="mobile-dock" aria-label="Mobile navigation">
        {[...NAV.slice(0, 4), { path: "/plan", label: "Plan", glyph: "+" }].map((n) => {
          const active = n.path === "/" ? pathname === "/" : pathname.startsWith(n.path);
          return (
            <button key={n.path} className={active ? "active" : ""} onClick={() => s.navigate(n.path, n.label)}>
              <span className="glyph" aria-hidden>
                {n.glyph}
              </span>
              {n.label}
            </button>
          );
        })}
      </nav>

      {s.devMode && <div className="grid-overlay" aria-hidden />}

      {s.overlay === "palette" && <CommandPalette />}
      {s.overlay === "cheatsheet" && <Cheatsheet />}
      {s.overlay === "terminal" && <Terminal />}

      <div className="toasts" aria-live="polite">
        {s.toasts.map((t) => (
          <div key={t.id} className="toast">
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function NotFound() {
  const s = useStore();
  return (
    <div>
      <h1 className="pane-title">Nothing here.</h1>
      <p className="pane-sub">This pane doesn&apos;t exist. Try the palette (⌘K) or head back to the studio.</p>
      <p style={{ marginTop: 20 }}>
        <button className="escape-hatch" onClick={() => s.navigate("/", "Studio")}>
          back to studio →
        </button>
      </p>
    </div>
  );
}

function DevStrip({ path }: { path: string }) {
  const s = useStore();
  const route = path === "/" ? "src/components/panes/Studio.tsx" : `src/components/panes/${path.split("/")[1]}…`;
  return (
    <div className="dev-strip">
      <b>dev</b> · route <b>{path}</b> · pane component {route} · state via React context, persisted to localStorage · styling: CSS
      custom properties, zero UI libraries ·{" "}
      <button className="escape-hatch" onClick={() => s.navigate("/dev", "Dev")}>
        open /dev →
      </button>
    </div>
  );
}

export { NAV };
export const contactEmail = email;
