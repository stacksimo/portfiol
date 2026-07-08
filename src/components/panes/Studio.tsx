"use client";

import { useStore } from "@/lib/store";
import { projects } from "@/lib/data";
import ProjectCard from "../ProjectCard";

export default function Studio() {
  const s = useStore();
  return (
    <div>
      <div className="studio-intro boot-in">
        <h1>
          I build websites, landing pages and <em>SaaS products.</em>
        </h1>
        <p>
          This portfolio is itself a small product — explore the work inside it. Open a project, scroll its live preview, read how it was
          built. If it&apos;s this considered here, imagine it on your project.
        </p>
      </div>

      <div className="kicker boot-in-2">FEATURED WORK</div>
      <div className="feature-grid boot-in-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {s.recentItems.length > 1 && (
        <>
          <div className="kicker">RECENTLY VIEWED</div>
          <div className="chips">
            {s.recentItems.map((r) => (
              <button key={r.path} className="chip" onClick={() => s.navigate(r.path, r.label)}>
                {r.label}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="kicker">IN A HURRY?</div>
      <p className="pane-sub">
        Skip the tour.{" "}
        <button className="escape-hatch" onClick={() => s.navigate("/plan", "Plan")}>
          plan a project with me →
        </button>
      </p>
    </div>
  );
}
