import { useEffect, useMemo, useState } from "react";
import { DownloadButtons } from "./components/DownloadButtons";
import logoUrl from "assets/logo_transparent.png";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handler = () => setIsMobile(window.matchMedia("(max-width: 640px)").matches);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

export default function App() {
  const isMobile = useIsMobile();

  const features = useMemo(
    () => [
      { title: "محلي بالكامل", desc: "سريع، خاص، وبدون قيود اشتراك." },
      { title: "مفاتيحك الخاصة", desc: "استخدم مفاتيح واجهات AI الخاصة بك بسهولة." },
      { title: "متعدد المنصات", desc: "يدعم macOS وWindows، مع تجربة موحدة." },
    ],
    [],
  );

  return (
    <div className="min-h-[100svh] bg-[--docs-bg] text-[--docs-fg] font-sans">
      <header className="sticky top-0 z-10 backdrop-blur border-b border-border/50 bg-background/60">
        <div className="mx-auto max-w-6xl px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoUrl} alt="Dyad" className="w-6 h-6" />
            <span className="text-sm font-semibold">Dyad</span>
          </div>
          <nav className="hidden sm:flex items-center gap-4 text-sm opacity-90">
            <a className="hover:opacity-100" href="#features">المميزات</a>
            <a className="hover:opacity-100" href="#download">التنزيل</a>
            <a className="hover:opacity-100" href="https://github.com/dyad-sh/dyad" target="_blank" rel="noreferrer">GitHub</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-b from-background to-transparent">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-10 items-center">
              <div className="order-2 sm:order-1">
                <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight mb-3">ابنِ تطبيقات الذكاء الاصطناعي محلياً – بسرعة وخصوصية</h1>
                <p className="text-sm sm:text-base opacity-80 leading-relaxed mb-5">
                  Dyad هو مُنشئ تطبيقات AI مفتوح المصدر يعمل على جهازك.
                  خصوصية كاملة، سرعة عالية، ولا حاجة لاشتراكات.
                </p>
                <div id="download" className="mt-4">
                  <DownloadButtons dense={isMobile} />
                </div>
              </div>
              <div className="order-1 sm:order-2">
                <div className="aspect-video rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                  <img src="https://github.com/user-attachments/assets/f6c83dfc-6ffd-4d32-93dd-4b9c46d17790" alt="Dyad screenshot" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-10 sm:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">لماذا Dyad؟</h2>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              {features.map((f, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm opacity-80 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-3">الشفافية والخصوصية</h2>
              <p className="text-sm opacity-80 leading-relaxed">
                الكود مفتوح المصدر برخصة MIT. لا نقوم بجمع بيانات شخصية دون موافقة.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 py-6 text-center text-xs opacity-70">
        © {new Date().getFullYear()} Dyad. الكود على <a className="underline" href="https://github.com/dyad-sh/dyad" target="_blank" rel="noreferrer">GitHub</a>.
      </footer>
    </div>
  );
}