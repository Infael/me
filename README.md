# My App

Hi, welcome to the code for my personal website. Like any good developer, I wanted to build it myself. I plan to use it as my personal playground.

## Contributing

- Read [`CONTRIBUTION.md`](./docs/CONTRIBUTION.md) for contribution rules, Conventional Commits, and PR review comment conventions.
- Releases are managed with Release Please and rely on Conventional Commit messages.
- See [`CHANGELOG.md`](./CHANGELOG.md) for published release notes.

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

Pages are deployed automatically by GitHub Actions when a Release Please release is published.

Alternatively old manual way:

```sh
pnpm run build
git add dist -f
git commit -m "commit message"
git subtree push --prefix dist origin gh-pages
```
