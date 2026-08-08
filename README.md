# Preact 实战学习

交互式中文 Preact 教程：课程 + 测验 + 进度 + 真运行 Playground + 模拟全栈工坊。

**参考姊妹站：** [learning-vue3](https://github.com/xiaoqianran/learning-vue3)  
**仓库：** [https://github.com/xiaoqianran/learning-preact](https://github.com/xiaoqianran/learning-preact)

---

## 这是什么

面向想系统学习 **Preact**（轻量 React 兼容 UI 运行时）的同学。内容以「读一点、动手一点、测一点」组织。

你可以：

- 按路径学完课程（**讲解 + 对应源码 + 交互 Demo + 小测验**）
- 在 **Playground** 里写并运行真实 Preact JSX（Hooks / Signals）
- 在 **全栈工坊** 里练登录、401、笔记 CRUD（模拟 REST API）
- 用 **速查表** 复习，用 **学习中心 / 错题本 / 结业证明** 跟进度

> 说明：本站界面用 React + TanStack Start 承载教学内容；Demo / Playground 内嵌 Babel + Preact runtime，运行的是真实 Preact。

---

## 功能一览

| 模块 | 路径 | 说明 |
|------|------|------|
| 课程 | `/lesson/:slug` | 正文、对应源码、Live Demo、测验、笔记 |
| 首页大纲 | `/` | 搜索、路径筛选、进度条 |
| Playground | `/playground` | 真实 Preact 在线编译 |
| 全栈工坊 | `/studio` | 模拟 API + 闯关任务 |
| 文档地图 | `/docs` | 对照 preactjs.com |
| 主题 | 全局 | Catppuccin（Mocha/Macchiato/Frappé/Latte + Accent） |
| 速查表 | `/cheatsheet` | 一页核心 API |
| 学习中心 | `/hub` | 打卡、收藏、路径进度 |
| 练习场 | `/lab` | 综合练习 |
| 错题本 | `/mistakes` | 测验错题回顾 |
| 结业证明 | `/certificate` | 全部完成后解锁 |

### 全栈工坊演示账号

```text
邮箱：demo@preact.dev
密码：password123
```

---

## 学习路径

| 路径 | 你学到什么 |
|------|------------|
| **基础** | JSX、useState、Signals、列表/事件/表单、组件、Effect、Context |
| **进阶** | 路由、全局 store、常见坑、项目搭建 |
| **全栈准备** | 异步三态、守卫、表单校验 |
| **全栈实训** | REST/CRUD、Token、毕业作品 |
| **工程化** | TS、测试、API 客户端、部署 |
| **进阶模式** | Portal、保活、性能、懒加载、面试串讲 |
| **官网对齐** | 与 React 差异、SSR、Islands、compat 等（可选） |

---

## 本地运行

```bash
git clone https://github.com/xiaoqianran/learning-preact.git
cd learning-preact
npm install
npm run dev
```

开发服务默认：`http://127.0.0.1:8080`。

```bash
npm run build        # 生产构建
npm run build:pages  # GitHub Pages
npm run typecheck
```

---

## 技术栈

- **界面与路由：** React 19、TanStack Start / Router、Vite
- **样式：** Tailwind CSS v4 · Catppuccin
- **状态：** Zustand（学习进度持久化）
- **Preact 教学运行时：** Babel standalone + Preact / Signals（iframe）
- **部署：** GitHub Actions → GitHub Pages

---

## 进度与隐私

- 学习进度、笔记、错题、工坊数据保存在 **浏览器 localStorage**
- 不上传到服务器；结业证明为本地成就展示

---

## 相关链接

- 姊妹站：[learning-vue3](https://github.com/xiaoqianran/learning-vue3)
- Preact 官方文档：[https://preactjs.com/](https://preactjs.com/)
