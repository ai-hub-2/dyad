import { openDB } from "idb";

const DB_NAME = "dyad-web";
const DB_VERSION = 1;

export type ChatThread = {
  id: string; // uuid
  title: string;
  createdAt: number;
  updatedAt: number;
};

export type ChatMessage = {
  id: string; // uuid
  threadId: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: number;
};

export async function db() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(d) {
      if (!d.objectStoreNames.contains("threads")) {
        const s = d.createObjectStore("threads", { keyPath: "id" });
        s.createIndex("by_updatedAt", "updatedAt");
      }
      if (!d.objectStoreNames.contains("messages")) {
        const s = d.createObjectStore("messages", { keyPath: "id" });
        s.createIndex("by_thread", "threadId");
        s.createIndex("by_createdAt", "createdAt");
      }
    },
  });
}

export async function listThreads(): Promise<ChatThread[]> {
  const d = await db();
  const all = await d.getAll("threads");
  return all.sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function createThread(title: string): Promise<ChatThread> {
  const d = await db();
  const t: ChatThread = {
    id: crypto.randomUUID(),
    title,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  await d.put("threads", t);
  return t;
}

export async function deleteThread(id: string) {
  const d = await db();
  await d.delete("threads", id);
  const messages = await d.getAllFromIndex("messages", "by_thread", id);
  await Promise.all(messages.map((m) => d.delete("messages", m.id)));
}

export async function renameThread(id: string, title: string) {
  const d = await db();
  const t = await d.get("threads", id);
  if (!t) return;
  t.title = title;
  t.updatedAt = Date.now();
  await d.put("threads", t);
}

export async function listMessages(threadId: string): Promise<ChatMessage[]> {
  const d = await db();
  const msgs = await d.getAllFromIndex("messages", "by_thread", threadId);
  return msgs.sort((a, b) => a.createdAt - b.createdAt);
}

export async function addMessage(m: ChatMessage) {
  const d = await db();
  await d.put("messages", m);
  const t = await d.get("threads", m.threadId);
  if (t) {
    t.updatedAt = Date.now();
    await d.put("threads", t);
  }
}