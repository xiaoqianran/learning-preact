import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PREACT_PRESETS, getPreset } from "@/data/preact-presets";
import { PreactLiveDemo } from "@/components/PreactLiveDemo";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

type PlaygroundSearch = {
  example?: string;
};

export const Route = createFileRoute("/playground")({
  validateSearch: (search: Record<string, unknown>): PlaygroundSearch => ({
    example:
      typeof search.example === "string" && search.example.length > 0
        ? search.example
        : undefined,
  }),
  component: PlaygroundPage,
});

function PlaygroundPage() {
  const { example } = Route.useSearch();
  const [activeId, setActiveId] = useState(example ?? "counter");
  const preset = useMemo(() => getPreset(activeId), [activeId]);

  return (
    <div className="mx-auto max-w-5xl pb-16">
      <header className="mb-5">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Code2 className="h-3.5 w-3.5" />
          Preact · 在线运行
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          Playground
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          真实编译运行 Preact + Hooks / Signals。改左侧代码，右侧 iframe 即时预览（Babel →{" "}
          <code className="rounded-sm bg-surface-3 px-1.5 py-0.5 font-mono text-xs text-primary">
            h()
          </code>
          ）。
        </p>
      </header>

      <div className="mb-4 flex flex-wrap gap-2">
        {PREACT_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActiveId(p.id)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150",
              activeId === p.id
                ? "bg-primary text-primary-fg"
                : "bg-surface-3 text-muted hover:text-fg",
            )}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="mb-3 text-sm">
        <span className="font-medium text-fg">{preset.title}</span>
        <span className="text-muted"> · {preset.summary}</span>
      </div>

      <PreactLiveDemo key={preset.id} code={preset.code} title={preset.title} height={420} />

      <aside className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { t: "编辑代码", d: "左侧可改 JSX；自动 Babel 转译。" },
          { t: "Hooks / Signals", d: "useState、useEffect、signal、computed 均已注入。" },
          { t: "预览结果", d: "右侧 iframe 加载真实 Preact runtime（esm.sh）。" },
        ].map((item) => (
          <div
            key={item.t}
            className="rounded-lg border border-border bg-surface-2 px-3.5 py-3"
          >
            <p className="text-sm font-medium text-fg">{item.t}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{item.d}</p>
          </div>
        ))}
      </aside>
    </div>
  );
}
