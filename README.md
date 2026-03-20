# My App

Hi, welcome to the code for my personal website. Like any good developer, I wanted to build it myself. I plan to use it as my personal playground.

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm run dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm run lint
```

### Upload to GH Pages

Pages are deployed automatically by a Github Workflow that runs on push to master.

Alternatively old manual way:

```sh
pnpm run build
git add dist -f
git commit -m "commit message"
git subtree push --prefix dist origin gh-pages
```
