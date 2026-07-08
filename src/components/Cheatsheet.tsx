"use client";

import { useStore } from "@/lib/store";

const ROWS: [string, string][] = [
  ["Command palette", "⌘K"],
  ["Toggle sidebar", "⌘B"],
  ["Developer mode", "⌘J"],
  ["Close tab", "⌘W"],
  ["Jump to tab", "1–9"],
  ["This cheatsheet", "?"],
  ["Close layer / exit compare", "Esc"],
  ["Terminal", "⌘K → “terminal”"],
  ["One more thing…", "↑↑↓↓←→←→BA"],
];

export default function Cheatsheet() {
  const s = useStore();
  return (
    <div className="overlay" onClick={() => s.setOverlay(null)}>
      <div className="sheet" role="dialog" aria-label="Keyboard shortcuts" onClick={(e) => e.stopPropagation()}>
        <h3>Keyboard shortcuts</h3>
        {ROWS.map(([label, keys]) => (
          <div className="srow" key={label}>
            <span>{label}</span>
            <kbd>{keys}</kbd>
          </div>
        ))}
      </div>
    </div>
  );
}
