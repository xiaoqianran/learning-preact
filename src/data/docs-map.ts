/** 对照 preactjs.com 文档结构 · 左侧官网 / 右侧本站课 */

export type DocLink = {
  title: string;
  official: string;
  lessonSlug?: string;
  note?: string;
};

export type DocSection = {
  title: string;
  items: DocLink[];
};

const DOC = "https://preactjs.com";

export const DOC_SECTIONS: DocSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction / Getting Started",
        official: `${DOC}/guide/v10/getting-started`,
        lessonSlug: "intro",
      },
      {
        title: "Quick Start",
        official: `${DOC}/guide/v10/getting-started`,
        lessonSlug: "quick-start",
      },
      {
        title: "Differences to React",
        official: `${DOC}/guide/v10/differences-to-react`,
        lessonSlug: "diff-react",
      },
      {
        title: "Switching to Preact (compat)",
        official: `${DOC}/guide/v10/switching-to-preact`,
        lessonSlug: "preact-compat",
      },
    ],
  },
  {
    title: "Essentials",
    items: [
      { title: "Components", official: `${DOC}/guide/v10/components`, lessonSlug: "components" },
      { title: "JSX", official: `${DOC}/guide/v10/differences-to-react`, lessonSlug: "jsx" },
      { title: "Hooks · useState", official: `${DOC}/guide/v10/hooks`, lessonSlug: "hooks-state" },
      { title: "Hooks · useEffect", official: `${DOC}/guide/v10/hooks`, lessonSlug: "lifecycle" },
      { title: "Refs", official: `${DOC}/guide/v10/refs`, lessonSlug: "refs" },
      { title: "Context", official: `${DOC}/guide/v10/context`, lessonSlug: "context" },
      { title: "Forms", official: `${DOC}/guide/v10/forms`, lessonSlug: "forms" },
      { title: "List & conditional", official: `${DOC}/guide/v10/components`, lessonSlug: "list-render" },
      { title: "Events", official: `${DOC}/guide/v10/differences-to-react`, lessonSlug: "events" },
    ],
  },
  {
    title: "Signals & State",
    items: [
      { title: "Signals", official: `${DOC}/guide/v10/signals`, lessonSlug: "signals" },
      { title: "useState vs signal", official: `${DOC}/guide/v10/signals`, lessonSlug: "ref-vs-reactive" },
      { title: "Global store", official: `${DOC}/guide/v10/signals`, lessonSlug: "global-store" },
      { title: "Custom Hooks", official: `${DOC}/guide/v10/hooks`, lessonSlug: "custom-hooks" },
    ],
  },
  {
    title: "App Patterns",
    items: [
      { title: "Routing (community)", official: "https://github.com/preactjs/preact-router", lessonSlug: "router" },
      { title: "Async data", official: `${DOC}/guide/v10/hooks`, lessonSlug: "async-data" },
      { title: "Route guards", official: `${DOC}/guide/v10/components`, lessonSlug: "route-guards" },
      { title: "Form validation", official: `${DOC}/guide/v10/forms`, lessonSlug: "form-validate" },
      { title: "REST / Token", official: `${DOC}/guide/v10/getting-started`, lessonSlug: "rest-api" },
      { title: "Capstone", official: `${DOC}/guide/v10/getting-started`, lessonSlug: "capstone" },
    ],
  },
  {
    title: "Engineering",
    items: [
      { title: "TypeScript", official: `${DOC}/guide/v10/typescript`, lessonSlug: "preact-ts" },
      { title: "Testing", official: `${DOC}/guide/v10/unit-testing-with-enzyme`, lessonSlug: "testing" },
      { title: "API client", official: `${DOC}/guide/v10/getting-started`, lessonSlug: "api-client" },
      { title: "Deploy", official: `${DOC}/guide/v10/getting-started`, lessonSlug: "deploy-prod" },
      { title: "Project setup", official: `${DOC}/guide/v10/getting-started`, lessonSlug: "project" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { title: "Options API hooks", official: `${DOC}/guide/v10/options`, lessonSlug: "options-hooks" },
      { title: "Server-side rendering", official: `${DOC}/guide/v10/server-side-rendering`, lessonSlug: "ssr-basics" },
      { title: "No-build / ESM", official: `${DOC}/guide/v10/getting-started`, lessonSlug: "no-build" },
      { title: "Progressive enhancement", official: `${DOC}/guide/v10/progressive-web-apps`, lessonSlug: "islands", note: "岛屿 / 渐进" },
      { title: "Performance", official: `${DOC}/guide/v10/components`, lessonSlug: "memo-perf" },
      { title: "Interview", official: `${DOC}/guide/v10/differences-to-react`, lessonSlug: "interview-preact" },
      { title: "Playground", official: `${DOC}/guide/v10/getting-started`, note: "本站 /playground" },
    ],
  },
  {
    title: "External",
    items: [
      { title: "Preact homepage", official: DOC },
      { title: "GitHub preactjs/preact", official: "https://github.com/preactjs/preact" },
      { title: "Signals package", official: "https://github.com/preactjs/signals" },
    ],
  },
];

export function flattenDocLinks(): DocLink[] {
  return DOC_SECTIONS.flatMap((s) => s.items);
}

export function getDocsCoverage() {
  let total = 0;
  let linked = 0;
  for (const sec of DOC_SECTIONS) {
    for (const it of sec.items) {
      total += 1;
      if (it.lessonSlug) linked += 1;
    }
  }
  return {
    total,
    linked,
    percent: total === 0 ? 0 : Math.round((linked / total) * 100),
  };
}
