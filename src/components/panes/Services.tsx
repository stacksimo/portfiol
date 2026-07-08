"use client";

import { useStore } from "@/lib/store";
import { services } from "@/lib/data";

export default function ServicesPane() {
  const s = useStore();
  return (
    <div>
      <h1 className="pane-title">Services</h1>
      <p className="pane-sub">Each one opens like a product: who it&apos;s for, deliverables, process, timeline, price.</p>
      <div style={{ marginTop: 26 }}>
        {services.map((sv) => (
          <button key={sv.slug} className="svc-row" onClick={() => s.navigate(`/services/${sv.slug}`, sv.name)}>
            <span className="no">{sv.no}</span>
            <span className="name serif">{sv.name}</span>
            <span className="tag">{sv.tagline}</span>
            <span className="arrow" aria-hidden>
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
