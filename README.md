# MyThoughts

A simple, modern web app for capturing your thoughts. Write a thought, search
through them, and delete the ones you no longer need. Thoughts are persisted
locally in your browser (via `localStorage`), so there is no backend to run.

## Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for dev server and build
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) for tests
- [ESLint](https://eslint.org/) for linting

## Getting started

Requires Node.js 18+ (developed on Node 22).

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:5173
```

## Scripts

| Command          | Description                                  |
| ---------------- | -------------------------------------------- |
| `npm run dev`    | Start the Vite dev server (hot reload)       |
| `npm run build`  | Type-check and build for production          |
| `npm run preview`| Preview the production build locally         |
| `npm run lint`   | Run ESLint over the project                  |
| `npm test`       | Run the test suite once with Vitest          |
| `npm run test:watch` | Run tests in watch mode                  |

## Project structure

```
src/
  App.tsx        # main UI: compose, list, search, delete thoughts
  storage.ts     # localStorage persistence helpers
  types.ts       # shared types
  *.test.ts(x)   # unit/component tests
```
