---
title: Getting started
description: Install dependencies, run the dev server, and deploy.
locale: en
order: 1
---

## Install

```bash
bun install
```

## Develop

```bash
bun run dev
```

## Build & preview the Cloudflare Worker locally

```bash
bun run preview
```

## Deploy

Set up `wrangler` once (`bunx wrangler login`), update `wrangler.toml` with
your worker name and routes, then:

```bash
bun run deploy
```
