"use client";

import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { projects } from "@/lib/data";
import ProjectCard from "../ProjectCard";

const ALL_TAGS = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();

export default function Explorer() {
  const s = useStore();
  const [q, setQ] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [favsOnly, setFavsOnly] = useState(false);

  const results = useMemo(() => {
    return projects.filter((p) => {
      if (favsOnly && !s.favorites.includes(p.slug)) return false;
      if (tags.length && !tags.every((t) => p.tags.includes(t))) return false;
      if (q.trim()) {
        const needle = q.toLowerCase();
        const hay = `${p.name} ${p.kind} ${p.summary} ${p.tags.join(" ")} ${p.stack.join(" ")}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [q, tags, favsOnly, s.favorites]);

  const toggleTag = (t: string) => setTags((ts) => (ts.includes(t) ? ts.filter((x) => x !== t) : [...ts, t]));

  return (
    <div>
      <h1 className="pane-title">Work</h1>
      <p className="pane-sub">Every project opens as a live preview with its full case study. Filter, search, favorite.</p>

      <div className="explorer-bar">
        <div className="search">
          <span aria-hidden>⌕</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects…" aria-label="Search projects" />
        </div>
        <button className={`chip ${favsOnly ? "on" : ""}`} onClick={() => setFavsOnly(!favsOnly)}>
          ★ favorites
        </button>
      </div>

      <div className="chips" role="group" aria-label="Filters">
        {ALL_TAGS.map((t) => (
          <button key={t} className={`chip ${tags.includes(t) ? "on" : ""}`} onClick={() => toggleTag(t)} aria-pressed={tags.includes(t)}>
            {t}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <div className="empty">
          Nothing matches.{" "}
          <button
            className="escape-hatch"
            onClick={() => {
              setTags([]);
              setQ("");
              setFavsOnly(false);
            }}
          >
            clear filters
          </button>
        </div>
      ) : (
        <div className="feature-grid" aria-live="polite">
          {results.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
