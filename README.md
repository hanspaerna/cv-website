# cv-website

Just my personal CV website. This implementation might be useful as an example to anyone who wants an SPA website populated with markdown files.

## How it works?

This Vue 3 website project is stripped from any hardcoded personal data and is assumed
to be populated via Docker/K8S env variables. An example of k8s manifest with Kustomization patch is located in `/k8s-example` folder.

Environment variables can be found in `.env.example`. They can be passed into container at runtime, without re-building the app, thanks to a dirty hack.

All pages are dynamically generated from markdown files, which are stored in my GitOps repo. In case of my homelab, it significantly reduces time to make amendments in the content.
For local development or testing, markdown files can be put into `/src/assets/markdown-demo` directory.

## Markdown header

Each markdown file must have a YAML front matter block in the beginning with the following content:

```angular2html
---
title: Your Page Title
menu: true
menuOrder: 1
route: /your-page
---
```

All of these are pretty much self-explanatory.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
