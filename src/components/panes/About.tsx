"use client";

import { currentFocus, goals, milestones } from "@/lib/data";

export default function AboutPane() {
  return (
    <div>
      <h1 className="pane-title">About</h1>
      <p className="pane-sub">No long paragraphs. The story in milestones, each with the lesson it taught.</p>

      <div className="kicker">TIMELINE</div>
      {milestones.map((m) => (
        <div className="mile" key={m.year + m.title}>
          <span className="yr">{m.year}</span>
          <div>
            <h3>{m.title}</h3>
            <p>{m.note}</p>
          </div>
        </div>
      ))}

      <div className="focus-grid">
        <div>
          <div className="kicker">CURRENT FOCUS</div>
          <ul className="factlist">
            {currentFocus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="kicker">NEXT</div>
          <ul className="factlist">
            {goals.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
