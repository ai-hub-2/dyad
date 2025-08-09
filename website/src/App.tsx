import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ChatPage from "./pages/Chat";
import HomePage from "./pages/Home";
import SettingsPage from "./pages/Settings";
import EditorPage from "./pages/Editor";
import logoUrl from "assets/logo_transparent.png";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-[100svh] bg-[--docs-bg] text-[--docs-fg] font-sans">
        <header className="sticky top-0 z-10 backdrop-blur border-b border-border/50 bg-background/60">
          <div className="mx-auto max-w-6xl px-4 h-12 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoUrl} alt="Dyad" className="w-6 h-6" />
              <span className="text-sm font-semibold">Dyad</span>
            </Link>
            <nav className="flex items-center gap-3 text-sm">
              <Link to="/" className="opacity-90 hover:opacity-100">الرئيسية</Link>
              <Link to="/chat" className="opacity-90 hover:opacity-100">الدردشة</Link>
              <Link to="/editor" className="opacity-90 hover:opacity-100">المحرر</Link>
              <Link to="/settings" className="opacity-90 hover:opacity-100">الإعدادات</Link>
            </nav>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}