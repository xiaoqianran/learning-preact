export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explain: string;
};

export type DemoKind =
  | "counter"
  | "template"
  | "jsx"
  | "ref-vs-reactive"
  | "hooks-state"
  | "signals"
  | "computed"
  | "list"
  | "events"
  | "form"
  | "component"
  | "lifecycle"
  | "todo"
  | "router"
  | "pinia"
  | "challenge"
  | "slots"
  | "provide"
  | "async"
  | "guard"
  | "validate"
  | "teleport"
  | "keepalive"
  | "directive"
  | "class-style"
  | "watchers"
  | "template-ref"
  | "component-vmodel"
  | "fallthrough"
  | "async-comp"
  | "transition"
  | "suspense"
  | "plugins"
  | "conditional"
  | "transition-group"
  | "sfc-css"
  | "options-api"
  | "web-components"
  | "animation"
  | "registration"
  | "script-setup"
  | "directives-ref"
  | "refs"
  | "context"
  | "compat";

export type LessonBlock =
  | { type: "text"; title?: string; body: string }
  | { type: "code"; title?: string; lang?: string; code: string }
  | { type: "tip"; body: string }
  | { type: "demo"; kind: DemoKind; title: string; hint?: string }
  | { type: "quiz"; questions: QuizQuestion[] };

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  level: "入门" | "进阶" | "实战";
  track: "基础" | "进阶" | "全栈准备" | "全栈实训" | "工程化" | "进阶模式" | "官网对齐";
  format?: "course" | "reference";
  minutes: number;
  official?: string;
  blocks: LessonBlock[];
};

export const LESSONS: Lesson[] = [
  {
    slug: "intro",
    title: "Preact 是什么",
    summary: "3kB 的快速 UI 运行时，React 兼容 API。",
    level: "入门",
    track: "基础",
    minutes: 6,
    official: "https://preactjs.com/guide/v10/getting-started",
    blocks: [
      {
        type: "text",
        title: "为什么选 Preact",
        body: "Preact 是一个体积约 3kB 的 UI 库，提供与 React 几乎相同的 API（组件、Hooks、JSX）。适合对包体积敏感的场景：嵌入式小组件、营销页、边缘渲染、渐进增强。\n\n学习方法：先看「对应源码」，再在 Demo 里改代码验证 — 源码里的 count 就是右侧跳动的数字。"
      },
      {
        type: "code",
        title: "对应源码 · 计数器",
        lang: "jsx",
        code: "function App() {\n  const [count, setCount] = useState(0)\n  return (\n    <div>\n      <p>点了 {count} 次</p>\n      <button onClick={() => setCount(count + 1)}>count++</button>\n      <button onClick={() => setCount(0)}>重置</button>\n    </div>\n  )\n}"
      },
      {
        type: "demo",
        kind: "counter",
        title: "动手：计数器"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "i1",
            question: "Preact 核心定位？",
            options: [
              "重型全家桶",
              "轻量 UI 运行时",
              "仅服务端",
              "数据库"
            ],
            answer: 1,
            explain: "轻量、React 兼容。"
          },
          {
            id: "i2",
            question: "Preact 典型体积量级？",
            options: [
              "~3kB",
              "~50kB",
              "~200kB",
              "1MB+"
            ],
            answer: 0,
            explain: "gzip 后约 3–4kB。"
          }
        ]
      }
    ]
  },
  {
    slug: "jsx",
    title: "JSX 语法",
    summary: "表达式、属性、class 与 children。",
    level: "入门",
    track: "基础",
    minutes: 8,
    official: "https://preactjs.com/guide/v10/differences-to-react",
    blocks: [
      {
        type: "text",
        title: "JSX 不是字符串",
        body: "JSX 编译成 h()/createElement 调用。用 {} 插入表达式；属性用 camelCase（onClick）；原生 DOM 的 class 在 Preact 中可用 class 或 className。\n\n注意：返回多个根节点可用 Fragment <>...</>。"
      },
      {
        type: "code",
        title: "对应源码 · JSX",
        lang: "jsx",
        code: "function App() {\n  const msg = '你好，Preact'\n  const isActive = true\n  return (\n    <div>\n      <p>{msg}</p>\n      <p class={isActive ? 'active' : ''}>class 绑定</p>\n      <p>2 + 2 = {2 + 2}</p>\n    </div>\n  )\n}"
      },
      {
        type: "demo",
        kind: "jsx",
        title: "动手：JSX"
      },
      {
        type: "tip",
        body: "本站 Demo 使用 classic JSX 运行时：pragma = h（Preact）。"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "j1",
            question: "JSX 中插入表达式？",
            options: [
              "{{}}",
              "{}",
              "<%= %>",
              "$()"
            ],
            answer: 1,
            explain: "花括号。"
          },
          {
            id: "j2",
            question: "Preact 原生 class 属性？",
            options: [
              "只能 className",
              "class 或 className",
              "只用 css",
              "classList 属性"
            ],
            answer: 1,
            explain: "Preact 两者都支持。"
          }
        ]
      }
    ]
  },
  {
    slug: "hooks-state",
    title: "useState",
    summary: "组件本地状态与更新。",
    level: "入门",
    track: "基础",
    minutes: 10,
    official: "https://preactjs.com/guide/v10/hooks",
    blocks: [
      {
        type: "text",
        title: "状态驱动视图",
        body: "useState(initial) 返回 [value, setValue]。setValue 触发重渲染。对象/数组更新要不可变：用展开拷贝，不要直接 mutate。\n\n函数式更新 setN(n => n+1) 在连续更新时更安全。"
      },
      {
        type: "code",
        title: "对应源码",
        lang: "jsx",
        code: "function App() {\n  const [name, setName] = useState('Preact')\n  const [n, setN] = useState(1)\n  return (\n    <div>\n      <input value={name} onInput={(e) => setName(e.currentTarget.value)} />\n      <p>{name} × {n}</p>\n      <button onClick={() => setN(n + 1)}>n++</button>\n    </div>\n  )\n}"
      },
      {
        type: "demo",
        kind: "hooks-state",
        title: "动手：多状态"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "s1",
            question: "更新 state 应？",
            options: [
              "直接 mutate",
              "调用 setter",
              "改 this.state",
              "改 DOM"
            ],
            answer: 1,
            explain: "setState/setter。"
          },
          {
            id: "s2",
            question: "数组追加推荐？",
            options: [
              "push 原数组",
              "展开新数组",
              "splice 原数组",
              "delete"
            ],
            answer: 1,
            explain: "[...arr, x]。"
          }
        ]
      }
    ]
  },
  {
    slug: "signals",
    title: "Signals 响应式",
    summary: "@preact/signals：细粒度更新。",
    level: "入门",
    track: "基础",
    minutes: 12,
    official: "https://preactjs.com/guide/v10/signals",
    blocks: [
      {
        type: "text",
        title: "比 useState 更细",
        body: "signal(0) 创建响应式容器；读 .value，写 .value。在 JSX 中直接写 {count}（signal 对象）可自动订阅，且只更新用到它的文本节点。\n\ncomputed(() => ...) 派生；effect(() => ...) 副作用。也可 useSignal / useComputed 挂到组件。"
      },
      {
        type: "code",
        title: "对应源码",
        lang: "jsx",
        code: "const count = signal(0)\nconst doubled = computed(() => count.value * 2)\n\nfunction App() {\n  return (\n    <div>\n      <p>count = {count}</p>\n      <p>doubled = {doubled}</p>\n      <button onClick={() => count.value++}>count++</button>\n    </div>\n  )\n}"
      },
      {
        type: "demo",
        kind: "signals",
        title: "动手：Signals"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sg1",
            question: "修改 signal？",
            options: [
              "count++",
              "count.value++",
              "setCount",
              "count.set"
            ],
            answer: 1,
            explain: ".value"
          },
          {
            id: "sg2",
            question: "Signals 优势？",
            options: [
              "包更大",
              "细粒度更新",
              "不能跨组件",
              "仅 class 组件"
            ],
            answer: 1,
            explain: "细粒度 DOM 更新。"
          }
        ]
      }
    ]
  },
  {
    slug: "ref-vs-reactive",
    title: "useState vs signal",
    summary: "两种状态模型对照。",
    level: "入门",
    track: "基础",
    minutes: 8,
    official: "https://preactjs.com/guide/v10/signals",
    blocks: [
      {
        type: "text",
        title: "怎么选",
        body: "组件内临时 UI 状态 → useState 足够。跨组件共享、高频更新、想少重渲 → signals。两者可混用。"
      },
      {
        type: "code",
        title: "对照",
        lang: "jsx",
        code: "const sig = signal(0)\nfunction App() {\n  const [count, setCount] = useState(0)\n  return (\n    <div>\n      <button onClick={() => setCount(count + 1)}>useState {count}</button>\n      <button onClick={() => sig.value++}>signal {sig}</button>\n    </div>\n  )\n}"
      },
      {
        type: "demo",
        kind: "ref-vs-reactive",
        title: "动手：对照"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "rr1",
            question: "跨模块共享状态更适合？",
            options: [
              "仅 useState",
              "signal / store",
              "仅 ref",
              "innerHTML"
            ],
            answer: 1,
            explain: "signals 或外部 store。"
          }
        ]
      }
    ]
  },
  {
    slug: "list-render",
    title: "列表与条件渲染",
    summary: "map、key、&& 与三元。",
    level: "入门",
    track: "基础",
    minutes: 10,
    official: "https://preactjs.com/guide/v10/components",
    blocks: [
      {
        type: "text",
        title: "key 的意义",
        body: "列表用 map 返回节点数组；稳定唯一 key 帮助 diff。条件用 && 或三元；不要用索引当 key（若列表会重排/插入）。"
      },
      {
        type: "code",
        title: "对应源码",
        lang: "jsx",
        code: "function App() {\n  const [items, setItems] = useState([{ id: 1, text: '学 map' }])\n  return (\n    <ul>\n      {items.map((item) => (\n        <li key={item.id}>{item.text}</li>\n      ))}\n    </ul>\n  )\n}"
      },
      {
        type: "demo",
        kind: "list",
        title: "动手：列表"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "l1",
            question: "列表 key 推荐？",
            options: [
              "数组下标永远最好",
              "稳定唯一 id",
              "随机数",
              "不要 key"
            ],
            answer: 1,
            explain: "稳定 id。"
          },
          {
            id: "l2",
            question: "条件显示节点？",
            options: [
              "v-if",
              "&& 或三元",
              "ng-if",
              "*ngIf"
            ],
            answer: 1,
            explain: "JS 表达式。"
          }
        ]
      }
    ]
  },
  {
    slug: "events",
    title: "事件处理",
    summary: "onClick、onInput 与事件对象。",
    level: "入门",
    track: "基础",
    minutes: 8,
    official: "https://preactjs.com/guide/v10/differences-to-react",
    blocks: [
      {
        type: "text",
        title: "委托与命名",
        body: "Preact 事件多为委托。命名接近 React：onClick、onInput、onSubmit。取输入值用 e.currentTarget.value。阻止默认 e.preventDefault()。"
      },
      {
        type: "demo",
        kind: "events",
        title: "动手：事件"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "e1",
            question: "输入框实时取值常用？",
            options: [
              "onClick",
              "onInput",
              "onLoad",
              "onMount"
            ],
            answer: 1,
            explain: "onInput。"
          }
        ]
      }
    ]
  },
  {
    slug: "forms",
    title: "表单与受控组件",
    summary: "value + onInput 单向数据流。",
    level: "入门",
    track: "基础",
    minutes: 10,
    official: "https://preactjs.com/guide/v10/forms",
    blocks: [
      {
        type: "text",
        title: "受控模式",
        body: "输入的 value 来自 state，onInput 写回 state — 单一数据源。checkbox 用 checked + onChange。"
      },
      {
        type: "demo",
        kind: "form",
        title: "动手：表单"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "f1",
            question: "受控 input 需要？",
            options: [
              "只有 defaultValue",
              "value + 更新函数",
              "只用 ref",
              "v-model"
            ],
            answer: 1,
            explain: "受控绑定。"
          }
        ]
      }
    ]
  },
  {
    slug: "components",
    title: "组件基础",
    summary: "函数组件、组合与复用。",
    level: "入门",
    track: "基础",
    minutes: 8,
    official: "https://preactjs.com/guide/v10/components",
    blocks: [
      {
        type: "text",
        title: "一切皆函数",
        body: "function Button(props) { return ... }。大写开头是组件；小写是原生标签。用组合（嵌套）而非继承。"
      },
      {
        type: "demo",
        kind: "component",
        title: "动手：组件 props"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "c1",
            question: "组件名约定？",
            options: [
              "小写",
              "大写开头",
              "必须 class",
              "必须 .vue"
            ],
            answer: 1,
            explain: "PascalCase。"
          }
        ]
      }
    ]
  },
  {
    slug: "props-children",
    title: "Props 与 children",
    summary: "参数、插槽与默认值。",
    level: "入门",
    track: "基础",
    minutes: 8,
    official: "https://preactjs.com/guide/v10/components",
    blocks: [
      {
        type: "text",
        title: "children 即默认插槽",
        body: "父级标签中间的内容作为 props.children 传入。可传函数 children 做 render props。默认值用解构默认或默认参数。"
      },
      {
        type: "demo",
        kind: "slots",
        title: "动手：children"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "p1",
            question: "插槽在 Preact 中？",
            options: [
              "v-slot",
              "children",
              "ng-content",
              "yield"
            ],
            answer: 1,
            explain: "children。"
          }
        ]
      }
    ]
  },
  {
    slug: "lifecycle",
    title: "useEffect 生命周期",
    summary: "挂载、更新、清理。",
    level: "入门",
    track: "基础",
    minutes: 12,
    official: "https://preactjs.com/guide/v10/hooks",
    blocks: [
      {
        type: "text",
        title: "依赖数组",
        body: "useEffect(fn, deps)：挂载后跑；deps 变再跑；return 清理函数。[] 只挂载一次；省略 deps 每次渲染都跑（慎用）。"
      },
      {
        type: "demo",
        kind: "lifecycle",
        title: "动手：effect"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "lc1",
            question: "仅挂载执行一次？",
            options: [
              "deps 省略",
              "deps = []",
              "deps = null",
              "不用 effect"
            ],
            answer: 1,
            explain: "空数组。"
          }
        ]
      }
    ]
  },
  {
    slug: "refs",
    title: "useRef 与 DOM",
    summary: "可变盒与元素引用。",
    level: "入门",
    track: "基础",
    minutes: 8,
    official: "https://preactjs.com/guide/v10/refs",
    blocks: [
      {
        type: "text",
        title: "两种用途",
        body: "1) 持有不触发渲染的可变值；2) 绑定 DOM：ref={el => ...} 或 useRef + ref={r}。"
      },
      {
        type: "demo",
        kind: "template-ref",
        title: "动手：聚焦输入框"
      },
      {
        type: "demo",
        kind: "refs",
        title: "动手：渲染计数"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "rf1",
            question: "改 ref.current 会重渲吗？",
            options: [
              "会",
              "不会",
              "仅严格模式",
              "仅 SSR"
            ],
            answer: 1,
            explain: "不会自动重渲。"
          }
        ]
      }
    ]
  },
  {
    slug: "context",
    title: "Context",
    summary: "跨层传递依赖。",
    level: "入门",
    track: "基础",
    minutes: 10,
    official: "https://preactjs.com/guide/v10/context",
    blocks: [
      {
        type: "text",
        title: "Provider / useContext",
        body: "createContext → Provider value → 深层 useContext 读取。适合主题、鉴权用户、i18n；避免把高频变化的大数据塞进 Context（会大范围重渲），可考虑拆分或 signals。"
      },
      {
        type: "demo",
        kind: "provide",
        title: "动手：Theme Context"
      },
      {
        type: "demo",
        kind: "context",
        title: "动手：User Context"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "cx1",
            question: "深层读 Context？",
            options: [
              "props 层层传",
              "useContext",
              "window.",
              "cookie"
            ],
            answer: 1,
            explain: "useContext。"
          }
        ]
      }
    ]
  },
  {
    slug: "custom-hooks",
    title: "自定义 Hooks",
    summary: "复用状态逻辑。",
    level: "入门",
    track: "基础",
    minutes: 10,
    official: "https://preactjs.com/guide/v10/hooks",
    blocks: [
      {
        type: "text",
        title: "use 前缀约定",
        body: "把 stateful 逻辑抽成 function useXxx()，内部可调其他 hooks。不要在条件分支里调用 hooks（保持调用顺序稳定）。"
      },
      {
        type: "demo",
        kind: "directive",
        title: "动手：useToggle"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ch1",
            question: "Hooks 规则？",
            options: [
              "可在 if 里随意调用",
              "顶层无条件调用",
              "只在 class 用",
              "必须 async"
            ],
            answer: 1,
            explain: "Rules of Hooks。"
          }
        ]
      }
    ]
  },
  {
    slug: "todo-app",
    title: "综合：Todo",
    summary: "状态 + 列表 + 表单串联。",
    level: "入门",
    track: "基础",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "串起来",
        body: "增删改查的最小闭环。巩固受控输入、不可变更新、key 列表。"
      },
      {
        type: "demo",
        kind: "todo",
        title: "动手：Todo"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "td1",
            question: "完成 Todo 切换 done 应？",
            options: [
              "mutate 原对象",
              "map 返回新对象",
              "直接改 DOM",
              "reload"
            ],
            answer: 1,
            explain: "不可变更新。"
          }
        ]
      }
    ]
  },
  {
    slug: "router",
    title: "客户端路由",
    summary: "路径状态与页面切换。",
    level: "进阶",
    track: "进阶",
    minutes: 12,
    official: "https://github.com/preactjs/preact-router",
    blocks: [
      {
        type: "text",
        title: "路由思路",
        body: "生产可用 preact-router / wouter / tanstack-router。核心：path → 组件映射；可选 history API。本课用 state 模拟。"
      },
      {
        type: "demo",
        kind: "router",
        title: "动手：简易路由"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "rt1",
            question: "SPA 路由本质？",
            options: [
              "整页刷新",
              "path 映射组件",
              "仅 SSR",
              "仅 hash 可用"
            ],
            answer: 1,
            explain: "映射 UI。"
          }
        ]
      }
    ]
  },
  {
    slug: "global-store",
    title: "全局状态",
    summary: "signal store 与订阅。",
    level: "进阶",
    track: "进阶",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "轻量 store",
        body: "模块级 signal 就是最简单的全局 store。复杂场景可加 actions、persist（localStorage）、或接入 Zustand（经 preact/compat）。"
      },
      {
        type: "demo",
        kind: "pinia",
        title: "动手：signal store"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "gs1",
            question: "最简全局状态？",
            options: [
              "必须 Redux",
              "模块级 signal",
              "只能 Context",
              "sessionStorage 明文密码"
            ],
            answer: 1,
            explain: "module signal。"
          }
        ]
      }
    ]
  },
  {
    slug: "pitfalls",
    title: "常见坑",
    summary: "闭包陈旧、依赖漏写、mutate。",
    level: "进阶",
    track: "进阶",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "避坑清单",
        body: "1) effect 漏依赖导致陈旧闭包；2) 直接改 state 对象；3) 把 hooks 放进条件；4) key 用 index 且重排；5) 在渲染期间 setState 死循环。"
      },
      {
        type: "demo",
        kind: "challenge",
        title: "练手：购物车不可变更新"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pf1",
            question: "渲染期间反复 setState？",
            options: [
              "正常",
              "可能死循环",
              "更快",
              "自动批处理必停"
            ],
            answer: 1,
            explain: "会循环更新。"
          }
        ]
      }
    ]
  },
  {
    slug: "project",
    title: "从零搭 Preact 项目",
    summary: "Vite + Preact 脚手架。",
    level: "进阶",
    track: "进阶",
    minutes: 10,
    official: "https://preactjs.com/guide/v10/getting-started",
    blocks: [
      {
        type: "text",
        title: "推荐脚手架",
        body: "npm create vite@latest my-app -- --template preact-ts\n\n或官方 preact-cli。配置 alias 时注意 preact/compat 若需兼容 React 库。"
      },
      {
        type: "code",
        title: "入口示意",
        lang: "tsx",
        code: "import { render } from 'preact'\nimport { App } from './app'\nrender(<App />, document.getElementById('app'))"
      },
      {
        type: "demo",
        kind: "script-setup",
        title: "对照：函数组件入口"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pj1",
            question: "现代 Preact 常用打包？",
            options: [
              "只能 webpack 1",
              "Vite",
              "只能 browserify",
              "禁止打包"
            ],
            answer: 1,
            explain: "Vite 常见。"
          }
        ]
      }
    ]
  },
  {
    slug: "class-style",
    title: "class 与 style",
    summary: "动态样式技巧。",
    level: "进阶",
    track: "进阶",
    minutes: 6,
    blocks: [
      {
        type: "text",
        title: "绑定方式",
        body: "class 字符串拼接 / clsx；style 用对象（camelCase 属性）。CSS Modules、Tailwind 都友好。"
      },
      {
        type: "demo",
        kind: "class-style",
        title: "动手：动态样式"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "cs1",
            question: "style 属性类型？",
            options: [
              "仅字符串",
              "对象或字符串",
              "只能数组",
              "禁止"
            ],
            answer: 1,
            explain: "对象最常见。"
          }
        ]
      }
    ]
  },
  {
    slug: "watchers",
    title: "监听变化",
    summary: "useEffect 与 signal effect。",
    level: "进阶",
    track: "进阶",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "两种监听",
        body: "useEffect 依赖 state；signals 用 effect(() => { ... count.value }) 自动追踪。"
      },
      {
        type: "demo",
        kind: "watchers",
        title: "动手：effect 日志"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "w1",
            question: "signal 副作用？",
            options: [
              "watch()",
              "effect()",
              "observe only",
              "on()"
            ],
            answer: 1,
            explain: "effect。"
          }
        ]
      }
    ]
  },
  {
    slug: "controlled-inputs",
    title: "组件级双向绑定",
    summary: "value + onChange 约定。",
    level: "进阶",
    track: "进阶",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "设计受控子组件",
        body: "子组件不持有最终状态，由父传入 value 与 onChange — 可测、可组合。"
      },
      {
        type: "demo",
        kind: "component-vmodel",
        title: "动手：FancyInput"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ci1",
            question: "受控子组件关键？",
            options: [
              "内部秘密 state 唯一",
              "value + onChange",
              "只能 ref",
              "v-model 指令"
            ],
            answer: 1,
            explain: "受控约定。"
          }
        ]
      }
    ]
  },
  {
    slug: "fallthrough",
    title: "Props 透传",
    summary: "...rest 到 DOM。",
    level: "进阶",
    track: "进阶",
    minutes: 6,
    blocks: [
      {
        type: "text",
        title: "包装原生元素",
        body: "function Btn({ children, ...rest }) { return <button {...rest}>{children}</button> } 保留 aria、data-*、事件。"
      },
      {
        type: "demo",
        kind: "fallthrough",
        title: "动手：透传"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ft1",
            question: "透传剩余 props？",
            options: [
              "Object.assign 全局",
              "...rest",
              "eval",
              "with"
            ],
            answer: 1,
            explain: "展开。"
          }
        ]
      }
    ]
  },
  {
    slug: "async-data",
    title: "异步数据三态",
    summary: "idle / loading / ok / error。",
    level: "进阶",
    track: "全栈准备",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "UI 状态机",
        body: "请求必须覆盖 loading 与 error。可封装 useQuery 风格 hook；生产用 TanStack Query（compat）或自研。"
      },
      {
        type: "demo",
        kind: "async",
        title: "动手：请求三态"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ad1",
            question: "请求中 UI？",
            options: [
              "空白即可",
              "loading 态",
              "假装成功",
              "死等无提示"
            ],
            answer: 1,
            explain: "明确 loading。"
          }
        ]
      }
    ]
  },
  {
    slug: "route-guards",
    title: "路由守卫",
    summary: "鉴权跳转模式。",
    level: "进阶",
    track: "全栈准备",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "保护私密页",
        body: "未登录访问 /secret → 重定向登录或展示 401。鉴权状态用 signal/Context。"
      },
      {
        type: "demo",
        kind: "guard",
        title: "动手：401 守卫"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "rg1",
            question: "未登录进私密页？",
            options: [
              "直接渲染机密",
              "拦截并引导登录",
              "console.only",
              "忽略"
            ],
            answer: 1,
            explain: "守卫。"
          }
        ]
      }
    ]
  },
  {
    slug: "form-validate",
    title: "表单校验",
    summary: "touched、错误信息、禁用提交。",
    level: "进阶",
    track: "全栈准备",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "校验时机",
        body: "onBlur 显示错误，提交时再总检。复杂表单可用 schema（zod）+ 自定义 hook。"
      },
      {
        type: "demo",
        kind: "validate",
        title: "动手：邮箱校验"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "fv1",
            question: "错误展示常见时机？",
            options: [
              "仅页面加载",
              "blur/submit",
              "永不",
              "仅 SSR"
            ],
            answer: 1,
            explain: "交互后。"
          }
        ]
      }
    ]
  },
  {
    slug: "rest-api",
    title: "REST 与 CRUD",
    summary: "fetch 封装与资源操作。",
    level: "进阶",
    track: "全栈实训",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "客户端约定",
        body: "统一 baseURL、JSON headers、401 拦截、错误归一。工坊页可练登录 + 笔记 CRUD。"
      },
      {
        type: "code",
        title: "fetch 封装示意",
        lang: "ts",
        code: "async function api(path, opts = {}) {\n  const res = await fetch('/api' + path, {\n    headers: { 'Content-Type': 'application/json', ...opts.headers },\n    ...opts,\n  })\n  if (res.status === 401) throw new Error('UNAUTHORIZED')\n  if (!res.ok) throw new Error(await res.text())\n  return res.status === 204 ? null : res.json()\n}"
      },
      {
        type: "demo",
        kind: "async",
        title: "对照：异步状态"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ra1",
            question: "HTTP 401 通常表示？",
            options: [
              "成功",
              "未授权",
              "缓存",
              "重定向循环必"
            ],
            answer: 1,
            explain: "Unauthorized。"
          }
        ]
      }
    ]
  },
  {
    slug: "auth-token",
    title: "Token 会话",
    summary: "Bearer、存储与失效。",
    level: "进阶",
    track: "全栈实训",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "安全提示",
        body: "access token 内存优先；refresh 谨慎放 httpOnly cookie。XSS 可偷 localStorage token — 注意消毒与 CSP。"
      },
      {
        type: "demo",
        kind: "guard",
        title: "对照：登录态切换"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "at1",
            question: "token 放 localStorage 风险？",
            options: [
              "无风险",
              "XSS 可窃取",
              "仅 SEO",
              "更大包体"
            ],
            answer: 1,
            explain: "XSS。"
          }
        ]
      }
    ]
  },
  {
    slug: "capstone",
    title: "毕业作品清单",
    summary: "用 Preact 做完整小产品。",
    level: "实战",
    track: "全栈实训",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "验收清单",
        body: "1) 路由 ≥3 页 2) 登录或本地身份 3) 列表 CRUD 4) 加载/错误态 5) 移动端可用 6) 部署公开 URL。\n\n可做：笔记、习惯打卡、书签匣、预算本。"
      },
      {
        type: "demo",
        kind: "todo",
        title: "热身：Todo 已是雏形"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "cp1",
            question: "作品最低标准？",
            options: [
              "只有 README",
              "可交互可部署",
              "仅截图",
              "仅设计稿"
            ],
            answer: 1,
            explain: "可运行。"
          }
        ]
      }
    ]
  },
  {
    slug: "preact-ts",
    title: "Preact + TypeScript",
    summary: "类型化 props 与 hooks。",
    level: "进阶",
    track: "工程化",
    minutes: 10,
    official: "https://preactjs.com/guide/v10/typescript",
    blocks: [
      {
        type: "text",
        title: "类型入口",
        body: "jsxImportSource 或 classic + JSX namespace。props 用 type Props = { ... }；Children 用 ComponentChildren。"
      },
      {
        type: "code",
        title: "TS 组件",
        lang: "tsx",
        code: "import type { ComponentChildren } from 'preact'\n\ntype Props = { title: string; children?: ComponentChildren }\n\nexport function Card({ title, children }: Props) {\n  return <section><h2>{title}</h2>{children}</section>\n}"
      },
      {
        type: "demo",
        kind: "form",
        title: "对照：表单也要类型思维"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ts1",
            question: "子节点类型常用？",
            options: [
              "any",
              "ComponentChildren",
              "string only",
              "HTMLElement"
            ],
            answer: 1,
            explain: "ComponentChildren。"
          }
        ]
      }
    ]
  },
  {
    slug: "testing",
    title: "测试入门",
    summary: "组件测试与可访问性。",
    level: "进阶",
    track: "工程化",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "工具链",
        body: "Vitest + @testing-library/preact。测行为不测实现：点击 → 断言文本。E2E 用 Playwright。"
      },
      {
        type: "code",
        title: "测试示意",
        lang: "tsx",
        code: "import { render, fireEvent } from '@testing-library/preact'\nimport { Counter } from './counter'\n\ntest('inc', () => {\n  const { getByText } = render(<Counter />)\n  fireEvent.click(getByText('+'))\n  expect(getByText('1')).toBeTruthy()\n})"
      },
      {
        type: "demo",
        kind: "counter",
        title: "被测对象：计数器"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "te1",
            question: "组件测试优先？",
            options: [
              "内部私有变量",
              "用户可见行为",
              "webpack 内部",
              "像素 diff 必"
            ],
            answer: 1,
            explain: "行为。"
          }
        ]
      }
    ]
  },
  {
    slug: "deploy-prod",
    title: "生产部署",
    summary: "静态托管与缓存。",
    level: "进阶",
    track: "工程化",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "常见目标",
        body: "Vite build → dist；GitHub Pages / Cloudflare Pages / Vercel / Netlify。注意 base 路径、SPA fallback、hash 资源长缓存。"
      },
      {
        type: "demo",
        kind: "async",
        title: "对照：构建后仍是静态资源 + API"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "dp1",
            question: "SPA 刷新深链需要？",
            options: [
              "无配置",
              "fallback 到 index.html",
              "关掉 JS",
              "禁用路由"
            ],
            answer: 1,
            explain: "history fallback。"
          }
        ]
      }
    ]
  },
  {
    slug: "api-client",
    title: "API 客户端",
    summary: "分层与错误模型。",
    level: "进阶",
    track: "工程化",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "分层",
        body: "ui → hooks → api client → fetch。错误用 Result/异常统一；不要在每个按钮里复制粘贴 fetch。"
      },
      {
        type: "demo",
        kind: "async",
        title: "动手：统一异步态"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ac1",
            question: "API 调用应？",
            options: [
              "散落在 JSX",
              "集中封装",
              "仅 eval",
              "同步 XHR 唯一"
            ],
            answer: 1,
            explain: "封装。"
          }
        ]
      }
    ]
  },
  {
    slug: "portal-modal",
    title: "Portal 与浮层",
    summary: "Modal、逃逸 stacking context。",
    level: "进阶",
    track: "进阶模式",
    minutes: 8,
    official: "https://preactjs.com/guide/v10/components",
    blocks: [
      {
        type: "text",
        title: "createPortal",
        body: "把节点挂到 document.body，避免父级 overflow/transform 裁剪。注意焦点陷阱与 Esc 关闭（a11y）。"
      },
      {
        type: "demo",
        kind: "teleport",
        title: "动手：Modal"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pm1",
            question: "Portal 目的？",
            options: [
              "加快 API",
              "渲染到 DOM 其他位置",
              "加密",
              "SSR only"
            ],
            answer: 1,
            explain: "DOM 位置。"
          }
        ]
      }
    ]
  },
  {
    slug: "keep-alive",
    title: "状态保留切换",
    summary: "Tabs 不卸载。",
    level: "进阶",
    track: "进阶模式",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "隐藏 vs 卸载",
        body: "条件卸载会丢 state；用 CSS 隐藏或缓存 vnode 可保留。权衡内存。"
      },
      {
        type: "demo",
        kind: "keepalive",
        title: "动手：Tab 保活"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ka1",
            question: "卸载组件会？",
            options: [
              "保留 state",
              "丢失内部 state",
              "更快永远",
              "自动 persist"
            ],
            answer: 1,
            explain: "state 丢失。"
          }
        ]
      }
    ]
  },
  {
    slug: "memo-perf",
    title: "性能模式",
    summary: "memo、useMemo、signals。",
    level: "进阶",
    track: "进阶模式",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "先测再优化",
        body: "Preact 已很快。热点：大列表虚拟化、稳定回调 useCallback、memo 子树、signals 细更新。避免过早 memo 化一切。"
      },
      {
        type: "demo",
        kind: "computed",
        title: "动手：useMemo 派生"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "mp1",
            question: "优化第一步？",
            options: [
              "到处 memo",
              "测量瓶颈",
              "删除 key",
              "禁止 hooks"
            ],
            answer: 1,
            explain: "测量。"
          }
        ]
      }
    ]
  },
  {
    slug: "async-components",
    title: "懒加载组件",
    summary: "code splitting。",
    level: "进阶",
    track: "进阶模式",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "动态 import",
        body: "const C = lazy(() => import(\"./Heavy\"))；配合 Suspense 边界（或自管 loading 态）。"
      },
      {
        type: "demo",
        kind: "async-comp",
        title: "动手：懒加载"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "acp1",
            question: "懒加载收益？",
            options: [
              "更小首包",
              "更大首包",
              "去掉类型",
              "禁用缓存"
            ],
            answer: 0,
            explain: "拆包。"
          }
        ]
      }
    ]
  },
  {
    slug: "transitions",
    title: "过渡与动画",
    summary: "CSS transition + 关键帧。",
    level: "进阶",
    track: "进阶模式",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "优先 CSS",
        body: "透明度/transform 做过渡；列表可用 FLIP。库可选 auto-animate、motion（体积评估）。"
      },
      {
        type: "demo",
        kind: "transition",
        title: "动手：面板过渡"
      },
      {
        type: "demo",
        kind: "animation",
        title: "动手：数字动画"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "tr1",
            question: "性能友好动画属性？",
            options: [
              "top/left 狂改",
              "transform/opacity",
              "width 每帧布局",
              "table-layout"
            ],
            answer: 1,
            explain: "合成属性。"
          }
        ]
      }
    ]
  },
  {
    slug: "interview-preact",
    title: "面试串讲",
    summary: "Preact vs React 与原理要点。",
    level: "实战",
    track: "进阶模式",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "高频题",
        body: "1) 与 React 差异（体积、事件、class、部分生态）2) diff 思路 3) hooks 顺序 4) signals vs state 5) compat 何时用 6) hydration / SSR 基础。"
      },
      {
        type: "demo",
        kind: "compat",
        title: "对照：兼容层概念"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "iv1",
            question: "preact/compat 作用？",
            options: [
              "减小核心",
              "兼容 React 生态 API",
              "替换 Node",
              "CSS 框架"
            ],
            answer: 1,
            explain: "兼容。"
          },
          {
            id: "iv2",
            question: "Hooks 不能？",
            options: [
              "自定义组合",
              "条件调用",
              "调其他 hooks",
              "返回值"
            ],
            answer: 1,
            explain: "禁止条件调用。"
          }
        ]
      }
    ]
  },
  {
    slug: "diff-react",
    title: "与 React 的差异",
    summary: "官方 differences 精读。",
    level: "进阶",
    track: "官网对齐",
    format: "reference",
    minutes: 10,
    official: "https://preactjs.com/guide/v10/differences-to-react",
    blocks: [
      {
        type: "text",
        title: "要点",
        body: "preact/compat 提供兼容；核心更小。部分生命周期命名历史差异；SVG 属性、部分事件细节需查表。新项目可直接 Preact API。"
      },
      {
        type: "demo",
        kind: "compat",
        title: "对照卡片"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "dr1",
            question: "差异文档在？",
            options: [
              "MDN only",
              "preactjs.com guide",
              "仅推特",
              "RFC 忽略"
            ],
            answer: 1,
            explain: "官方 guide。"
          }
        ]
      }
    ]
  },
  {
    slug: "no-build",
    title: "无构建用法",
    summary: "import map + esm。",
    level: "进阶",
    track: "官网对齐",
    format: "reference",
    minutes: 8,
    official: "https://preactjs.com/guide/v10/getting-started",
    blocks: [
      {
        type: "text",
        title: "CDN / ESM",
        body: "现代浏览器可用 import map 加载 preact；教学与原型很快。生产仍建议打包与压缩。"
      },
      {
        type: "demo",
        kind: "counter",
        title: "本站 Demo 即 ESM 思路"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "nb1",
            question: "无构建依赖？",
            options: [
              "必须 webpack",
              "原生 ESM/import map",
              "只能 Python",
              "ActiveX"
            ],
            answer: 1,
            explain: "ESM。"
          }
        ]
      }
    ]
  },
  {
    slug: "options-hooks",
    title: "Options 与调试钩子",
    summary: "vnode 钩子、调试。",
    level: "进阶",
    track: "官网对齐",
    format: "reference",
    minutes: 8,
    official: "https://preactjs.com/guide/v10/options",
    blocks: [
      {
        type: "text",
        title: "options",
        body: "Preact 暴露 options.vnode / unmount 等钩子，供 devtools 与库扩展。一般业务代码不直接碰。"
      },
      {
        type: "demo",
        kind: "plugins",
        title: "插件式扩展类比"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "op1",
            question: "options 主要用于？",
            options: [
              "写业务 CSS",
              "运行时扩展/调试",
              "数据库",
              "DNS"
            ],
            answer: 1,
            explain: "扩展点。"
          }
        ]
      }
    ]
  },
  {
    slug: "rendering-mechanism",
    title: "渲染机制",
    summary: "VNode、diff、批量更新。",
    level: "进阶",
    track: "官网对齐",
    format: "reference",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "心智模型",
        body: "JSX → VNode 树 → diff 旧树 → 打补丁到 DOM。setState 异步批处理。signals 可跳过整树重渲，直达文本。"
      },
      {
        type: "demo",
        kind: "counter",
        title: "观察：点一次只更新必要 DOM"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "rm1",
            question: "Virtual DOM 是？",
            options: [
              "真实 DOM 替身描述",
              "数据库",
              "CSSOM only",
              "TCP"
            ],
            answer: 0,
            explain: "轻量描述。"
          }
        ]
      }
    ]
  },
  {
    slug: "suspense-mode",
    title: "Suspense 模式",
    summary: "异步边界。",
    level: "进阶",
    track: "官网对齐",
    format: "reference",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "边界思想",
        body: "异步组件/数据未就绪时展示 fallback。可用官方 suspense 实验能力或自建状态机。"
      },
      {
        type: "demo",
        kind: "suspense",
        title: "动手：占位"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "su1",
            question: "Suspense 解决？",
            options: [
              "CSS 冲突",
              "异步等待 UI",
              "SQL 注入",
              "DNS"
            ],
            answer: 1,
            explain: "异步 UI。"
          }
        ]
      }
    ]
  },
  {
    slug: "a11y-security",
    title: "无障碍与安全",
    summary: "a11y、XSS、dangerouslySetInnerHTML。",
    level: "进阶",
    track: "官网对齐",
    format: "reference",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "底线",
        body: "语义标签、键盘可操作、对比度。永远不要把未消毒 HTML 塞进 dangerouslySetInnerHTML。外链 API 数据当不可信。"
      },
      {
        type: "demo",
        kind: "form",
        title: "表单也要 label"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "as1",
            question: "dangerouslySetInnerHTML 风险？",
            options: [
              "变慢一点",
              "XSS",
              "不能 SSR",
              "更大 gzip"
            ],
            answer: 1,
            explain: "XSS。"
          }
        ]
      }
    ]
  },
  {
    slug: "style-guide",
    title: "风格指南",
    summary: "目录、命名、组件粒度。",
    level: "进阶",
    track: "官网对齐",
    format: "reference",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "约定",
        body: "组件 PascalCase；hooks 文件 use-*.ts；一文件一主组件；容器/展示可分；禁止巨型 2k 行组件。"
      },
      {
        type: "demo",
        kind: "component",
        title: "小组件组合"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sg1",
            question: "Hooks 文件命名？",
            options: [
              "Helper",
              "useXxx",
              "XxxManagerClass",
              "data.xml"
            ],
            answer: 1,
            explain: "use 前缀。"
          }
        ]
      }
    ]
  },
  {
    slug: "conditional",
    title: "条件渲染模式",
    summary: "&&、三元、早期 return。",
    level: "入门",
    track: "官网对齐",
    format: "reference",
    minutes: 6,
    blocks: [
      {
        type: "text",
        title: "可读性",
        body: "简单用 &&；if/else 多分支抽子组件；避免嵌套三元地狱。"
      },
      {
        type: "demo",
        kind: "conditional",
        title: "动手：分支"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "cd1",
            question: "多分支更佳？",
            options: [
              "嵌套三元 10 层",
              "子组件/提前 return",
              "字符串拼 HTML",
              "eval"
            ],
            answer: 1,
            explain: "结构清晰。"
          }
        ]
      }
    ]
  },
  {
    slug: "component-registration",
    title: "组件「注册」",
    summary: "ESM import 即注册。",
    level: "入门",
    track: "官网对齐",
    format: "reference",
    minutes: 5,
    blocks: [
      {
        type: "text",
        title: "没有全局注册表",
        body: "与 Vue 不同：import { X } from \"./x\" 再写 <X />。动态场景用 map 字典。"
      },
      {
        type: "demo",
        kind: "registration",
        title: "动手：本地组件"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "cr1",
            question: "Preact 组件全局注册？",
            options: [
              "app.component",
              "通常不需要，用 import",
              "必须 window.X",
              "web.xml"
            ],
            answer: 1,
            explain: "import。"
          }
        ]
      }
    ]
  },
  {
    slug: "preact-compat",
    title: "preact/compat 深潜",
    summary: "跑 React 生态库。",
    level: "进阶",
    track: "官网对齐",
    format: "reference",
    minutes: 10,
    official: "https://preactjs.com/guide/v10/switching-to-preact",
    blocks: [
      {
        type: "text",
        title: "何时 compat",
        body: "需要 react-router / 某些 UI 库时 alias react → preact/compat。代价：体积略增，极少数库仍不兼容。"
      },
      {
        type: "demo",
        kind: "compat",
        title: "概念卡"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pc1",
            question: "compat 做什么？",
            options: [
              "编译 CSS",
              "把 React API 映射到 Preact",
              "写 SQL",
              "CDN 加速图片"
            ],
            answer: 1,
            explain: "兼容层。"
          }
        ]
      }
    ]
  },
  {
    slug: "islands",
    title: "Islands 与渐进增强",
    summary: "局部 hydration 思路。",
    level: "进阶",
    track: "官网对齐",
    format: "reference",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "岛屿架构",
        body: "页面多为静态 HTML，仅交互「岛」hydrate Preact。适合内容站 + 少量小组件。与 Astro 等工具常见组合。"
      },
      {
        type: "demo",
        kind: "component",
        title: "岛 = 独立小组件"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "is1",
            question: "Islands 目标？",
            options: [
              "整页必须 client render",
              "减少 JS 水量",
              "去掉 HTML",
              "只用 canvas"
            ],
            answer: 1,
            explain: "少 JS。"
          }
        ]
      }
    ]
  },
  {
    slug: "ssr-basics",
    title: "SSR 基础",
    summary: "renderToString 与 hydration。",
    level: "进阶",
    track: "官网对齐",
    format: "reference",
    minutes: 10,
    official: "https://preactjs.com/guide/v10/server-side-rendering",
    blocks: [
      {
        type: "text",
        title: "同构",
        body: "服务端 renderToString(<App/>) 出 HTML；客户端 hydrate 挂事件。注意双重请求、窗口 API 守卫。"
      },
      {
        type: "demo",
        kind: "async",
        title: "数据：服务端也可预取"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ssr1",
            question: "hydrate 作用？",
            options: [
              "删除 HTML",
              "给 SSR 标记绑事件",
              "压缩图片",
              "写 cookie 必"
            ],
            answer: 1,
            explain: "接管 DOM。"
          }
        ]
      }
    ]
  },
  {
    slug: "quick-start",
    title: "快速开始备忘",
    summary: "安装、渲染、第一个组件。",
    level: "入门",
    track: "官网对齐",
    format: "reference",
    minutes: 5,
    blocks: [
      {
        type: "text",
        title: "三步",
        body: "1 install preact 2 render(<App/>, root) 3 写函数组件。TypeScript 模板优先。"
      },
      {
        type: "demo",
        kind: "counter",
        title: "第一个组件"
      },
      {
        type: "quiz",
        questions: [
          {
            id: "qs1",
            question: "挂载 API？",
            options: [
              "ReactDOM.render 必",
              "render from preact",
              "mountVue",
              "appendChild React only"
            ],
            answer: 1,
            explain: "preact render。"
          }
        ]
      }
    ]
  }
];

export const TRACKS = [
  "基础",
  "进阶",
  "全栈准备",
  "全栈实训",
  "工程化",
  "进阶模式",
  "官网对齐",
] as const;

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function getLessonIndex(slug: string): number {
  return LESSONS.findIndex((l) => l.slug === slug);
}

export function getAdjacent(slug: string): {
  prev?: Lesson;
  next?: Lesson;
} {
  const i = getLessonIndex(slug);
  if (i < 0) return {};
  return {
    prev: i > 0 ? LESSONS[i - 1] : undefined,
    next: i < LESSONS.length - 1 ? LESSONS[i + 1] : undefined,
  };
}

export function getLessonsByTrack(track: Lesson["track"]) {
  return LESSONS.filter((l) => l.track === track);
}

export function getAllQuizQuestions(): Array<
  QuizQuestion & { lessonSlug: string; lessonTitle: string }
> {
  const out: Array<QuizQuestion & { lessonSlug: string; lessonTitle: string }> = [];
  for (const lesson of LESSONS) {
    for (const block of lesson.blocks) {
      if (block.type === "quiz") {
        for (const q of block.questions) {
          out.push({
            ...q,
            lessonSlug: lesson.slug,
            lessonTitle: lesson.title,
          });
        }
      }
    }
  }
  return out;
}

export function isCourseLesson(l: Lesson): boolean {
  if (l.format === "reference") return false;
  if (l.format === "course") return true;
  return l.track !== "官网对齐";
}

export function getCourseLessons(): Lesson[] {
  return LESSONS.filter(isCourseLesson);
}
