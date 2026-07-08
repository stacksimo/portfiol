"use client";

import type { Project } from "@/lib/data";

/** Static miniature of a project's first demo page, used as a live-feeling thumbnail. */
export default function DemoThumb({ project }: { project: Project }) {
  const page = project.demo[0];
  const fg = project.theme.fg;
  const line = (w: string, h = 7) => (
    <div style={{ width: w, height: h, borderRadius: 3, background: `color-mix(in srgb, ${fg} 22%, transparent)` }} />
  );
  return (
    <div style={{ padding: 26, display: "flex", flexDirection: "column", gap: 14, background: project.theme.bg, height: "100%" }} aria-hidden>
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ width: 60, height: 9, borderRadius: 3, background: project.theme.accent }} />
        {line("36px", 6)}
        {line("36px", 6)}
        {line("36px", 6)}
      </div>
      {page.blocks.some((b) => b.t === "hero") ? (
        <>
          <div style={{ width: "68%", height: 22, borderRadius: 4, background: `color-mix(in srgb, ${fg} 34%, transparent)`, marginTop: 12 }} />
          {line("52%")}
          <div style={{ width: 74, height: 18, borderRadius: 99, background: project.theme.accent, marginTop: 6 }} />
        </>
      ) : (
        <>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ width: "70%", height: 12, borderRadius: 3, background: project.theme.accent, marginBottom: 6 }} />
                {line("90%", 5)}
              </div>
            ))}
          </div>
          <svg viewBox="0 0 400 90" style={{ width: "100%", height: 70, border: `1px solid color-mix(in srgb, ${fg} 16%, transparent)`, borderRadius: 6 }}>
            <polyline points="0,70 50,60 100,64 150,46 200,50 250,32 300,38 350,20 400,26" fill="none" stroke={project.theme.accent} strokeWidth="2" />
          </svg>
        </>
      )}
    </div>
  );
}
