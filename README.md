# 🧩 frontend 应用开发项目规范文档

> 本项目为代码模板，结合前端技术，遵循统一的开发规范，确保代码质量、协作效率和发布流程标准化。

***

## 📦 项目结构概览

```shell
├── .husky/ 
├── .config/                        # 配置文件目录
│     ├── commitlint.config.js      # 提交信息格式校验规则
│     ├── .versionrc                # CHANGELOG 自动生成配置
│     ├── eslint.config.mjs         # eslint
│     │...
│...
├── .gitignore                      # Git hooks（提交规范校验）
├── package.json                    # 依赖和脚本
├── Makefile                        # 构建脚本
├── README.md                       # 当前文档
```

***

## 🧰 技术栈

| 层级     | 技术                                                         |
| -------- | ------------------------------------------------------------ |
| 前端     | `Vue.js / React.js`（根据项目选择）                          |
| 包管理器 | `pnpm`                                                       |
| 代码规范 | `ESLint`                                                     |
| Git 规范 | Conventional Commits + Husky + `Commitlint` + standard-version |
| 构建工具 | Makefile                                                     |
| 自动化   | `GitLab CI`                                                  |

***

## 🧾 Git 提交规范（Conventional Commits）

所有提交信息必须遵循 [Conventional Commits]() 格式：

```sh
<type>(<scope>): <subject>
```

### ✅ 支持的 `type` 类型

| 类型       | 含义                   |
| ---------- | ---------------------- |
| `init`     | 初始化                 |
| `feat`     | 新功能                 |
| `fix`      | Bug 修复               |
| `chore`    | 辅助工具更新或维护     |
| `docs`     | 文档修改               |
| `style`    | 样式改动（不影响逻辑） |
| `refactor` | 重构代码               |
| `perf`     | 性能优化               |
| `test`     | 测试相关               |
| `build`    | 构建系统变动           |
| `ci`       | CI/CD 相关             |
| `revert`   | 回滚提交               |

### ❌ 错误示例

```shell
git commit -m "update dependencies"
```

### ✅ 正确示例

```shell
git commit -m "feat(auth): add password strength meter"
git commit -m "fix(login): prevent crash when username is empty"
```

***

## 🧹 代码风格与自动修复

使用 `ESLint` 统一代码风格，并通过 **Husky + lint-staged** 实现提交前自动格式化。

### ✅ 提交时自动执行 lint & format

* 所有提交前会自动运行：

  ```shell
  pnpm lint:fix
  ```
  
* 只对即将提交的文件进行检查。

***

## 📜 `CHANGELOG` 自动生成

使用 [`standard-version`]() 自动生成版本号和 `CHANGELOG.md`。

### 🚀 发布新版本

```shell
pnpm release
```

该命令将：

* 根据提交类型升级语义化版本号
* 更新 `package.json`
* 生成或更新 `CHANGELOG.md`
* 创建 Git tag（如 `v1.0.0`）

***

## 🧱 构建流程

提供了一个 `Makefile` 来统一构建流程：

### ✅ 构建完整应用

```shell
make build
```

构建顺序如下：

1. `pnpm lint:fix` —— 修复前端代码格式问题
2. `pnpm build` —— 构建前端资源

***

## 🚀 `GitLab/Github CI/CD` 集成`(Todo)`

已集成 `GitLab/Github CI/CD`，支持自动化 lint、build 和发布流程。

### 📋 默认流程包括：

* 安装 `Node.js`、`pnpm`
* 安装前端依赖
* 运行 lint
* 构建前端
* 生成 Wails 模块并编译应用

### 📦 输出产物

* 构建结果保存在 `build/` 目录中
* 可选：打包为 `.zip` 并上传至 `GitLab` Release 页面

***

## 🛠️ 开发者指南

### 安装依赖

```shell
pnpm i --frozen-lockfile
```

### 设置 Git Hooks（Husky）

确保 Husky 已启用：

```shell
pnpm prepare
```

这将安装 Git hooks，确保每次提交都符合规范。

***

## 📚 常用命令速查表

| 命令                        | 描述                         |
| --------------------------- | ---------------------------- |
| `make build`                | 全流程构建 Wails 应用        |
| `make lint`                 | 前端代码检查                 |
| `pnpm run release`          | 生成 `CHANGELOG.md` 并打标签 |
| `git commit -m "feat: xxx"` | 提交符合规范的 commit        |

***

## 🔐 注意事项

* 不要手动修改 `.husky/_` 目录内容。
* 确保 `.gitattributes` 文件存在以统一换行符。
* 所有开发者应使用相同的编辑器设置（如`VSCode` 的 `.editorconfig`）。
* 推荐使用 `IDE` 插件自动格式化代码（如 `ESlint`）。

***

## 📦 后续计划（可选）

* 多平台构建支持（Windows / Linux / `macOS`）
* 用户文档自动生成

***

## 📄 License

MIT License

***

## ✅ 最后提醒

请务必阅读并理解本项目的开发规范，确保团队协作顺畅、代码质量一致。
