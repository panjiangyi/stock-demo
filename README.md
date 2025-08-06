# Stock Demo - 股票数据演示应用

一个基于 Next.js 构建的股票数据展示应用，提供股票搜索、详情查看和图表分析功能。

## 🚀 在线演示

访问地址：https://stock-demo-mu.vercel.app/

## 🛠️ 本地开发

### 环境要求

- Node.js 18+
- npm 或 pnpm

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 pnpm
pnpm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 其他命令

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint
```

## 📁 项目结构

```
stock-demo/
├── api/                 # API 路由
├── app/                 # Next.js App Router 页面
│   ├── stock/          # 股票相关页面
│   └── search-bar.tsx  # 搜索组件
├── components/          # 可复用组件
│   ├── stock-detail/   # 股票详情组件
│   └── scrollbar.tsx   # 滚动条组件
├── skeleton/           # 骨架屏组件
├── types/              # TypeScript 类型定义
└── utils/              # 工具函数
```

## ✨ 主要功能

- 🔍 股票搜索和筛选
- 📊 股票详情展示
- 📈 交互式图表分析
