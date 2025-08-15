import { useEffect, useMemo, useRef, useState } from "react";
import { loadProviderSettings, saveProviderSettings, streamChat } from "../api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import {
  listThreads,
  createThread,
  listMessages,
  addMessage,
  type ChatThread,
  type ChatMessage,
  renameThread,
  deleteThread,
} from "../store";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [currentThread, setCurrentThread] = useState<ChatThread | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiBaseUrl, setApiBaseUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
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

  useEffect(() => {
    // init threads
    (async () => {
      const ts = await listThreads();
      if (ts.length === 0) {
        const t = await createThread("New chat");
        setThreads([t]);
        setCurrentThread(t);
      } else {
        setThreads(ts);
        setCurrentThread(ts[0]);
      }
    })();
  }, []);

  useEffect(() => {
    if (!currentThread) return;
    (async () => {
      const msgs = await listMessages(currentThread.id);
      setMessages(msgs);
    })();
  }, [currentThread?.id]);

  async function onSend() {
    if (!currentThread) return;
    if (!input.trim() && attachments.length === 0) return;
    const userText = input.trim();
    setInput("");

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      threadId: currentThread.id,
      role: "user",
      content: userText + (attachments.length ? `\n[attachments: ${attachments.map((f) => f.name).join(", ")}]` : ""),
      createdAt: Date.now(),
    };
    await addMessage(userMsg);
    setMessages((m) => [...m, userMsg]);
    setAttachments([]);

    const provider = { apiBaseUrl: apiBaseUrl.trim(), apiKey: apiKey.trim(), model: model.trim() };
    saveProviderSettings(provider);

    const assistantId = crypto.randomUUID();
    const partial: ChatMessage = {
      id: assistantId,
      threadId: currentThread.id,
      role: "assistant",
      content: "",
      createdAt: Date.now(),
    };
    await addMessage(partial);
    setMessages((m) => [...m, partial]);

    setLoading(true);
    try {
      let acc = "";
      await streamChat(
        userText,
        (delta) => {
          acc += delta;
          setMessages((m) => m.map((mm) => (mm.id === assistantId ? { ...mm, content: acc } : mm)));
        },
        provider,
      );
    } catch (e: any) {
      setMessages((m) => m.map((mm) => (mm.id === assistantId ? { ...mm, content: `[error] ${e?.message || e}` } : mm)));
    } finally {
      setLoading(false);
    }
  }

  async function onNewThread() {
    const t = await createThread("New chat");
    setThreads((ts) => [t, ...ts]);
    setCurrentThread(t);
    setMessages([]);
  }

  async function onRenameThread(t: ChatThread) {
    const name = prompt("اسم المحادثة", t.title);
    if (!name) return;
    await renameThread(t.id, name);
    setThreads(await listThreads());
    setCurrentThread((cur) => (cur && cur.id === t.id ? { ...cur, title: name } : cur));
  }

  async function onDeleteThread(t: ChatThread) {
    if (!confirm("حذف المحادثة؟")) return;
    await deleteThread(t.id);
    const ts = await listThreads();
    setThreads(ts);
    setCurrentThread(ts[0] || null);
    setMessages([]);
  }

  const ThreadItem = ({ t }: { t: ChatThread }) => (
    <div className={`flex items-center justify-between gap-2 px-2 py-1 rounded cursor-pointer ${currentThread?.id === t.id ? "bg-primary/20" : "hover:bg-white/5"}`} onClick={() => setCurrentThread(t)}>
      <div className="truncate text-sm">{t.title}</div>
      <div className="flex items-center gap-1 opacity-80">
        <button className="text-xs underline" onClick={(e)=>{e.stopPropagation(); onRenameThread(t);}}>إعادة تسمية</button>
        <button className="text-xs underline" onClick={(e)=>{e.stopPropagation(); onDeleteThread(t);}}>حذف</button>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px,1fr] min-h-[calc(100svh-48px)]">
      <aside className="border-b md:border-b-0 md:border-r border-border p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold">المحادثات</div>
          <button className="h-8 px-2 rounded bg-primary text-primary-foreground" onClick={onNewThread}>جديد</button>
        </div>
        <div className="flex flex-col gap-1 overflow-auto max-h-[50vh] md:max-h-none">
          {threads.map((t) => <ThreadItem key={t.id} t={t} />)}
        </div>
      </aside>
      <section className="flex flex-col">
        <div className="border-b border-border px-3 h-11 flex items-center justify-between">
          <div className="text-sm font-semibold truncate">{currentThread?.title || ""}</div>
          <div className="flex items-center gap-2 text-xs">
            <input className="w-40 rounded border border-border bg-background px-2 h-8" placeholder="Base URL" value={apiBaseUrl} onChange={(e)=>setApiBaseUrl(e.target.value)} />
            <input className="w-40 rounded border border-border bg-background px-2 h-8" placeholder="API Key" value={apiKey} onChange={(e)=>setApiKey(e.target.value)} />
            <input className="w-36 rounded border border-border bg-background px-2 h-8" placeholder="Model" value={model} onChange={(e)=>setModel(e.target.value)} />
          </div>
        </div>
        <div className="flex-1 overflow-auto p-3 space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`max-w-[90%] md:max-w-[70%] rounded-xl px-3 py-2 ${m.role === "user" ? "ml-auto bg-primary/20" : "bg-card border border-border"}`}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeHighlight]}>{m.content}</ReactMarkdown>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="border-t border-border p-3">
          <div className="flex flex-wrap items-center gap-2">
            <input className="flex-1 rounded border border-border bg-background px-2 h-10" value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter' && !e.shiftKey) onSend(); }} placeholder="اكتب رسالتك" />
            <input type="file" multiple className="hidden" id="fileInput" onChange={(e)=> setAttachments(Array.from(e.target.files || [])) } />
            <label htmlFor="fileInput" className="h-10 px-3 rounded border border-border bg-card cursor-pointer flex items-center">مرفقات</label>
            <button className="rounded bg-primary text-primary-foreground px-4 h-10" onClick={onSend} disabled={loading}>{loading?"...":"إرسال"}</button>
          </div>
          {attachments.length > 0 && (
            <div className="mt-2 text-xs opacity-80 flex flex-wrap gap-2">
              {attachments.map((f)=> <span key={f.name} className="px-2 py-1 rounded bg-card border border-border">{f.name}</span>)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}