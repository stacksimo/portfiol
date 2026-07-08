"use client";

import { useStore } from "@/lib/store";
import type { Project } from "@/lib/data";
import DemoThumb from "./DemoThumb";

export default function ProjectCard({ project }: { project: Project }) {
  const s = useStore();
  const fav = s.favorites.includes(project.slug);
  return (
    <div className="pcard">
      <button
        style={{ display: "block", width: "100%", textAlign: "left" }}
        onClick={() => s.openTab(`/work/${project.slug}`, project.name)}
        aria-label={`Open ${project.name}`}
      >
        <div className="pcard-thumb" style={{ background: project.theme.bg }}>
          <div className="mini">
            <DemoThumb project={project} />
          </div>
        </div>
        <div className="pcard-meta">
          <h3>{project.name}</h3>
          <div className="sub">
            <span>
              {project.kind} · {project.year}
            </span>
          </div>
        </div>
      </button>
      <div style={{ padding: "0 13px 10px", display: "flex", justifyContent: "flex-end" }}>
        <button
          className={`fav ${fav ? "on" : ""}`}
          onClick={() => s.toggleFavorite(project.slug)}
          aria-label={fav ? `Unfavorite ${project.name}` : `Favorite ${project.name}`}
        >
          {fav ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
}
