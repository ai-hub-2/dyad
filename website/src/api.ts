export type ProviderSettings = {
  apiBaseUrl: string;
  apiKey?: string;
  model?: string;
};

export function loadProviderSettings(): ProviderSettings {
  try {
    const raw = localStorage.getItem("dyad_web_provider");
    if (raw) return JSON.parse(raw) as ProviderSettings;
  } catch {}
  return { apiBaseUrl: "" };
}

export function saveProviderSettings(p: ProviderSettings) {
  localStorage.setItem("dyad_web_provider", JSON.stringify(p));
}

export async function streamChat(prompt: string, onChunk: (text: string) => void, provider?: ProviderSettings) {
  const body = JSON.stringify({ prompt, provider });
  const res = await fetch("/api/chat/stream", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  });
  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let idx;
    while ((idx = buffer.indexOf("\n")) !== -1) {
      const line = buffer.slice(0, idx).trim();
      buffer = buffer.slice(idx + 1);
      if (!line) continue;
      if (line.startsWith("data:")) {
        const data = line.slice(5).trim();
        if (data === "[DONE]") return;
        try {
          const json = JSON.parse(data);
          const delta = json.delta as string;
          if (delta) onChunk(delta);
        } catch {
          // ignore
        }
      }
    }
  }
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch("/api/health");
    return res.ok;
  } catch {
    return false;
  }
}