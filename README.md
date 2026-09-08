# Markdown Preview Enhanced Preview Button

**中文：MPE 预览按钮 / VS Code Markdown 侧边预览按钮**

> 给 **Markdown Preview Enhanced (MPE)** 增加一个始终可见的 VS Code 侧边预览按钮。  
> Add a visible editor-title button for Markdown Preview Enhanced side preview.

## 解决的问题

Markdown Preview Enhanced 本身已经提供侧边预览功能，但在某些 VS Code / Remote SSH 环境中，预览入口可能不够直观，甚至只出现在 `...` 菜单中。

这个扩展**不重新实现 Markdown 预览，也不修改 MPE 的渲染逻辑**。

它只做一件事：

```text
Markdown 编辑器
      │
      ▼
[MPE Preview Button]        ← 本扩展只增加这个可见入口
      │
      ▼
mpePreviewButton.openToSide
      │
      ▼
markdown-preview-enhanced.openPreviewToTheSide
      │
      ▼
MPE 侧边预览
```

一句话：

> **功能本来就存在，只是入口不够直接；这个扩展补一个固定按钮，并调用 MPE 已有命令。**

## 适合谁

如果你遇到下面这些情况，这个小扩展可能有用：

- VS Code 右上角找不到明显的 Markdown 预览按钮
- Markdown Preview Enhanced 的侧边预览入口只在 `...` 菜单中
- Remote SSH 环境下想保留一个固定、直接的 MPE 预览入口
- 不想改 MPE 本体，只想补一个轻量 UI 按钮

## 安装前提

请先安装并启用：

- Visual Studio Code
- Markdown Preview Enhanced  
  Extension ID: `shd101wyy.markdown-preview-enhanced`

## 安装方法

### Windows

1. 下载本项目并解压。
2. 将整个项目文件夹复制到：

```text
%USERPROFILE%\.vscode\extensions\local.mpe-preview-button-0.0.1
```
常用是
```text
C:\Users\admin\.vscode\extensions
```
压缩包解压缩放到这个位置就可以了;
3. 确保 Markdown Preview Enhanced 已安装。
4. 在 VS Code 中执行：

```text
Developer: Reload Window
```

5. 打开任意 `.md` 文件，编辑器右上角应出现新的 MPE 侧边预览按钮。

### VS Code Remote SSH

如果你通过 Remote SSH 使用 MPE，需要在对应远程 VS Code Server 环境中安装此扩展，并确保远程环境里也启用了 Markdown Preview Enhanced。

常见远程扩展目录：

```text
~/.vscode-server/extensions/
```

安装完成后执行：

```text
Developer: Reload Window
```

## 原理

本扩展贡献一个 editor title action，并把点击转发给 MPE 已有命令。

`package.json` 中的入口：

```json
{
  "command": "mpePreviewButton.openToSide",
  "group": "navigation@1"
}
```

`extension.js` 中实际调用：

```js
vscode.commands.executeCommand(
  "markdown-preview-enhanced.openPreviewToTheSide"
);
```

所以调用链是：

```text
点击按钮
→ mpePreviewButton.openToSide
→ markdown-preview-enhanced.openPreviewToTheSide
→ MPE 打开侧边预览
```

## 这个扩展没有做什么

它没有：

- 重写 Markdown Preview
- 修改 Markdown Preview Enhanced 的渲染代码
- 替换 MPE
- 改动 VS Code 核心功能

它只是一个非常小的 UI helper / workaround。

## 为什么保持这么小

这个问题本质上不是“缺少预览功能”，而是“已有功能缺少一个足够直接的可见入口”。

因此最小实现就是：

```text
已有功能
→ 增加一个按钮
→ 调用已有命令
```

而不是重新实现一套预览系统。

## 搜索关键词

如果你是通过搜索来到这里，可以尝试这些关键词：

```text
Markdown Preview Enhanced 按钮
MPE 预览按钮
VSCode Markdown 预览按钮
Markdown Preview Enhanced 侧边预览
VSCode Remote SSH Markdown Preview
MPE preview button
Markdown Preview Enhanced preview button
VSCode markdown preview button
```

## English

Markdown Preview Enhanced already provides side preview. This extension only adds a visible editor-title button and forwards the click to MPE's existing command:

```text
markdown-preview-enhanced.openPreviewToTheSide
```

It is intentionally small and does not reimplement Markdown rendering.

## License

MIT
