import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ChatPage from "./pages/Chat";
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
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ChatPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}