"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { email, projects } from "@/lib/data";

export default function Terminal() {
  const s = useStore();
  const [lines, setLines] = useState<string[]>([
    "stacksimo os — terminal mode",
    "type `help` for commands.",
  ]);
  const [cmd, setCmd] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const outRef = useRef<HTMLDivElement>(null);

  useEffect(() => inputRef.current?.focus(), []);
  useEffect(() => {
    outRef.current?.scrollTo(0, outRef.current.scrollHeight);
  }, [lines]);

  const run = (raw: string) => {
    const [c, ...args] = raw.trim().split(/\s+/);
    const print = (...out: string[]) => setLines((l) => [...l, `$ ${raw}`, ...out]);
    switch (c) {
      case "help":
        print("help          this list", "ls work       list projects", "open <slug>   open a project", "whoami        about stacksimo", "email         copy my email", "clear         clear screen", "exit          close terminal");
        break;
      case "ls":
        print(...projects.map((p) => `${p.slug.padEnd(14)} ${p.kind}`));
        break;
      case "open": {
        const p = projects.find((x) => x.slug === args[0]);
        if (p) {
          print(`opening ${p.name}…`);
          s.setOverlay(null);
          s.navigate(`/work/${p.slug}`, p.name);
        } else print(`no such project: ${args[0] ?? ""} — try \`ls work\``);
        break;
      }
      case "whoami":
        print("stacksimo — independent web developer.", "websites, landing pages, SaaS. small client list, on purpose.");
        break;
      case "email":
        print(email);
        try {
          navigator.clipboard.writeText(email);
          print("(copied to clipboard)");
        } catch {}
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
        s.setOverlay(null);
        break;
      case "":
        break;
      default:
        print(`command not found: ${c}. try \`help\`.`);
    }
  };

  return (
    <div className="overlay" onClick={() => s.setOverlay(null)}>
      <div className="terminal" role="dialog" aria-label="Terminal" onClick={(e) => e.stopPropagation()}>
        <div className="tout" ref={outRef}>
          {lines.join("\n")}
        </div>
        <div className="tin">
          <span>$</span>
          <input
            ref={inputRef}
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                run(cmd);
                setCmd("");
              }
            }}
            aria-label="Terminal input"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
