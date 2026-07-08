"use client";

import { useState } from "react";
import type { DemoBlock, Project } from "@/lib/data";

type Device = "desktop" | "tablet" | "mobile";

export default function DemoBrowser({ project, compact = false }: { project: Project; compact?: boolean }) {
  const [history, setHistory] = useState<string[]>(["/"]);
  const [idx, setIdx] = useState(0);
  const [device, setDevice] = useState<Device>("desktop");
  const [full, setFull] = useState(false);

  const path = history[idx];
  const page = project.demo.find((p) => p.path === path) ?? project.demo[0];

  const go = (to: string) => {
    if (to === path) return;
    const next = [...history.slice(0, idx + 1), to];
    setHistory(next);
    setIdx(next.length - 1);
  };

  return (
    <div className={`browser ${full ? "full" : ""}`}>
      <div className="browser-chrome">
        <span className="lights" aria-hidden>
          <i /> <i /> <i />
        </span>
        <button className="chrome-btn" disabled={idx === 0} onClick={() => setIdx(idx - 1)} aria-label="Back">
          ◁
        </button>
        <button className="chrome-btn" disabled={idx >= history.length - 1} onClick={() => setIdx(idx + 1)} aria-label="Forward">
          ▷
        </button>
        <span className="urlbar">
          {project.slug}-demo.stacksimo.dev{path === "/" ? "" : path}
        </span>
        {!compact && (
          <span className="device-switch" role="group" aria-label="Device size">
            {(["desktop", "tablet", "mobile"] as Device[]).map((d) => (
              <button key={d} className={device === d ? "on" : ""} onClick={() => setDevice(d)}>
                {d === "desktop" ? "1280" : d === "tablet" ? "768" : "390"}
              </button>
            ))}
          </span>
        )}
        <button className="chrome-btn" onClick={() => setFull(!full)} aria-label="Fullscreen">
          {full ? "🗕" : "⛶"}
        </button>
      </div>
      <div className="viewport-outer">
        <div className={`viewport ${device}`} style={{ background: project.theme.bg, color: project.theme.fg }}>
          <DemoSite blocks={page.blocks} project={project} onNav={go} activePath={path} />
        </div>
      </div>
    </div>
  );
}

function DemoSite({
  blocks,
  project,
  onNav,
  activePath,
}: {
  blocks: DemoBlock[];
  project: Project;
  onNav: (p: string) => void;
  activePath: string;
}) {
  const border = { borderColor: `color-mix(in srgb, ${project.theme.fg} 16%, transparent)` };
  return (
    <div className="demo">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "nav":
            return (
              <div className="demo-nav" key={i} style={border}>
                <span className="brand" style={{ color: project.theme.accent }}>
                  {b.brand}
                </span>
                {b.links.map((l) => {
                  const target = project.demo.find((p) => p.title.toLowerCase() === l.toLowerCase())?.path;
                  return (
                    <button
                      key={l}
                      onClick={() => target && onNav(target)}
                      style={target === activePath ? { opacity: 1, color: project.theme.accent } : undefined}
                    >
                      {l}
                    </button>
                  );
                })}
              </div>
            );
          case "hero":
            return (
              <div className="demo-hero" key={i}>
                <h1>{b.title}</h1>
                <p>{b.sub}</p>
                <span className="demo-cta" style={{ background: project.theme.accent, color: project.theme.bg }}>
                  {b.cta}
                </span>
              </div>
            );
          case "stats":
            return (
              <div className="demo-stats" key={i} style={border}>
                {b.items.map((it) => (
                  <div key={it.k}>
                    <strong style={{ color: project.theme.accent }}>{it.v}</strong>
                    <span>{it.k}</span>
                  </div>
                ))}
              </div>
            );
          case "chart":
            return (
              <div className="demo-chart" key={i} style={border}>
                <span className="label">{b.label}</span>
                <svg viewBox="0 0 400 140" preserveAspectRatio="none" aria-hidden>
                  <polyline
                    points="0,110 40,96 80,102 120,80 160,84 200,62 240,70 280,48 320,52 360,30 400,36"
                    fill="none"
                    stroke={project.theme.accent}
                    strokeWidth="2"
                  />
                  <polyline
                    points="0,110 40,96 80,102 120,80 160,84 200,62 240,70 280,48 320,52 360,30 400,36 400,140 0,140"
                    fill={project.theme.accent}
                    opacity="0.08"
                  />
                </svg>
              </div>
            );
          case "table":
            return (
              <div className="demo-table" key={i}>
                <div className="label">{b.label}</div>
                {b.rows.map((r, ri) => (
                  <div className="trow" key={ri} style={border}>
                    {r.map((c, ci) => (
                      <span key={ci}>{c}</span>
                    ))}
                  </div>
                ))}
              </div>
            );
          case "cards":
            return (
              <div className="demo-cards" key={i}>
                {b.items.map((c) => (
                  <div className="demo-card" key={c.title} style={border}>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                ))}
              </div>
            );
          case "form":
            return (
              <div className="demo-form" key={i} style={border}>
                <div className="label">{b.label}</div>
                {b.fields.map((f) => (
                  <div className="field" key={f} style={border}>
                    {f}
                  </div>
                ))}
                <span className="demo-cta" style={{ background: project.theme.accent, color: project.theme.bg }}>
                  Submit
                </span>
              </div>
            );
          case "footer":
            return (
              <div className="demo-footer" key={i} style={border}>
                {b.note}
              </div>
            );
        }
      })}
    </div>
  );
}
