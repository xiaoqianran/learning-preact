import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, Loader2, Play, RotateCcw } from "lucide-react";

type Props = {
  code: string;
  title?: string;
  className?: string;
  height?: number;
  editable?: boolean;
};

const PREVIEW_CSS = `
  html,body{margin:0;padding:0;background:#0b0d0c;color:#e8ebe9;font-family:system-ui,sans-serif;}
  #app{padding:12px;min-height:100%;box-sizing:border-box;}
  button{margin:4px 6px 4px 0;padding:6px 12px;border-radius:8px;border:1px solid #3d4a42;background:#1a2220;color:#e8ebe9;cursor:pointer;}
  button:hover{border-color:#673ab8;}
  input,textarea,select{margin:4px 0;padding:6px 8px;border-radius:8px;border:1px solid #3d4a42;background:#121816;color:#e8ebe9;font:inherit;}
  p,li,label{line-height:1.5;}
  .active{color:#a78bfa;font-weight:600;}
  ul{padding-left:1.2rem;}
  .row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;}
  .card{border:1px solid #3d4a42;border-radius:10px;padding:12px;margin:8px 0;background:#121816;}
`;

function wrapUserCode(userCode: string) {
  const trimmed = userCode.trim();
  if (/from\s+['"]preact/.test(trimmed) || /import\s+/.test(trimmed)) {
    return trimmed;
  }
  return `import { h, render, Fragment, createContext } from 'preact';
import { useState, useEffect, useRef, useMemo, useCallback, useContext } from 'preact/hooks';
import { signal, computed, effect, useSignal, useComputed } from '@preact/signals';

${trimmed}

const root = document.getElementById('app');
if (typeof App === 'function') {
  root.innerHTML = '';
  render(h(App, null), root);
} else if (typeof Demo === 'function') {
  root.innerHTML = '';
  render(h(Demo, null), root);
} else {
  root.innerHTML = '<p style="color:#f5a97f">请导出 function App() { ... }</p>';
}
`;
}

function buildSrcDoc(compiled: string) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<style>${PREVIEW_CSS}</style>
<script type="importmap">
{
  "imports": {
    "preact": "https://esm.sh/preact@10.26.4",
    "preact/hooks": "https://esm.sh/preact@10.26.4/hooks",
    "preact/jsx-runtime": "https://esm.sh/preact@10.26.4/jsx-runtime",
    "preact/jsx-dev-runtime": "https://esm.sh/preact@10.26.4/jsx-dev-runtime",
    "@preact/signals": "https://esm.sh/@preact/signals@2.0.4?external=preact",
    "@preact/signals-core": "https://esm.sh/@preact/signals-core@1.8.0"
  }
}
</script>
</head>
<body>
<div id="app"><p style="color:#8b958e">加载 Preact…</p></div>
<script type="module">
window.addEventListener('error', (e) => {
  const el = document.getElementById('app');
  if (el) el.innerHTML = '<pre style="color:#f38ba8;white-space:pre-wrap;padding:8px">' +
    (e.error && e.error.stack ? e.error.stack : e.message) + '</pre>';
});
window.addEventListener('unhandledrejection', (e) => {
  const el = document.getElementById('app');
  if (el) el.innerHTML = '<pre style="color:#f38ba8;white-space:pre-wrap;padding:8px">' +
    String(e.reason) + '</pre>';
});
${compiled}
</script>
</body>
</html>`;
}

async function transpile(code: string): Promise<string> {
  const Babel = await import("@babel/standalone");
  const wrapped = wrapUserCode(code);
  const result = Babel.transform(wrapped, {
    filename: "App.jsx",
    presets: [
      [
        "react",
        {
          runtime: "classic",
          pragma: "h",
          pragmaFrag: "Fragment",
        },
      ],
    ],
  });
  if (!result.code) throw new Error("Babel 未返回代码");
  return result.code;
}

/**
 * 展示的代码 = 正在运行的代码。
 * 使用 Babel + Preact (esm.sh) 在 iframe 中真运行。
 */
export function PreactLiveDemo({
  code,
  title,
  className,
  height = 360,
  editable = true,
}: Props) {
  const [draft, setDraft] = useState(code.trim());
  const [srcDoc, setSrcDoc] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initial = useMemo(() => code.trim(), [code]);

  useEffect(() => {
    setDraft(initial);
  }, [initial]);

  const compile = useCallback(async (source: string) => {
    try {
      setStatus("loading");
      setError(null);
      const compiled = await transpile(source);
      setSrcDoc(buildSrcDoc(compiled));
      setStatus("ready");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : String(e));
    }
  }, []);

  useEffect(() => {
    void compile(draft);
  }, [draft, compile]);

  const onChange = (value: string) => {
    setDraft(value);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      // draft already set; compile effect runs
    }, 0);
  };

  const reset = () => setDraft(initial);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-[#0b0d0c]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border/80 px-3 py-2">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-wider text-primary">
            Preact 真运行 · 源码即 Demo
          </p>
          {title ? (
            <p className="truncate font-mono text-xs text-muted">{title}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 px-2 py-0.5 text-[10px] text-muted hover:text-fg"
            title="重置源码"
          >
            <RotateCcw className="h-3 w-3" />
            重置
          </button>
          <span className="rounded-full bg-primary-soft px-2 py-0.5 font-mono text-[10px] text-primary">
            preact + babel
          </span>
        </div>
      </div>

      <div
        className={cn(
          "grid",
          editable ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1",
        )}
      >
        {editable ? (
          <div className="border-b border-border md:border-b-0 md:border-r">
            <div className="flex items-center gap-1 border-b border-border/60 px-3 py-1.5 text-[10px] text-subtle">
              <Play className="h-3 w-3" />
              可编辑 · 改完自动重跑
            </div>
            <textarea
              value={draft}
              onChange={(e) => onChange(e.target.value)}
              spellCheck={false}
              className="block w-full resize-y bg-[#0b0d0c] p-3 font-mono text-[12px] leading-relaxed text-[#cdd6f4] outline-none"
              style={{ minHeight: height, height }}
              aria-label="Preact 源码"
            />
          </div>
        ) : null}

        <div className="relative" style={{ minHeight: height }}>
          {status === "loading" ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-[#0b0d0c]/80 text-sm text-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
              编译 Preact…
            </div>
          ) : null}
          {status === "error" ? (
            <div className="flex items-start gap-2 p-4 text-sm text-warn">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <pre className="whitespace-pre-wrap font-mono text-xs">
                {error ?? "编译失败"}
              </pre>
            </div>
          ) : (
            <iframe
              title={title ?? "Preact preview"}
              srcDoc={srcDoc}
              sandbox="allow-scripts"
              className="h-full w-full border-0 bg-[#0b0d0c]"
              style={{ minHeight: height, height }}
            />
          )}
        </div>
      </div>

      <p className="border-t border-border/60 px-3 py-1.5 text-[10px] text-subtle">
        左侧改代码，右侧即时预览 — Babel 转 JSX → Preact h() 真渲染
      </p>
    </div>
  );
}
