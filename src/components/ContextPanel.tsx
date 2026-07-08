"use client";

import { useStore } from "@/lib/store";
import { email, projects, services } from "@/lib/data";

export default function ContextPanel({ pathname }: { pathname: string }) {
  const s = useStore();
  const seg = pathname.split("/").filter(Boolean);
  const project = seg[0] === "work" && seg[1] ? projects.find((p) => p.slug === seg[1]) : null;
  const service = seg[0] === "services" && seg[1] ? services.find((x) => x.slug === seg[1]) : null;

  return (
    <aside className="context" aria-label="Context">
      {project ? (
        <>
          <h4>PROJECT</h4>
          <dl>
            <div className="row">
              <dt>type</dt>
              <dd>{project.kind}</dd>
            </div>
            <div className="row">
              <dt>year</dt>
              <dd>{project.year}</dd>
            </div>
            <div className="row">
              <dt>duration</dt>
              <dd>{project.duration}</dd>
            </div>
            <div className="row">
              <dt>outcome</dt>
              <dd>{project.outcome}</dd>
            </div>
          </dl>
          <h4>STACK</h4>
          <dl>
            {project.stack.map((t) => (
              <div className="row" key={t}>
                <dt>{t}</dt>
                <dd />
              </div>
            ))}
          </dl>
          <h4>ACTIONS</h4>
          <p style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
            <button className="escape-hatch" onClick={() => s.toggleFavorite(project.slug)}>
              {s.favorites.includes(project.slug) ? "★ favorited" : "☆ favorite"}
            </button>
            <button
              className="escape-hatch"
              onClick={() => {
                const other = projects.find((p) => p.slug !== project.slug);
                s.setCompare(s.compare ? null : other?.slug ?? null);
                s.achieve("compare", "used side-by-side compare");
              }}
            >
              {s.compare ? "exit compare" : "⌘\\ compare with…"}
            </button>
            <button className="escape-hatch" onClick={() => s.navigate("/plan", "Plan")}>
              build something like this →
            </button>
          </p>
        </>
      ) : service ? (
        <>
          <h4>SERVICE</h4>
          <dl>
            <div className="row">
              <dt>timeline</dt>
              <dd>{service.timeline}</dd>
            </div>
            <div className="row">
              <dt>pricing</dt>
              <dd>{service.pricing}</dd>
            </div>
          </dl>
          <h4>ACTIONS</h4>
          <p>
            <button className="escape-hatch" onClick={() => s.navigate("/plan", "Plan")}>
              plan this project →
            </button>
          </p>
        </>
      ) : (
        <>
          <h4>STATUS</h4>
          <p>
            <span className="status-dot" aria-hidden />
            booking projects for next month
          </p>
          <h4>SHORTCUTS</h4>
          <dl>
            <div className="row">
              <dt>search</dt>
              <dd>
                <kbd>⌘K</kbd>
              </dd>
            </div>
            <div className="row">
              <dt>dev mode</dt>
              <dd>
                <kbd>⌘J</kbd>
              </dd>
            </div>
            <div className="row">
              <dt>sidebar</dt>
              <dd>
                <kbd>⌘B</kbd>
              </dd>
            </div>
            <div className="row">
              <dt>help</dt>
              <dd>
                <kbd>?</kbd>
              </dd>
            </div>
          </dl>
        </>
      )}

      <h4>HIRE ME</h4>
      <p>
        <a className="escape-hatch" href={`mailto:${email}`}>
          {email}
        </a>
      </p>
    </aside>
  );
}
