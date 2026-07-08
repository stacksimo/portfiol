"use client";

import { useStore } from "@/lib/store";
import { projects, type Service } from "@/lib/data";

export default function ServiceDetail({ service }: { service: Service }) {
  const s = useStore();
  return (
    <div>
      <button className="escape-hatch" onClick={() => s.navigate("/services", "Services")}>
        ← all services
      </button>
      <h1 className="pane-title" style={{ marginTop: 14 }}>
        <span className="mono" style={{ fontSize: 14, color: "var(--accent)", verticalAlign: "middle", marginRight: 12 }}>
          {service.no}
        </span>
        {service.name}
      </h1>
      <p className="pane-sub">{service.tagline}</p>

      <div className="svc-grid">
        <div className="svc-block">
          <h4>WHO IT&apos;S FOR</h4>
          <p>{service.who}</p>
          <h4 style={{ marginTop: 22 }}>DELIVERABLES</h4>
          <ul>
            {service.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <div className="svc-block">
          <h4>PROCESS</h4>
          <ul>
            {service.process.map((p, i) => (
              <li key={p}>
                <span className="mono" style={{ color: "var(--accent)", marginRight: 10, fontSize: 11 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p}
              </li>
            ))}
          </ul>
          <h4 style={{ marginTop: 22 }}>TECHNOLOGIES</h4>
          <div className="chips">
            {service.technologies.map((t) => (
              <span key={t} className="chip" style={{ cursor: "default" }}>
                {t}
              </span>
            ))}
          </div>
          <h4 style={{ marginTop: 22 }}>TIMELINE &amp; PRICING</h4>
          <p>
            {service.timeline} · {service.pricing}
          </p>
        </div>
      </div>

      <div className="kicker">PROOF — RELATED PROJECTS</div>
      <div className="chips">
        {service.related.map((slug) => {
          const rp = projects.find((p) => p.slug === slug);
          if (!rp) return null;
          return (
            <button key={slug} className="chip" onClick={() => s.openTab(`/work/${slug}`, rp.name)}>
              {rp.name} · {rp.outcome} →
            </button>
          );
        })}
      </div>

      <div className="kicker">QUESTIONS PEOPLE ASK</div>
      <div className="faq">
        {service.faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>

      <p style={{ marginTop: 30 }}>
        <button className="btn-primary" onClick={() => s.navigate("/plan", "Plan")}>
          Plan this project →
        </button>
      </p>
    </div>
  );
}
