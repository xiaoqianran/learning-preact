export type PreactPreset = {
  id: string;
  title: string;
  summary: string;
  code: string;
};

export const PREACT_PRESETS: PreactPreset[] = [
  {
    id: "counter",
    title: "计数器",
    summary: "useState + 事件",
    code: `function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h2>Preact Playground</h2>
      <p>你点了 <strong>{count}</strong> 次</p>
      <button onClick={() => setCount(count + 1)}>count++</button>
      <button onClick={() => setCount(0)}>重置</button>
    </div>
  )
}`,
  },
  {
    id: "signals",
    title: "Signals",
    summary: "细粒度响应式",
    code: `const count = signal(0)
const doubled = computed(() => count.value * 2)

function App() {
  return (
    <div>
      <p>count = {count}</p>
      <p>doubled = {doubled}</p>
      <button onClick={() => count.value++}>+1</button>
    </div>
  )
}`,
  },
  {
    id: "todo",
    title: "Todo",
    summary: "列表 + 表单",
    code: `function App() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState([
    { id: 1, text: '学 Preact', done: false },
  ])
  function add() {
    if (!text.trim()) return
    setTodos([...todos, { id: Date.now(), text, done: false }])
    setText('')
  }
  return (
    <div>
      <input value={text} onInput={(e) => setText(e.currentTarget.value)} onKeyDown={(e) => e.key === 'Enter' && add()} />
      <button onClick={add}>添加</button>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <label>
              <input type="checkbox" checked={t.done} onChange={() => setTodos(todos.map(x => x.id === t.id ? { ...x, done: !x.done } : x))} />
              {' '}{t.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}`,
  },
  {
    id: "context",
    title: "Context",
    summary: "跨层依赖",
    code: `const Theme = createContext('dark')
function Label() {
  const t = useContext(Theme)
  return <p class="active">theme = {t}</p>
}
function App() {
  const [t, setT] = useState('dark')
  return (
    <Theme.Provider value={t}>
      <button onClick={() => setT(t === 'dark' ? 'light' : 'dark')}>切换</button>
      <Label />
    </Theme.Provider>
  )
}`,
  },
  {
    id: "fetch",
    title: "异步请求",
    summary: "loading / data / error",
    code: `function App() {
  const [state, setState] = useState({ status: 'idle', data: null })
  async function load() {
    setState({ status: 'loading', data: null })
    await new Promise((r) => setTimeout(r, 500))
    setState({ status: 'ok', data: { msg: 'ok from mock' } })
  }
  return (
    <div>
      <button onClick={load}>请求</button>
      {state.status === 'loading' && <p>loading…</p>}
      {state.status === 'ok' && <p class="active">{state.data.msg}</p>}
    </div>
  )
}`,
  },
];

export function getPreset(id: string): PreactPreset {
  return PREACT_PRESETS.find((p) => p.id === id) ?? PREACT_PRESETS[0]!;
}
