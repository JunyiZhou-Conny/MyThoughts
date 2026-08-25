# My Thoughts

A local writing studio. Not a software product — a public room for sentences you wrote yourself.

Dictation can catch a thought on a commute or between sets. This site is the second desk: the place that weather becomes a paragraph you are willing to stand beside. Nothing here is meant to be polished by a model in your name.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321). In development the nav includes **Inbox**. A production build does not.

```bash
npm run build
npm run preview
```

## How a thought gets here

```
Sandbar Stream Ring  →  phone transcript  →  content/inbox/  →  you rewrite  →  content/thoughts/
```

You can start before the ring exists. Paste any voice note into the inbox.

1. Add a raw transcript as `content/inbox/yyyy-mm-dd-short-name.md`.
2. Rewrite it by hand into `content/thoughts/your-slug.md`.
3. Refresh localhost. The new piece appears in the columns.

The inbox is a studio drawer. It is not published.

## Anatomy of a thought

```yaml
---
title: On agency
date: 2026-08-25
topic: Writing
lede: A short sentence that can stand alone on a research block.
draft: false
featured: false
---
```

| Field | Purpose |
| --- | --- |
| `title` | The heading on the block and the essay |
| `date` | Index order, newest first |
| `topic` | Groups columns on the home page and filters the index |
| `lede` | The one-line stand-in on cards and in the research list |
| `draft` | `true` keeps it off the public site |
| `featured` | Optional. One featured piece can span two columns on the home page |
| `sample` | Marks the starter essays so you know they are not yours |

Then write the body in Markdown. That body is the work.

## What is already here

The three thoughts in `content/thoughts/` are **samples of layout**, labeled as such. The About page is a starter draft drawn from the original note about this repository. Replace all of them when you have sentences of your own.

## What this is not

There is no button that turns a transcript into literature. That pass is yours. There is no comment thread, no account, no newsletter. Those can wait until the voice of the studio is clear.
