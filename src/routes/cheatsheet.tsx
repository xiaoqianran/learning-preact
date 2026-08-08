import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked } from "lucide-react";

export const Route = createFileRoute("/cheatsheet")({
  component: CheatsheetPage,
});

const SECTIONS: { title: string; items: { k: string; v: string }[] }[] = [
  {
    title: "核心 · Hooks",
    items: [
      { k: "useState", v: "本地状态；函数式更新 set(n => n+1)" },
      { k: "useEffect", v: "副作用；deps + cleanup" },
      { k: "useMemo / useCallback", v: "缓存值 / 稳定函数" },
      { k: "useRef", v: "可变盒或 DOM；改 .current 不重渲" },
      { k: "useContext", v: "读 Provider 值" },
      { k: "自定义 useXxx", v: "复用状态逻辑；遵守 Hooks 规则" },
    ],
  },
  {
    title: "Signals",
    items: [
      { k: "signal(x)", v: "响应式容器；读写 .value" },
      { k: "computed", v: "派生只读 signal" },
      { k: "effect", v: "自动追踪依赖的副作用" },
      { k: "useSignal", v: "组件级 signal" },
      { k: "JSX 中 {sig}", v: "细粒度订阅文本节点" },
    ],
  },
  {
    title: "JSX 与 DOM",
    items: [
      { k: "{expr}", v: "插入表达式" },
      { k: "class / className", v: "Preact 两者可用" },
      { k: "style={{ }}", v: "对象样式 camelCase" },
      { k: "onClick / onInput", v: "事件；输入多用 onInput" },
      { k: "key", v: "列表稳定 id" },
      { k: "children", v: "默认插槽" },
      { k: "...rest", v: "透传 props 到 DOM" },
      { k: "dangerouslySetInnerHTML", v: "XSS 风险，慎用" },
    ],
  },
  {
    title: "组件模式",
    items: [
      { k: "函数组件", v: "大写开头；props 进参" },
      { k: "受控输入", v: "value + onInput/onChange" },
      { k: "Context", v: "跨层主题 / 鉴权" },
      { k: "Portal", v: "浮层挂 body" },
      { k: "lazy + 边界", v: "code splitting" },
      { k: "Error boundary", v: "捕获子树渲染错误" },
    ],
  },
  {
    title: "路由 · 状态 · 请求",
    items: [
      { k: "preact-router / wouter", v: "社区路由" },
      { k: "module signal store", v: "轻量全局状态" },
      { k: "loading/error/data", v: "请求三态" },
      { k: "AbortController", v: "取消竞态" },
      { k: "Bearer token", v: "Authorization；401 清会话" },
    ],
  },
  {
    title: "工程 · 兼容",
    items: [
      { k: "Vite template preact-ts", v: "推荐脚手架" },
      { k: "preact/compat", v: "跑多数 React 生态" },
      { k: "TypeScript", v: "ComponentChildren / 类型 props" },
      { k: "Vitest + testing-library", v: "测行为" },
      { k: "SSR hydrate", v: "renderToString + 客户端接管" },
      { k: "a11y / 安全", v: "语义、键盘、勿信用户 HTML" },
    ],
  },
];

function CheatsheetPage() {
  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <BookMarked className="h-3.5 w-3.5" />
          速查 · 官网对齐
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg sm:text-3xl">
          Preact 速查表
        </h1>
        <p className="mt-2 text-sm text-muted">
          Hooks · Signals · 模式 · 工程化。详细交互见课程；权威文档见{" "}
          <a
            href="https://preactjs.com/"
            target="_blank"
            rel="noreferrer"
            className="text-primary no-underline hover:underline"
          >
            preactjs.com
          </a>
          。实战见{" "}
          <Link to="/studio" className="text-primary no-underline hover:underline">
            全栈工坊
          </Link>
          。
        </p>
      </header>

      <div className="grid gap-4">
        {SECTIONS.map((sec) => (
          <section
            key={sec.title}
            className="overflow-hidden rounded-xl border border-border bg-surface"
          >
            <h2 className="border-b border-border bg-surface-2 px-4 py-2.5 font-display text-sm font-semibold text-fg">
              {sec.title}
            </h2>
            <ul className="divide-y divide-border">
              {sec.items.map((it) => (
                <li key={it.k} className="grid gap-1 px-4 py-2.5 sm:grid-cols-[12rem_1fr] sm:gap-3">
                  <code className="font-mono text-xs text-primary">{it.k}</code>
                  <span className="text-sm text-muted">{it.v}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-subtle">
        建议路径：①基础 → ②进阶 → ③全栈准备 → ④实训工坊 → ⑤工程化 → ⑥模式与面试 → ⑦官网补全
      </p>
    </div>
  );
}
