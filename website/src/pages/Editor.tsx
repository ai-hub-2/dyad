import { useEffect, useMemo, useState } from "react";
import Editor, { loader } from "@monaco-editor/react";

export default function EditorPage() {
  const [value, setValue] = useState<string>(
`// جرب الكتابة هنا\nfunction hello(name){\n  console.log('Hello, ' + name);\n}\nhello('Dyad');\n`
  );
  const [lang, setLang] = useState("typescript");
  const [theme, setTheme] = useState("vs-dark");

  useEffect(() => {
    loader.config({ paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs" } });
  }, []);

  const options = useMemo(() => ({
    fontSize: 14,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: "on" as const,
    automaticLayout: true,
  }), []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <select className="h-9 rounded bg-background border border-border px-2" value={lang} onChange={(e)=>setLang(e.target.value)}>
          <option value="typescript">TypeScript</option>
          <option value="javascript">JavaScript</option>
          <option value="json">JSON</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="markdown">Markdown</option>
          <option value="python">Python</option>
        </select>
        <select className="h-9 rounded bg-background border border-border px-2" value={theme} onChange={(e)=>setTheme(e.target.value)}>
          <option value="vs-dark">Dark</option>
          <option value="vs-light">Light</option>
        </select>
        <button className="h-9 px-3 rounded bg-primary text-primary-foreground" onClick={()=>navigator.clipboard.writeText(value)}>نسخ</button>
      </div>
      <div className="rounded-lg border border-border overflow-hidden" style={{height: "70vh"}}>
        <Editor
          height="100%"
          language={lang}
          theme={theme}
          value={value}
          onChange={(v)=>setValue(v || "")}
          options={options}
        />
      </div>
    </div>
  );
}