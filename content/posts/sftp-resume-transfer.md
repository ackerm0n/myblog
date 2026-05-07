---
title: 服务器codex装不上怎么办
slug: sftp-resume-transfer
excerpt: 传了一半的安装包，scp说断就断，从头再来？不存在的。
category: 技术
tags: [环境部署, Linux, 工具]
status: published
published_at: "2026-05-07"
---

## 起因

前几天要在服务器上装一个 VS Code 插件的 VSIX 包。服务器网络环境特殊，没法直接访问外网，于是我先通过 SSH 反向代理把服务器的流量接到本地梯子上。代理是通了，可下载进度条纹丝不动，一看速度——100KB/s 左右晃悠，一个几百兆的文件要传到天荒地老。

放弃直连下载，回归经典古法：本地先把包下好，再 scp 到服务器上。

```bash
scp openai.chatgpt-latest.vsix ajifang@183.222.164.28:/tmp/
```

速度虽然不快，但好歹在跑。眼看着传到 90% 多，网络一个抖动，连接断了。报错 `Broken pipe`，紧接着 `Connection reset`。

没事，重来。

又传到 80%，又断了。

再重来。

第三次断在 99% 的时候，我盯着终端沉默了半分钟。

## scp 的硬伤

scp 不支持断点续传，这是它的设计决定的。传输一旦中断，服务器上已经收到的那部分数据直接作废，下次传必须从零开始。网络稳定的时候这不是问题，可一旦遇到大文件或者烂网络，scp 就是个定时炸弹。

## sftp 的解法

翻了一圈资料，发现 Windows 自带的 sftp 命令就能解决这个问题，不需要装任何额外软件。

登录方式和 SSH 一样：

```bash
sftp ajifang@183.222.164.28
```

进入 sftp 交互界面后，先切到目标目录：

```bash
cd /tmp
```

然后用 `put` 命令上传：

```bash
put E:/downloads/openai.chatgpt-latest.vsix
```

如果传到一半又断了，重新连上 sftp，这次换一个命令：

```bash
reput E:/downloads/openai.chatgpt-latest.vsix
```

`reput` 会检查服务器上已经传了多少字节，只传剩下的部分。就这么简单。

## 为什么不装 WinSCP

WinSCP 当然更好用，图形界面拖拽上传，自带断点续传，稳定性没得说。但当时手头只有 PowerShell，不想折腾安装流程，sftp 一行 `reput` 就把问题解决了，何乐而不为。

如果你经常需要传大文件，WinSCP 确实值得装一个，一劳永逸。

