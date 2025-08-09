import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const INSPIRATION_PROMPTS = [
  { icon: "⚡", label: "Build a todo app" },
  { icon: "📈", label: "Analytics dashboard" },
  { icon: "💬", label: "Chat with knowledge base" },
  { icon: "🧮", label: "Tax calculator" },
  { icon: "🗺️", label: "Travel planner" },
  { icon: "📰", label: "News summarizer" },
  { icon: "🖼️", label: "Image gallery" },
  { icon: "🎵", label: "Music library" },
];

export default function HomePage() {
  const nav = useNavigate();
  const [prompts, setPrompts] = useState(() =>
    [...INSPIRATION_PROMPTS].sort(() => 0.5 - Math.random()).slice(0, 5),
  );
  const ideas = useMemo(() => prompts, [prompts]);

  function usePrompt(p: string) {
    nav("/", { state: { seedPrompt: `Build me a ${p}` } });
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">ابدأ من فكرة</h1>
      <div className="flex flex-wrap gap-3">
        {ideas.map((it, idx) => (
          <button
            key={idx}
            onClick={() => usePrompt(it.label)}
            className="flex items-center gap-2 px-3 h-9 rounded-xl border border-border bg-card hover:opacity-90 transition"
          >
            <span>{it.icon}</span>
            <span className="text-sm">{it.label}</span>
          </button>
        ))}
      </div>
      <button
        className="mt-4 text-sm underline opacity-80"
        onClick={() =>
          setPrompts(
            [...INSPIRATION_PROMPTS]
              .sort(() => 0.5 - Math.random())
              .slice(0, 5),
          )
        }
      >
        أفكار أخرى
      </button>
    </div>
  );
}