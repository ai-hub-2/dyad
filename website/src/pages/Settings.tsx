import { useEffect, useState } from "react";
import { loadProviderSettings, saveProviderSettings } from "../api";

export default function SettingsPage() {
  const [apiBaseUrl, setApiBaseUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const p = loadProviderSettings();
    setApiBaseUrl(p.apiBaseUrl || "");
    setApiKey(p.apiKey || "");
    setModel(p.model || "gpt-4o-mini");
  }, []);

  function save() {
    saveProviderSettings({ apiBaseUrl, apiKey, model });
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">الإعدادات</h1>
      <div className="grid gap-2 rounded-lg border border-border bg-card p-3">
        <label className="text-xs opacity-80">OpenAI-compatible API Base URL</label>
        <input className="rounded border border-border bg-background px-2 h-9" value={apiBaseUrl} onChange={(e)=>setApiBaseUrl(e.target.value)} placeholder="https://api.openai.com/v1" />
        <label className="text-xs opacity-80">API Key</label>
        <input className="rounded border border-border bg-background px-2 h-9" value={apiKey} onChange={(e)=>setApiKey(e.target.value)} placeholder="sk-..." />
        <label className="text-xs opacity-80">Model</label>
        <input className="rounded border border-border bg-background px-2 h-9" value={model} onChange={(e)=>setModel(e.target.value)} placeholder="gpt-4o-mini" />
        <div className="flex items-center gap-2 mt-2">
          <button className="rounded bg-primary text-primary-foreground px-4 h-9" onClick={save}>حفظ</button>
          {saved && <span className="text-xs opacity-80">تم الحفظ</span>}
        </div>
      </div>
    </div>
  );
}