type Env = {
};

function sseChunk(obj: any) {
  return `data: ${JSON.stringify(obj)}\n\n`;
}

async function streamEcho(prompt: string, controller: ReadableStreamDefaultController) {
  const text = `\n[free mode] echo: ${prompt}\n`;
  for (const ch of text) {
    controller.enqueue(new TextEncoder().encode(sseChunk({ delta: ch })));
    await new Promise((r) => setTimeout(r, 10));
  }
  controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
}

async function streamLLM(prompt: string, provider: any, controller: ReadableStreamDefaultController) {
  const base = provider?.apiBaseUrl?.trim();
  const key = provider?.apiKey?.trim();
  const model = provider?.model?.trim() || "gpt-4o-mini";
  if (!base || !key) return streamEcho(prompt, controller);

  const url = `${base.replace(/\/$/, "")}/chat/completions`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      stream: true,
    }),
  });
  if (!res.ok || !res.body) return streamEcho(prompt, controller);

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
      if (!line || !line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (data === "[DONE]") {
        controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
        return;
      }
      try {
        const json = JSON.parse(data);
        const delta = json.choices?.[0]?.delta?.content || "";
        if (delta) {
          controller.enqueue(new TextEncoder().encode(sseChunk({ delta })));
        }
      } catch {}
    }
  }
  controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  try {
    const { prompt, provider } = await ctx.request.json<any>();
    const stream = new ReadableStream({
      start(controller) {
        streamLLM(String(prompt || ""), provider, controller).catch(() => {
          // fallback
          streamEcho(String(prompt || ""), controller);
        });
      },
    });
    return new Response(stream, {
      headers: {
        "content-type": "text/event-stream; charset=utf-8",
        "cache-control": "no-cache, no-transform",
        connection: "keep-alive",
      },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "bad request" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
};