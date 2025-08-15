import { useEffect, useState } from "react";
import { loadProviderSettings, saveProviderSettings } from "../api";
import { clearAll, exportAll, importAll } from "../store";

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

  async function doExport() {
    const data = await exportAll();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dyad-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function doImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const json = JSON.parse(text);
    await importAll(json);
    alert("تم الاستيراد بنجاح");
    e.target.value = "";
  }

  async function doClear() {
    if (!confirm("مسح كل البيانات المحلية؟")) return;
    await clearAll();
    alert("تم المسح");
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">الإعدادات</h1>
      <div className="grid gap-2 rounded-lg border border-border bg-card p-3 mb-6">
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

      <div className="grid gap-2 rounded-lg border border-border bg-card p-3">
        <div className="text-sm font-semibold">النسخ الاحتياطي والاستيراد</div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 rounded border border-border" onClick={doExport}>تصدير المحادثات</button>
          <label className="h-9 px-3 rounded border border-border bg-background cursor-pointer flex items-center">
            استيراد المحادثات
            <input type="file" accept="application/json" className="hidden" onChange={doImport} />
          </label>
          <button className="h-9 px-3 rounded border border-red-500 text-red-400" onClick={doClear}>مسح الكل</button>
        </div>
      </div>
    </div>
  );
}