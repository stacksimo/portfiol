"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { projects, type Project, type ProjectTab } from "@/lib/data";
import DemoBrowser from "../DemoBrowser";
import DemoThumb from "../DemoThumb";

const TABS: { id: ProjectTab; label: string }[] = [
  { id: "preview", label: "Preview" },
  { id: "case", label: "Case study" },
  { id: "design", label: "Design" },
  { id: "build", label: "Build" },
  { id: "quality", label: "Quality" },
  { id: "voices", label: "Voices" },
];

export default function ProjectWindow({ project }: { project: Project }) {
  const s = useStore();
  const [tab, setTab] = useState<ProjectTab>("preview");
  const compareWith = s.compare ? projects.find((p) => p.slug === s.compare && p.slug !== project.slug) : null;

  useEffect(() => {
    s.achieve(`viewed-${project.slug}`, `explored ${project.name}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.slug]);

  return (
    <div>
      <h1 className="pane-title">{project.name}</h1>
      <p className="pane-sub">{project.summary}</p>

      <div className="ptabs" role="tablist" aria-label={`${project.name} sections`}>
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`ptab ${tab === t.id ? "active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "preview" && (
        <div style={compareWith ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 } : undefined}>
          <DemoBrowser project={project} compact={!!compareWith} />
          {compareWith && (
            <div>
              <DemoBrowser project={compareWith} compact />
              <p className="pane-sub" style={{ marginTop: 8, fontSize: 12 }}>
                comparing with {compareWith.name} ·{" "}
                <button className="escape-hatch" onClick={() => s.setCompare(null)}>
                  exit compare
                </button>
              </p>
            </div>
          )}
          {!compareWith && (
            <p className="pane-sub" style={{ marginTop: 10, fontSize: 12 }}>
              This is an interactive reconstruction of the shipped product — scroll it, navigate it, resize it. Client data replaced with
              demo data.
            </p>
          )}
        </div>
      )}

      {tab === "case" && (
        <div className="case">
          <h3>Challenge</h3>
          <p>{project.challenge}</p>
          <h3>Solution</h3>
          <p>{project.solution}</p>
          <h3>Process</h3>
          <div className="timeline">
            {project.process.map((st) => (
              <div className="titem" key={st.step}>
                <span className="when">{st.step}</span>
                <span className="what">{st.note}</span>
              </div>
            ))}
          </div>
          <h3>Results</h3>
          <ul className="factlist">
            {project.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {tab === "design" && (
        <div className="case" style={{ maxWidth: "none" }}>
          <h3>Wireframe → shipped UI</h3>
          <p>Structure was agreed on paper-grade wireframes before any visual design. Same screen, both stages:</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 16 }}>
            <div style={{ border: "1px solid var(--hairline-strong)", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ filter: "grayscale(1) contrast(0.82)", height: 240 }}>
                <DemoThumb project={project} />
              </div>
              <p className="mono" style={{ fontSize: 11, color: "var(--muted)", padding: "8px 12px" }}>
                wireframe — week 1
              </p>
            </div>
            <div style={{ border: "1px solid var(--hairline-strong)", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ height: 240 }}>
                <DemoThumb project={project} />
              </div>
              <p className="mono" style={{ fontSize: 11, color: "var(--muted)", padding: "8px 12px" }}>
                shipped UI — launch
              </p>
            </div>
          </div>
          <h3>Design decisions</h3>
          <ul className="factlist">
            <li>One accent color ({project.theme.accent}) doing all the signaling work</li>
            <li>Real empty, error and loading states designed before the happy path</li>
            <li>Type and spacing tokens shared between marketing and product surfaces</li>
          </ul>
        </div>
      )}

      {tab === "build" && (
        <div className="case">
          <h3>Architecture</h3>
          <ul className="factlist">
            {project.architecture.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <h3>APIs</h3>
          <ul className="factlist">
            {project.apis.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <h3>Database</h3>
          <p>{project.database}</p>
          <h3>Authentication</h3>
          <p>{project.auth}</p>
          <h3>Stack</h3>
          <div className="chips" style={{ marginTop: 8 }}>
            {project.stack.map((t) => (
              <span key={t} className="chip on" style={{ cursor: "default" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {tab === "quality" && (
        <div className="case" style={{ maxWidth: "none" }}>
          <h3>Lighthouse</h3>
          <div className="gauges">
            <Gauge label="Performance" value={project.lighthouse.performance} />
            <Gauge label="Accessibility" value={project.lighthouse.accessibility} />
            <Gauge label="Best practices" value={project.lighthouse.bestPractices} />
            <Gauge label="SEO" value={project.lighthouse.seo} />
          </div>
          <h3>Performance</h3>
          <p>{project.perfNote}</p>
          <h3>SEO</h3>
          <p>{project.seoNote}</p>
          <h3>Accessibility</h3>
          <p>{project.a11yNote}</p>
        </div>
      )}

      {tab === "voices" && (
        <div className="case">
          <blockquote className="quote">
            “{project.testimonial.quote}”<span className="who">{project.testimonial.who}</span>
          </blockquote>
          <h3>Related projects</h3>
          <div className="chips" style={{ marginTop: 8 }}>
            {project.related.map((slug) => {
              const rp = projects.find((p) => p.slug === slug);
              if (!rp) return null;
              return (
                <button key={slug} className="chip" onClick={() => s.openTab(`/work/${slug}`, rp.name)}>
                  {rp.name} →
                </button>
              );
            })}
          </div>
          <h3>Want one of these?</h3>
          <p>
            <button className="escape-hatch" onClick={() => s.navigate("/plan", "Plan")}>
              plan a project like {project.name} →
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

function Gauge({ label, value }: { label: string; value: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 60);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="gauge">
      <svg viewBox="0 0 74 74" role="img" aria-label={`${label}: ${value} of 100`}>
        <circle className="track" cx="37" cy="37" r={r} fill="none" strokeWidth="4" />
        <circle
          className="arc"
          cx="37"
          cy="37"
          r={r}
          fill="none"
          strokeWidth="4"
          strokeDasharray={c}
          strokeDashoffset={drawn ? c * (1 - value / 100) : c}
          transform="rotate(-90 37 37)"
        />
        <text x="37" y="43" textAnchor="middle">
          {value}
        </text>
      </svg>
      <div className="glabel">{label}</div>
    </div>
  );
}
