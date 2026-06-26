# 部署指南

## 线上地址

https://anti-view.github.io/

## 原理

- 源码 → `npm run build` → 构建产物写入 `docs/` 目录
- `git push` → GitHub 自动从 `docs/` 取文件发布到网站
- `vite.config.ts` 设置 `base: './'` + `outDir: 'docs'`，确保资源路径为相对路径

## 部署命令

```bash
npm run build       # 构建到 docs/
git add -A
git commit -m "发布：xxx"
git push            # 推送后约 30 秒上线
```

## 注意事项

- `docs/` 目录为纯构建产物，每次 build 会清空重写
- Figma 设计参考文件存放在 `figma-refs/`，不与 `docs/` 混淆
- 代理设置：`git config --global http.proxy http://127.0.0.1:7890`（Clash）
