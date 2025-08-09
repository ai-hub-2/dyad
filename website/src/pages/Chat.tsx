import { useEffect, useRef, useState } from "react";
import { loadProviderSettings, saveProviderSettings, streamChat } from "../api";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [apiBaseUrl, setApiBaseUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const p = loadProviderSettings();
    setApiBaseUrl(p.apiBaseUrl || "");
    setApiKey(p.apiKey || "");
    setModel(p.model || "gpt-4o-mini");
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function onSend() {
    if (!input.trim()) return;
    const user = input.trim();
    setInput("");
    setMessages((m) => m + `\n> ${user}`);
    setLoading(true);

    const provider = { apiBaseUrl: apiBaseUrl.trim(), apiKey: apiKey.trim(), model: model.trim() };
    saveProviderSettings(provider);

    try {
      await streamChat(user, (delta) => setMessages((m) => m + delta), provider);
      setMessages((m) => m + "\n");
    } catch (e: any) {
      setMessages((m) => m + `\n[error] ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-3">Dyad Web Chat (Cloudflare Pages)</h1>

      <div className="grid gap-2 rounded-lg border border-border bg-card p-3 mb-4">
        <label className="text-xs opacity-80">OpenAI-compatible API Base URL</label>
        <input className="rounded border border-border bg-background px-2 h-9" placeholder="https://api.openai.com/v1" value={apiBaseUrl} onChange={(e)=>setApiBaseUrl(e.target.value)} />
        <label className="text-xs opacity-80">API Key</label>
        <input className="rounded border border-border bg-background px-2 h-9" placeholder="sk-..." value={apiKey} onChange={(e)=>setApiKey(e.target.value)} />
        <label className="text-xs opacity-80">Model</label>
        <input className="rounded border border-border bg-background px-2 h-9" placeholder="gpt-4o-mini" value={model} onChange={(e)=>setModel(e.target.value)} />
        <p className="text-xs opacity-70">اترك الحقول فارغة لتجربة وضع مجاني (echo).
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-3 min-h-[40vh] whitespace-pre-wrap text-sm">{messages || "ابدأ بإرسال رسالة…"}<div ref={endRef} /></div>

      <div className="mt-3 flex gap-2">
        <input className="flex-1 rounded border border-border bg-background px-2 h-10" value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter') onSend(); }} placeholder="أدخل رسالتك" />
        <button className="rounded bg-primary text-primary-foreground px-4 h-10" onClick={onSend} disabled={loading}>{loading?"...":"إرسال"}</button>
      </div>
    </div>
  );
}