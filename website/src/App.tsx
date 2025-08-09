import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import logoUrl from "assets/logo_transparent.png";

const HomePage = lazy(() => import("./pages/Home"));
const ChatPage = lazy(() => import("./pages/Chat"));
const SettingsPage = lazy(() => import("./pages/Settings"));
const EditorPage = lazy(() => import("./pages/Editor"));

function ThemeToggle() {
  const [theme, setTheme] = useState<string>(() => localStorage.getItem("dyad_theme") || "dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("dyad_theme", theme);
  }, [theme]);
  return (
    <button
      className="h-8 px-3 rounded border border-border text-xs"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-[100svh] bg-[--docs-bg] text-[--docs-fg] font-sans">
        <header className="sticky top-0 z-10 backdrop-blur border-b border-border/50 bg-background/60">
          <div className="mx-auto max-w-6xl px-4 h-12 flex items-center justify-between gap-2">
            <Link to="/" className="flex items-center gap-2 min-w-0">
              <img src={logoUrl} alt="Dyad" className="w-6 h-6" />
              <span className="text-sm font-semibold truncate">Dyad</span>
            </Link>
            <nav className="hidden sm:flex items-center gap-3 text-sm">
              <Link to="/" className="opacity-90 hover:opacity-100">الرئيسية</Link>
              <Link to="/chat" className="opacity-90 hover:opacity-100">الدردشة</Link>
              <Link to="/editor" className="opacity-90 hover:opacity-100">المحرر</Link>
              <Link to="/settings" className="opacity-90 hover:opacity-100">الإعدادات</Link>
            </nav>
            <ThemeToggle />
          </div>
        </header>
        <main>
          <Suspense fallback={<div className="p-4 text-sm opacity-80">جارٍ التحميل…</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/editor" element={<EditorPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}