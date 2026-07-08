"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export interface Tab {
  id: string;
  path: string;
  label: string;
}

export type Overlay = "palette" | "cheatsheet" | "terminal" | null;

interface Store {
  theme: "light" | "dark";
  toggleTheme: () => void;
  devMode: boolean;
  toggleDevMode: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  tabs: Tab[];
  activeTab: string | null;
  openTab: (path: string, label: string, background?: boolean) => void;
  closeTab: (id: string) => void;
  activateTab: (id: string) => void;
  navigate: (path: string, label?: string) => void;
  overlay: Overlay;
  setOverlay: (o: Overlay) => void;
  favorites: string[];
  toggleFavorite: (slug: string) => void;
  recents: string[];
  pushRecent: (path: string, label: string) => void;
  recentItems: { path: string; label: string }[];
  toasts: { id: number; text: string }[];
  toast: (text: string) => void;
  achieve: (key: string, text: string) => void;
  compare: string | null;
  setCompare: (slug: string | null) => void;
}

const Ctx = createContext<Store | null>(null);

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside provider");
  return s;
}

const labelFor = (path: string): string => {
  if (path === "/") return "Studio";
  const seg = path.split("/").filter(Boolean);
  const cap = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
  return seg.map(cap).join(" / ").replace(/-/g, " ");
};

let tabSeq = 1;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [devMode, setDevMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentItems, setRecentItems] = useState<{ path: string; label: string }[]>([]);
  const [toasts, setToasts] = useState<{ id: number; text: string }[]>([]);
  const [compare, setCompare] = useState<string | null>(null);
  const [tabs, setTabs] = useState<Tab[]>([{ id: "t0", path: pathname || "/", label: labelFor(pathname || "/") }]);
  const [activeTab, setActiveTab] = useState<string | null>("t0");
  const achieved = useRef<Set<string>>(new Set());

  useEffect(() => {
    try {
      const t = localStorage.getItem("sx-theme");
      if (t === "dark" || (t === null && window.matchMedia("(prefers-color-scheme: dark)").matches)) setTheme("dark");
      const f = localStorage.getItem("sx-favs");
      if (f) setFavorites(JSON.parse(f));
      const r = localStorage.getItem("sx-recents");
      if (r) setRecentItems(JSON.parse(r));
      const a = localStorage.getItem("sx-achievements");
      if (a) achieved.current = new Set(JSON.parse(a));
      if (localStorage.getItem("sx-dev") === "1") setDevMode(true);
    } catch {
      /* first visit */
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("sx-theme", theme);
    } catch {}
  }, [theme]);

  const toast = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setToasts((ts) => [...ts, { id, text }]);
    setTimeout(() => setToasts((ts) => ts.filter((t) => t.id !== id)), 3500);
  }, []);

  const achieve = useCallback(
    (key: string, text: string) => {
      if (achieved.current.has(key)) return;
      achieved.current.add(key);
      try {
        localStorage.setItem("sx-achievements", JSON.stringify(Array.from(achieved.current)));
      } catch {}
      toast(`achievement — ${text}`);
    },
    [toast]
  );

  const pushRecent = useCallback((path: string, label: string) => {
    setRecentItems((r) => {
      const next = [{ path, label }, ...r.filter((x) => x.path !== path)].slice(0, 6);
      try {
        localStorage.setItem("sx-recents", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((f) => {
      const next = f.includes(slug) ? f.filter((x) => x !== slug) : [...f, slug];
      try {
        localStorage.setItem("sx-favs", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const navigate = useCallback(
    (path: string, label?: string) => {
      setTabs((ts) =>
        ts.map((t) => (t.id === activeTab ? { ...t, path, label: label ?? labelFor(path) } : t))
      );
      router.push(path);
      pushRecent(path, label ?? labelFor(path));
    },
    [router, activeTab, pushRecent]
  );

  const openTab = useCallback(
    (path: string, label: string, background = false) => {
      const id = `t${tabSeq++}`;
      setTabs((ts) => (ts.length >= 8 ? ts : [...ts, { id, path, label }]));
      if (!background) {
        setActiveTab(id);
        router.push(path);
      }
      pushRecent(path, label);
    },
    [router, pushRecent]
  );

  const closeTab = useCallback(
    (id: string) => {
      setTabs((ts) => {
        const idx = ts.findIndex((t) => t.id === id);
        const next = ts.filter((t) => t.id !== id);
        if (next.length === 0) {
          const fresh = { id: `t${tabSeq++}`, path: "/", label: "Studio" };
          setActiveTab(fresh.id);
          router.push("/");
          return [fresh];
        }
        if (id === activeTab) {
          const fallback = next[Math.max(0, idx - 1)];
          setActiveTab(fallback.id);
          router.push(fallback.path);
        }
        return next;
      });
    },
    [activeTab, router]
  );

  const activateTab = useCallback(
    (id: string) => {
      setActiveTab(id);
      const t = tabs.find((x) => x.id === id);
      if (t) router.push(t.path);
    },
    [tabs, router]
  );

  const toggleTheme = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);
  const toggleSidebar = useCallback(() => setSidebarCollapsed((c) => !c), []);
  const toggleDevMode = useCallback(() => {
    setDevMode((d) => {
      const next = !d;
      try {
        localStorage.setItem("sx-dev", next ? "1" : "0");
      } catch {}
      return next;
    });
  }, []);

  const recents = useMemo(() => recentItems.map((r) => r.path), [recentItems]);

  const value: Store = {
    theme,
    toggleTheme,
    devMode,
    toggleDevMode,
    sidebarCollapsed,
    toggleSidebar,
    tabs,
    activeTab,
    openTab,
    closeTab,
    activateTab,
    navigate,
    overlay,
    setOverlay,
    favorites,
    toggleFavorite,
    recents,
    pushRecent,
    recentItems,
    toasts,
    toast,
    achieve,
    compare,
    setCompare,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
