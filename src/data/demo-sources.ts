import type { DemoKind } from "@/data/lessons";

export type DemoSource = {
  lang: string;
  title: string;
  code: string;
};

/** 每个交互 Demo 的 Preact 源码 — 讲解与 live 区共用 */
export const DEMO_SOURCES: Record<DemoKind, DemoSource> = {
  counter: {
    lang: "jsx",
    title: "计数器 · useState",
    code: `function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>点了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>count++</button>
      <button onClick={() => setCount(0)}>重置</button>
    </div>
  )
}`,
  },
  jsx: {
    lang: "jsx",
    title: "JSX 表达式与属性",
    code: `function App() {
  const msg = '你好，Preact'
  const isActive = true
  return (
    <div>
      <p>{msg}</p>
      <p class={isActive ? 'active' : ''}>
        class 绑定 → {isActive ? 'active' : 'inactive'}
      </p>
      <p>2 + 2 = {2 + 2}</p>
    </div>
  )
}`,
  },
  signals: {
    lang: "jsx",
    title: "Signals 响应式",
    code: `const count = signal(0)
const doubled = computed(() => count.value * 2)

function App() {
  return (
    <div>
      <p>count = {count}</p>
      <p>doubled = {doubled}</p>
      <button onClick={() => count.value++}>count++</button>
      <button onClick={() => (count.value = 0)}>重置</button>
    </div>
  )
}`,
  },
  "hooks-state": {
    lang: "jsx",
    title: "useState 多状态",
    code: `function App() {
  const [name, setName] = useState('Preact')
  const [n, setN] = useState(1)
  return (
    <div>
      <input value={name} onInput={(e) => setName(e.currentTarget.value)} />
      <p>{name} × {n}</p>
      <button onClick={() => setN(n + 1)}>n++</button>
    </div>
  )
}`,
  },
  computed: {
    lang: "jsx",
    title: "useMemo + 派生值",
    code: `function App() {
  const [first, setFirst] = useState('Ada')
  const [last, setLast] = useState('Lovelace')
  const full = useMemo(() => first + ' ' + last, [first, last])
  return (
    <div>
      <input value={first} onInput={(e) => setFirst(e.currentTarget.value)} />
      <input value={last} onInput={(e) => setLast(e.currentTarget.value)} />
      <p class="active">{full}</p>
    </div>
  )
}`,
  },
  list: {
    lang: "jsx",
    title: "条件渲染 + map + key",
    code: `function App() {
  const [show, setShow] = useState(true)
  const [items, setItems] = useState([
    { id: 1, text: '学 useState' },
    { id: 2, text: '学 map + key' },
  ])
  let nextId = 3
  function add(text) {
    setItems([...items, { id: nextId++, text }])
  }
  function remove(id) {
    setItems(items.filter((x) => x.id !== id))
  }
  return (
    <div>
      <label>
        <input type="checkbox" checked={show} onChange={(e) => setShow(e.currentTarget.checked)} />
        {' '}显示列表
      </label>
      {show && (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.text}{' '}
              <button onClick={() => remove(item.id)}>删</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => add('新项 ' + Date.now() % 1000)}>添加</button>
    </div>
  )
}`,
  },
  events: {
    lang: "jsx",
    title: "事件处理",
    code: `function App() {
  const [log, setLog] = useState([])
  function push(msg) {
    setLog((prev) => [msg, ...prev].slice(0, 5))
  }
  return (
    <div>
      <div class="row">
        <button onClick={() => push('click')}>onClick</button>
        <button onDblClick={() => push('dblclick')}>onDblClick</button>
        <input
          placeholder="输入…"
          onInput={(e) => push('input: ' + e.currentTarget.value)}
        />
      </div>
      <ul>
        {log.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
    </div>
  )
}`,
  },
  form: {
    lang: "jsx",
    title: "受控表单",
    code: `function App() {
  const [form, setForm] = useState({ email: '', agree: false })
  function set(key, value) {
    setForm({ ...form, [key]: value })
  }
  return (
    <div class="card">
      <label>
        邮箱
        <input
          value={form.email}
          onInput={(e) => set('email', e.currentTarget.value)}
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={form.agree}
          onChange={(e) => set('agree', e.currentTarget.checked)}
        />
        {' '}同意条款
      </label>
      <p>JSON: {JSON.stringify(form)}</p>
      <button
        disabled={!form.email || !form.agree}
        onClick={() => alert('提交 ' + form.email)}
      >
        提交
      </button>
    </div>
  )
}`,
  },
  component: {
    lang: "jsx",
    title: "组件与 props",
    code: `function Badge({ color, children }) {
  return (
    <span style={{
      background: color || '#673ab8',
      color: '#fff',
      padding: '2px 8px',
      borderRadius: 999,
      fontSize: 12,
      marginRight: 6,
    }}>
      {children}
    </span>
  )
}

function App() {
  return (
    <div>
      <Badge color="#673ab8">Preact</Badge>
      <Badge color="#42b883">轻量</Badge>
      <Badge color="#f5a97f">3kB</Badge>
    </div>
  )
}`,
  },
  lifecycle: {
    lang: "jsx",
    title: "useEffect 生命周期",
    code: `function App() {
  const [n, setN] = useState(0)
  const [log, setLog] = useState(['mount'])
  useEffect(() => {
    setLog((l) => [...l, 'effect n=' + n])
    return () => {
      // cleanup 在下次 effect 或卸载时
    }
  }, [n])
  return (
    <div>
      <button onClick={() => setN(n + 1)}>n = {n}</button>
      <ul>
        {log.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>
    </div>
  )
}`,
  },
  todo: {
    lang: "jsx",
    title: "Todo 小应用",
    code: `function App() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState([
    { id: 1, text: '学会 Preact', done: true },
    { id: 2, text: '做个作品', done: false },
  ])
  function add() {
    if (!text.trim()) return
    setTodos([...todos, { id: Date.now(), text, done: false }])
    setText('')
  }
  function toggle(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }
  return (
    <div>
      <div class="row">
        <input
          value={text}
          onInput={(e) => setText(e.currentTarget.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder="新任务"
        />
        <button onClick={add}>添加</button>
      </div>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <label>
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
              {' '}
              <span style={{ textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.6 : 1 }}>
                {t.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}`,
  },
  router: {
    lang: "jsx",
    title: "简易路由状态",
    code: `function Home() { return <p>首页 · Home</p> }
function About() { return <p>关于 · About</p> }
function Profile({ id }) { return <p>用户 #{id}</p> }

function App() {
  const [path, setPath] = useState('/')
  let page
  if (path === '/') page = <Home />
  else if (path === '/about') page = <About />
  else if (path.startsWith('/u/')) page = <Profile id={path.slice(3)} />
  else page = <p>404</p>
  return (
    <div>
      <div class="row">
        <button onClick={() => setPath('/')}>/</button>
        <button onClick={() => setPath('/about')}>/about</button>
        <button onClick={() => setPath('/u/42')}>/u/42</button>
      </div>
      <p class="active">path = {path}</p>
      <div class="card">{page}</div>
    </div>
  )
}`,
  },
  pinia: {
    lang: "jsx",
    title: "全局 signal store",
    code: `const store = {
  count: signal(0),
  user: signal({ name: 'guest' }),
  inc() { store.count.value++ },
  login(name) { store.user.value = { name } },
}

function Counter() {
  return (
    <div class="card">
      <p>count = {store.count}</p>
      <button onClick={store.inc}>+1</button>
    </div>
  )
}
function UserBar() {
  return (
    <div class="card">
      <p>user = {store.user.value.name}</p>
      <button onClick={() => store.login('Ada')}>登录 Ada</button>
    </div>
  )
}
function App() {
  return (
    <div>
      <Counter />
      <UserBar />
    </div>
  )
}`,
  },
  challenge: {
    lang: "jsx",
    title: "挑战：购物车",
    code: `function App() {
  const [cart, setCart] = useState([])
  const products = [
    { id: 'a', name: 'Preact 贴纸', price: 9 },
    { id: 'b', name: 'Hooks 手册', price: 29 },
  ]
  function add(p) {
    setCart([...cart, p])
  }
  const total = cart.reduce((s, x) => s + x.price, 0)
  return (
    <div>
      <div class="row">
        {products.map((p) => (
          <button key={p.id} onClick={() => add(p)}>
            {p.name} ¥{p.price}
          </button>
        ))}
      </div>
      <p>购物车 {cart.length} 件 · 合计 ¥{total}</p>
      <ul>
        {cart.map((c, i) => (
          <li key={i}>{c.name}</li>
        ))}
      </ul>
    </div>
  )
}`,
  },
  slots: {
    lang: "jsx",
    title: "children 插槽",
    code: `function Card({ title, children, footer }) {
  return (
    <div class="card">
      <h3 style={{ margin: '0 0 8px' }}>{title}</h3>
      <div>{children}</div>
      {footer && <div style={{ marginTop: 8, opacity: 0.7 }}>{footer}</div>}
    </div>
  )
}
function App() {
  return (
    <Card title="插槽演示" footer={<small>footer 节点</small>}>
      <p>children 就是 Preact 的「默认插槽」</p>
      <button>动作</button>
    </Card>
  )
}`,
  },
  provide: {
    lang: "jsx",
    title: "Context 依赖注入",
    code: `const ThemeCtx = createContext('dark')

function Deep() {
  const theme = useContext(ThemeCtx)
  return <p class="active">深层组件读到 theme = {theme}</p>
}
function Mid() {
  return <div class="card"><Deep /></div>
}
function App() {
  const [theme, setTheme] = useState('dark')
  return (
    <ThemeCtx.Provider value={theme}>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        切换 theme
      </button>
      <Mid />
    </ThemeCtx.Provider>
  )
}`,
  },
  async: {
    lang: "jsx",
    title: "异步请求三态",
    code: `function App() {
  const [state, setState] = useState({ status: 'idle', data: null, error: null })
  async function load() {
    setState({ status: 'loading', data: null, error: null })
    try {
      await new Promise((r) => setTimeout(r, 600))
      setState({ status: 'ok', data: { msg: 'Hello from mock API' }, error: null })
    } catch (e) {
      setState({ status: 'error', data: null, error: String(e) })
    }
  }
  return (
    <div>
      <button onClick={load} disabled={state.status === 'loading'}>
        {state.status === 'loading' ? '加载中…' : '请求数据'}
      </button>
      {state.status === 'ok' && <p class="active">{state.data.msg}</p>}
      {state.status === 'error' && <p style={{ color: '#f38ba8' }}>{state.error}</p>}
    </div>
  )
}`,
  },
  guard: {
    lang: "jsx",
    title: "简易路由守卫",
    code: `const auth = signal(false)

function App() {
  const [path, setPath] = useState('/public')
  const needAuth = path === '/secret'
  const blocked = needAuth && !auth.value
  return (
    <div>
      <div class="row">
        <button onClick={() => setPath('/public')}>公开页</button>
        <button onClick={() => setPath('/secret')}>私密页</button>
        <button onClick={() => (auth.value = !auth.value)}>
          {auth.value ? '退出' : '登录'}
        </button>
      </div>
      <p>path={path} · auth={String(auth.value)}</p>
      <div class="card">
        {blocked ? <p style={{ color: '#f5a97f' }}>401 — 请先登录</p> : <p>欢迎访问 {path}</p>}
      </div>
    </div>
  )
}`,
  },
  validate: {
    lang: "jsx",
    title: "表单校验",
    code: `function App() {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const err =
    !email ? '必填' : !/^[^@]+@[^@]+\\.[^@]+$/.test(email) ? '格式不对' : ''
  return (
    <div class="card">
      <input
        value={email}
        onInput={(e) => setEmail(e.currentTarget.value)}
        onBlur={() => setTouched(true)}
        placeholder="email"
      />
      {touched && err && <p style={{ color: '#f38ba8' }}>{err}</p>}
      <button disabled={!!err} onClick={() => alert('ok')}>提交</button>
    </div>
  )
}`,
  },
  teleport: {
    lang: "jsx",
    title: "Portal 传送门",
    code: `// 简化：用 fixed 层模拟 portal 效果
function Modal({ open, onClose, children }) {
  if (!open) return null
  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
      }}
      onClick={onClose}
    >
      <div class="card" style={{ minWidth: 220 }} onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>关闭</button>
      </div>
    </div>
  )
}
function App() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button onClick={() => setOpen(true)}>打开 Modal</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <p>Portal 风格浮层（真实项目可用 createPortal）</p>
      </Modal>
    </div>
  )
}`,
  },
  keepalive: {
    lang: "jsx",
    title: "状态保留切换",
    code: `function TabA() {
  const [n, setN] = useState(0)
  return <div class="card">Tab A · n={n} <button onClick={() => setN(n + 1)}>+1</button></div>
}
function TabB() {
  const [text, setText] = useState('')
  return (
    <div class="card">
      Tab B
      <input value={text} onInput={(e) => setText(e.currentTarget.value)} />
    </div>
  )
}
function App() {
  const [tab, setTab] = useState('a')
  // 用 display 隐藏而非卸载，模拟 keep-alive
  return (
    <div>
      <div class="row">
        <button onClick={() => setTab('a')}>A</button>
        <button onClick={() => setTab('b')}>B</button>
      </div>
      <div style={{ display: tab === 'a' ? 'block' : 'none' }}><TabA /></div>
      <div style={{ display: tab === 'b' ? 'block' : 'none' }}><TabB /></div>
    </div>
  )
}`,
  },
  directive: {
    lang: "jsx",
    title: "自定义 hook 封装行为",
    code: `function useToggle(init = false) {
  const [on, setOn] = useState(init)
  return [on, () => setOn((v) => !v)]
}
function App() {
  const [on, toggle] = useToggle()
  return (
    <div>
      <p class={on ? 'active' : ''}>{on ? 'ON' : 'OFF'}</p>
      <button onClick={toggle}>toggle</button>
    </div>
  )
}`,
  },
  "class-style": {
    lang: "jsx",
    title: "class 与 style",
    code: `function App() {
  const [on, setOn] = useState(true)
  const [size, setSize] = useState(16)
  return (
    <div>
      <p
        class={on ? 'active' : ''}
        style={{ fontSize: size, transition: 'font-size .15s' }}
      >
        动态 class + style
      </p>
      <button onClick={() => setOn(!on)}>toggle class</button>
      <button onClick={() => setSize(size + 2)}>字号+</button>
    </div>
  )
}`,
  },
  watchers: {
    lang: "jsx",
    title: "effect 监听变化",
    code: `function App() {
  const [q, setQ] = useState('')
  const [log, setLog] = useState([])
  useEffect(() => {
    if (!q) return
    setLog((l) => ['watch: ' + q, ...l].slice(0, 4))
  }, [q])
  return (
    <div>
      <input value={q} onInput={(e) => setQ(e.currentTarget.value)} placeholder="输入触发 effect" />
      <ul>{log.map((x, i) => <li key={i}>{x}</li>)}</ul>
    </div>
  )
}`,
  },
  "template-ref": {
    lang: "jsx",
    title: "useRef DOM",
    code: `function App() {
  const inputRef = useRef(null)
  return (
    <div>
      <input ref={inputRef} placeholder="点按钮聚焦" />
      <button onClick={() => inputRef.current && inputRef.current.focus()}>
        focus
      </button>
    </div>
  )
}`,
  },
  "component-vmodel": {
    lang: "jsx",
    title: "受控组件双向绑定",
    code: `function FancyInput({ value, onChange }) {
  return (
    <input
      value={value}
      onInput={(e) => onChange(e.currentTarget.value)}
      style={{ borderColor: '#673ab8' }}
    />
  )
}
function App() {
  const [v, setV] = useState('hello')
  return (
    <div>
      <FancyInput value={v} onChange={setV} />
      <p>父状态：{v}</p>
    </div>
  )
}`,
  },
  fallthrough: {
    lang: "jsx",
    title: "透传 props",
    code: `function Button({ children, ...rest }) {
  return (
    <button {...rest} style={{ background: '#673ab8', border: 'none', color: '#fff' }}>
      {children}
    </button>
  )
}
function App() {
  return (
    <Button type="button" aria-label="demo" onClick={() => alert('ok')}>
      透传 onClick / aria
    </Button>
  )
}`,
  },
  "async-comp": {
    lang: "jsx",
    title: "懒加载组件",
    code: `function Heavy() {
  return <p class="active">我是懒加载出来的重型组件</p>
}
function App() {
  const [Comp, setComp] = useState(null)
  const [loading, setLoading] = useState(false)
  async function load() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 500))
    setComp(() => Heavy)
    setLoading(false)
  }
  return (
    <div>
      <button onClick={load} disabled={loading || !!Comp}>
        {loading ? '加载…' : Comp ? '已加载' : '懒加载组件'}
      </button>
      {Comp && <Comp />}
    </div>
  )
}`,
  },
  transition: {
    lang: "jsx",
    title: "CSS 过渡",
    code: `function App() {
  const [show, setShow] = useState(true)
  return (
    <div>
      <button onClick={() => setShow(!show)}>toggle</button>
      <div
        style={{
          marginTop: 12,
          padding: 12,
          borderRadius: 8,
          background: '#1a2220',
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity .25s, transform .25s',
          pointerEvents: show ? 'auto' : 'none',
        }}
      >
        过渡面板
      </div>
    </div>
  )
}`,
  },
  suspense: {
    lang: "jsx",
    title: "异步 UI 占位",
    code: `function App() {
  const [phase, setPhase] = useState('idle')
  async function run() {
    setPhase('pending')
    await new Promise((r) => setTimeout(r, 800))
    setPhase('done')
  }
  return (
    <div>
      <button onClick={run}>开始异步</button>
      {phase === 'pending' && <p>⏳ Suspense 占位…</p>}
      {phase === 'done' && <p class="active">内容已就绪</p>}
    </div>
  )
}`,
  },
  plugins: {
    lang: "jsx",
    title: "插件式扩展",
    code: `function createLogger(prefix) {
  return {
    install(api) {
      api.log = (...args) => console.log(prefix, ...args)
    },
  }
}
const api = {}
createLogger('[preact]').install(api)

function App() {
  return (
    <button onClick={() => { api.log('hello plugin'); alert('看控制台') }}>
      调用插件 log
    </button>
  )
}`,
  },
  conditional: {
    lang: "jsx",
    title: "条件渲染模式",
    code: `function App() {
  const [mode, setMode] = useState('a')
  return (
    <div>
      <div class="row">
        <button onClick={() => setMode('a')}>A</button>
        <button onClick={() => setMode('b')}>B</button>
        <button onClick={() => setMode('c')}>C</button>
      </div>
      {mode === 'a' && <p>短路 &&</p>}
      {mode === 'b' ? <p>三元 ? :</p> : null}
      {mode === 'c' ? <p class="active">分支 C</p> : <p>其他</p>}
    </div>
  )
}`,
  },
  "transition-group": {
    lang: "jsx",
    title: "列表进出场",
    code: `function App() {
  const [items, setItems] = useState(['Alpha', 'Beta', 'Gamma'])
  return (
    <div>
      <button onClick={() => setItems([...items, 'Item ' + (items.length + 1)])}>加</button>
      <button onClick={() => setItems(items.slice(0, -1))} disabled={!items.length}>减</button>
      <ul>
        {items.map((x) => (
          <li key={x} style={{ transition: 'opacity .2s' }}>{x}</li>
        ))}
      </ul>
    </div>
  )
}`,
  },
  "sfc-css": {
    lang: "jsx",
    title: "CSS Modules 风格",
    code: `// Preact 常用 CSS Modules / 原子类；此处内联模拟
const styles = {
  root: { padding: 12, border: '1px solid #673ab8', borderRadius: 10 },
  title: { color: '#a78bfa', margin: 0 },
}
function App() {
  return (
    <div style={styles.root}>
      <h3 style={styles.title}>局部样式约定</h3>
      <p>生产中用 *.module.css 或 Tailwind</p>
    </div>
  )
}`,
  },
  "options-api": {
    lang: "jsx",
    title: "Hooks 等价 Options",
    code: `// Preact 没有 Options API；Hooks 对应 Vue Options 的 data/methods
function App() {
  const [count, setCount] = useState(0) // data
  function inc() { setCount(count + 1) } // methods
  useEffect(() => { document.title = 'count ' + count }, [count]) // watch
  return <button onClick={inc}>count {count}</button>
}`,
  },
  "web-components": {
    lang: "jsx",
    title: "与 Web Components 共存",
    code: `function App() {
  // Preact 可渲染自定义元素；属性用 string
  return (
    <div>
      <p>自定义元素示例标签：</p>
      <code><my-widget title="hi"></my-widget></code>
      <p class="active">实际项目用 preact-custom-element 包装</p>
    </div>
  )
}`,
  },
  animation: {
    lang: "jsx",
    title: "动画计数",
    code: `function App() {
  const [n, setN] = useState(0)
  return (
    <div>
      <p
        key={n}
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: '#a78bfa',
          animation: 'pop .3s ease',
        }}
      >
        {n}
      </p>
      <style>{\`
        @keyframes pop {
          from { transform: scale(0.8); opacity: 0.4 }
          to { transform: scale(1); opacity: 1 }
        }
      \`}</style>
      <button onClick={() => setN(n + 1)}>+1 动画</button>
    </div>
  )
}`,
  },
  registration: {
    lang: "jsx",
    title: "组件注册即 import",
    code: `function LocalButton({ children, ...p }) {
  return <button {...p}>{children}</button>
}
function App() {
  // Preact/React 没有「全局注册」；import 即用
  return <LocalButton onClick={() => alert('imported')}>本地组件</LocalButton>
}`,
  },
  "script-setup": {
    lang: "jsx",
    title: "函数组件即 setup",
    code: `// 函数体 = setup；return JSX = template
function App() {
  const [ready, setReady] = useState(false)
  return (
    <div>
      <p>{ready ? 'setup 完成' : '初始化…'}</p>
      <button onClick={() => setReady(true)}>完成</button>
    </div>
  )
}`,
  },
  "directives-ref": {
    lang: "jsx",
    title: "ref 回调",
    code: `function App() {
  const [w, setW] = useState(0)
  return (
    <div>
      <div
        ref={(el) => el && setW(el.offsetWidth)}
        class="card"
        style={{ width: '80%' }}
      >
        宽度 ≈ {w}px（resize 窗口再进页可更新）
      </div>
    </div>
  )
}`,
  },
  refs: {
    lang: "jsx",
    title: "useRef 可变盒",
    code: `function App() {
  const renders = useRef(0)
  const [, force] = useState(0)
  renders.current++
  return (
    <div>
      <p>渲染次数（ref，不触发重渲）：{renders.current}</p>
      <button onClick={() => force((x) => x + 1)}>强制重渲</button>
    </div>
  )
}`,
  },
  context: {
    lang: "jsx",
    title: "多级 Context",
    code: `const UserCtx = createContext(null)

function Avatar() {
  const user = useContext(UserCtx)
  return <p class="active">👤 {user?.name ?? '匿名'}</p>
}
function App() {
  return (
    <UserCtx.Provider value={{ name: 'Lin' }}>
      <div class="card"><Avatar /></div>
    </UserCtx.Provider>
  )
}`,
  },
  compat: {
    lang: "jsx",
    title: "React 兼容提示",
    code: `function App() {
  // preact/compat 可跑多数 React 生态
  // 差异：class → className 在 compat 下可用 className
  // 事件：onInput vs onChange 等细微差别
  return (
    <div class="card">
      <p>Preact 核心 API 与 React 高度相似</p>
      <p class="active">体积 ~3kB · 同构 Hooks</p>
    </div>
  )
}`,
  },
  template: {
    lang: "jsx",
    title: "JSX 模板",
    code: `function App() {
  const msg = '你好，Preact'
  const isActive = true
  return (
    <div>
      <p>{msg}</p>
      <p class={isActive ? 'active' : ''}>绑定 class</p>
    </div>
  )
}`,
  },
  "ref-vs-reactive": {
    lang: "jsx",
    title: "useState vs signal",
    code: `const sig = signal(0)
function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <div class="card">
        <p>useState: {count}</p>
        <button onClick={() => setCount(count + 1)}>setState</button>
      </div>
      <div class="card">
        <p>signal: {sig}</p>
        <button onClick={() => sig.value++}>sig++</button>
      </div>
    </div>
  )
}`,
  },
};

export function getDemoSource(kind: DemoKind): DemoSource {
  return (
    DEMO_SOURCES[kind] ?? {
      lang: "jsx",
      title: kind,
      code: `function App() {\n  return <p>Demo: ${kind}</p>\n}`,
    }
  );
}
