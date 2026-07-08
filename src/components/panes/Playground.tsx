"use client";

import { useEffect, useRef, useState } from "react";
import { experiments } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function Playground() {
  const s = useStore();
  useEffect(() => {
    s.achieve("playground", "visited the playground");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="pane-title">Playground</h1>
      <p className="pane-sub">Experiments, not deliverables. Small things built to understand something — all running live right here.</p>

      <div className="exp-grid">
        {experiments.map((e) => (
          <div key={e.slug} className="exp">
            <div className="stage">
              {e.slug === "thread" && <Thread />}
              {e.slug === "grid-life" && <GridLife />}
              {e.slug === "type-scale" && <TypeScale />}
              {e.slug === "ascii-cam" && <Boot />}
            </div>
            <div className="meta">
              <span className="kind">{e.kind.toUpperCase()}</span>
              <h3>{e.name}</h3>
              <p>{e.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Thread() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    let raf = 0;
    const pts = Array.from({ length: 14 }, () => ({ x: 120, y: 70 }));
    let target = { x: 120, y: 70 };
    let auto = 0;
    const resize = () => {
      cv.width = cv.offsetWidth;
      cv.height = cv.offsetHeight;
    };
    resize();
    const onMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      target = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    cv.addEventListener("mousemove", onMove);
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent");
    const tick = () => {
      auto += 0.02;
      if (document.activeElement !== cv) {
        target = { x: cv.width / 2 + Math.cos(auto) * cv.width * 0.3, y: cv.height / 2 + Math.sin(auto * 1.4) * cv.height * 0.28 };
      }
      pts[0].x += (target.x - pts[0].x) * 0.18;
      pts[0].y += (target.y - pts[0].y) * 0.18;
      for (let i = 1; i < pts.length; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.3;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.3;
      }
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      pts.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      cv.removeEventListener("mousemove", onMove);
    };
  }, []);
  return <canvas ref={ref} style={{ width: "100%", height: "100%" }} aria-label="Spring thread animation" />;
}

function GridLife() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    cv.width = cv.offsetWidth;
    cv.height = cv.offsetHeight;
    const cell = 7;
    const W = Math.floor(cv.width / cell);
    const H = Math.floor(cv.height / cell);
    let grid = Array.from({ length: H }, () => Array.from({ length: W }, () => Math.random() < 0.14));
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--muted");
    const step = () => {
      const next = grid.map((row, y) =>
        row.map((alive, x) => {
          let n = 0;
          for (let dy = -1; dy <= 1; dy++)
            for (let dx = -1; dx <= 1; dx++) {
              if (!dx && !dy) continue;
              const yy = (y + dy + H) % H;
              const xx = (x + dx + W) % W;
              if (grid[yy][xx]) n++;
            }
          return alive ? n === 2 || n === 3 : n === 3;
        })
      );
      grid = next;
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = accent;
      grid.forEach((row, y) =>
        row.forEach((alive, x) => {
          if (alive) ctx.fillRect(x * cell, y * cell, cell - 1, cell - 1);
        })
      );
    };
    const iv = setInterval(step, 140);
    const onClick = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      const x = Math.floor((e.clientX - r.left) / cell);
      const y = Math.floor((e.clientY - r.top) / cell);
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const yy = (y + dy + H) % H;
          const xx = (x + dx + W) % W;
          grid[yy][xx] = Math.random() < 0.8;
        }
    };
    cv.addEventListener("click", onClick);
    return () => {
      clearInterval(iv);
      cv.removeEventListener("click", onClick);
    };
  }, []);
  return <canvas ref={ref} style={{ width: "100%", height: "100%", cursor: "crosshair" }} aria-label="Game of life — click to seed" />;
}

function TypeScale() {
  const [ratio, setRatio] = useState(1.25);
  const sizes = [0, 1, 2, 3].map((i) => Math.round(12 * Math.pow(ratio, i)));
  return (
    <div style={{ padding: 12, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, overflow: "hidden" }}>
        {sizes.map((sz) => (
          <span key={sz} className="serif" style={{ fontSize: sz, lineHeight: 1 }}>
            Aa
          </span>
        ))}
      </div>
      <label style={{ fontSize: 10, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
        ratio {ratio.toFixed(2)}
        <input
          type="range"
          min="1.1"
          max="1.6"
          step="0.01"
          value={ratio}
          onChange={(e) => setRatio(Number(e.target.value))}
          style={{ width: "100%", accentColor: "var(--accent)" }}
        />
      </label>
    </div>
  );
}

function Boot() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setFrame((f) => (f + 1) % 24), 160);
    return () => clearInterval(iv);
  }, []);
  const lines = ["stacksimo os v1.0", "mounting workspace…", "loading projects [####----]", "loading projects [########]", "ready."];
  const visible = lines.slice(0, Math.min(Math.floor(frame / 4) + 1, lines.length));
  return (
    <pre
      className="mono"
      style={{ padding: 14, fontSize: 10.5, lineHeight: 1.9, color: "var(--muted)", height: "100%", overflow: "hidden" }}
      aria-label="Boot sequence animation"
    >
      {visible.join("\n")}
      {frame % 2 === 0 ? "\n█" : "\n "}
    </pre>
  );
}
