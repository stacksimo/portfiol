"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function ProcessPane() {
  const s = useStore();
  const [seen, setSeen] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = ref.current?.querySelectorAll(".jnode");
    if (!nodes) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setSeen((x) => Math.max(x, idx + 1));
          }
        });
      },
      { threshold: 0.6 }
    );
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      <h1 className="pane-title">How a project runs</h1>
      <p className="pane-sub">Nine steps, no surprises. You always know what happens next and what it costs.</p>

      <div className="journey" ref={ref}>
        {processSteps.map((st, i) => (
          <div key={st.name} className={`jnode ${i < seen ? "seen" : ""}`} data-idx={i}>
            <span className="dot">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>{st.name}</h3>
              <p>{st.note}</p>
            </div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 10 }}>
        <button className="btn-primary" onClick={() => s.navigate("/plan", "Plan")}>
          Start at step one →
        </button>
      </p>
    </div>
  );
}
