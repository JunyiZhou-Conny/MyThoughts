# AGENTS.md

## Cursor Cloud specific instructions

MyThoughts is a single frontend web app (React 18 + TypeScript + Vite). There is
no backend or database — thoughts are persisted in the browser via
`localStorage`. Standard commands are documented in `README.md` and defined in
`package.json` scripts (`dev`, `build`, `preview`, `lint`, `test`).

Non-obvious notes:

- The dev server (`npm run dev`) listens on port `5173` and is configured with
  `host: true` in `vite.config.ts`, so it is reachable on all interfaces.
- Tests run with Vitest in a `jsdom` environment. `src/test/setup.ts` clears
  `localStorage` after each test, so tests are isolated; when reproducing UI
  state manually in the browser, remember that data persists in `localStorage`
  across reloads (clear site data to reset).
- ESLint uses the legacy `.eslintrc.cjs` (flat config is not used). Vitest test
  globals (`describe`/`it`/`expect`/...) are declared via an `overrides` block
  in that file rather than `eslint-plugin-vitest`.
- `tsconfig.node.json` is a `composite` referenced project and must NOT set
  `noEmit` (that breaks `tsc -b` during `npm run build`).
