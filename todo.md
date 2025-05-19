# 🗒️ Throughline React Todo Frontend – Implementation Checklist

Use this file as your living, check‑as‑you‑go tracker. Each **Phase** is broken into the **Chunks** (≈½‑day PRs) we outlined, then further into the concrete shell / code steps you’ll perform.

> **How to use**
>
> 1. Tick a Chunk checkbox when **all** its inner tasks are complete **and merged**.
> 2. Feel free to break a Chunk into smaller commits locally; merge as one PR.
> 3. Keep this list in the repo root so every PR updates the same source‑of‑truth.

---

## Legend

* [ ] ☐ Unchecked  ｜ \[x] ☑ Done

---

## Phase P0 – Bootstrap

* [ ] **C0‑1 Bootstrap repository**

  * [ ] Initialise git & pnpm workspace (`git init`, `pnpm init`)
  * [ ] `pnpm create vite@latest todo-frontend --template react-ts`
  * [ ] Remove ESLint config & packages left by Vite template
  * [ ] First green `pnpm dev` starts blank page
  * [ ] Commit **“chore: bootstrap vite + pnpm”**

* [ ] **C0‑2 Replace ESLint → Biome**

  * [ ] `pnpm add -D @biomejs/biome`
  * [ ] Delete `.eslintrc*`, `eslint*` deps from *package.json*
  * [ ] Add `.biome.json` with recommended rules
  * [ ] Add scripts `lint` / `format`, run `pnpm biome format . --write`
  * [ ] Commit **“chore: switch to Biome”**

* [ ] **C0‑3 Tailwind pipeline**

  * [ ] `pnpm add -D tailwindcss postcss autoprefixer`
  * [ ] `npx tailwindcss init -p`
  * [ ] Configure `tailwind.config.ts` → `./src/**/*.{ts,tsx}`
  * [ ] Add `@tailwind base/components/utilities` to `src/global.css`
  * [ ] Import `global.css` in `src/main.tsx`
  * [ ] Verify builds & hot‑reload
  * [ ] Commit **“style: tailwindcss pipeline”**

* [ ] **C0‑4 Lefthook skeleton**

  * [ ] `pnpm add -D lefthook`
  * [ ] `npx lefthook install` (creates `.lefthook` git hooks)
  * [ ] Add empty `lefthook.yml` to repo root
  * [ ] Commit **“chore: lefthook skeleton”**

---

## Phase P1 – Foundation

* [ ] **C1‑1 Routing skeleton**

  * [ ] `pnpm add react-router-dom@latest`
  * [ ] Create `src/App.tsx` with `<BrowserRouter>` & single Route `/`
  * [ ] Update `src/main.tsx` to render `<App/>`
  * [ ] Stub `src/pages/TodosPage.tsx`
  * [ ] Quick manual test in browser
  * [ ] Commit **“feat: routing skeleton”**

* [ ] **C1‑2 TodosPage placeholder**

  * [ ] Implement header **Todos** and placeholder text
  * [ ] Add Tailwind container / typography classes
  * [ ] Adjust Vitest smoke test to expect text
  * [ ] Commit **“feat(ui): TodosPage placeholder”**

* [ ] **C1‑3 Vitest harness**

  * [ ] `pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`
  * [ ] Create `vitest.config.ts` with `react()` plugin & `environment:'jsdom'`
  * [ ] Add `setupTests.ts` importing jest‑dom matchers
  * [ ] Ensure `pnpm test` passes
  * [ ] Commit **“test: vitest harness”**

* [ ] **C1‑4 Lefthook quality gates**

  * [ ] Update `lefthook.yml` with commands: `format`, `lint`, `types`, `test`
  * [ ] Add `stage_fixed:true` on `format`
  * [ ] Confirm hooks fire on `git commit`
  * [ ] Commit **“chore: quality gates via Lefthook”**

---

## Phase P2 – API Layer

* [ ] **C2‑1 Define Todo type & schema**

  * [ ] Create `src/types/todo.ts` with `Todo` interface
  * [ ] Export Zod schema (or keep simple type for now)
  * [ ] Commit **“feat(types): Todo model”**

* [ ] **C2‑2 Fetch wrapper**

  * [ ] Add `src/api/request.ts` with `async function request<T>()`
  * [ ] Generic error handling incl. network/JSON errors
  * [ ] Unit test using Vitest
  * [ ] Commit **“feat(api): generic request helper”**

* [ ] **C2‑3 Todos GET service**

  * [ ] `src/api/services/todos.ts` exposing `getTodos()`
  * [ ] Mock backend with MSW in test; expect typed array
  * [ ] Commit **“feat(api): getTodos service”**

---

## Phase P3 – Read UX

* [ ] **C3‑1 Loading skeleton**

  * [ ] `src/components/Skeleton.tsx`
  * [ ] Show while `isLoading`
  * [ ] Unit test skeleton visible before fetch resolves
  * [ ] Commit **“feat(ui): loading skeleton”**

* [ ] **C3‑2 Render Todo list**

  * [ ] `src/components/TodoCard.tsx` layout only
  * [ ] Map list in `TodosPage`
  * [ ] Tests for list render order (newest first)
  * [ ] Commit **“feat(ui): todo list display”**

* [ ] **C3‑3 Empty state message**

  * [ ] Show text when list length === 0
  * [ ] Test for empty state
  * [ ] Commit **“feat(ui): empty-state message”**

---

## Phase P4 – Create UX

* [ ] **C4‑1 TodoEditor component**

  * [ ] Controlled inputs for title, description, done
  * [ ] Tailwind card styling
  * [ ] Local form validation (title required)
  * [ ] Commit **“feat(ui): TodoEditor component”**

* [ ] **C4‑2 POST service & optimistic add**

  * [ ] `createTodo()` in `todos.ts`
  * [ ] Add reducer to prepend new card in `TodosPage`
  * [ ] Rollback on error path
  * [ ] Tests: optimistic success & error rollback
  * [ ] Commit **“feat(api+ui): create todo flow”**

* [ ] **C4‑3 Cancel new todo**

  * [ ] Remove unsaved card on cancel click
  * [ ] Test cancel
  * [ ] Commit **“feat(ui): cancel new todo”**

---

## Phase P5 – Update UX

* [ ] **C5‑1 Edit mode toggle**

  * [ ] Convert `TodoCard` to editor on ✏️ click
  * [ ] Preserve original values for cancel
  * [ ] Commit **“feat(ui): edit mode toggle”**

* [ ] **C5‑2 PUT service & optimistic update**

  * [ ] `updateTodo()` in service
  * [ ] Local state update on success, revert on failure
  * [ ] Tests covering success/failure
  * [ ] Commit **“feat(api+ui): update todo flow”**

---

## Phase P6 – Toggle Done

* [ ] **C6‑1 Checkbox handler**

  * [ ] Add `onToggleDone` prop to `TodoCard`
  * [ ] Call `updateTodo()` service
  * [ ] Commit **“feat(ui): toggle done”**

* [ ] **C6‑2 Failure rollback**

  * [ ] MSW test simulating 500 → checkbox reverts
  * [ ] Commit **“fix(ui): rollback toggle failure”**

---

## Phase P7 – Delete

* [ ] **C7‑1 Delete service & optimistic removal**

  * [ ] `deleteTodo()` in service
  * [ ] Remove item on 200 OK
  * [ ] Commit **“feat(api+ui): delete todo”**

* [ ] **C7‑2 Rollback on error**

  * [ ] Test DELETE error → item restored
  * [ ] Commit **“fix(ui): rollback delete failure”**

---

## Phase P8 – Validation Hardening

* [ ] **C8‑1 Central validation rules**

  * [ ] Extract Zod schema; reuse in create/edit
  * [ ] Disable Save until valid
  * [ ] Commit **“feat(validation): shared rules”**

* [ ] **C8‑2 Visual invalid states**

  * [ ] Tailwind red border + aria‑invalid
  * [ ] Tests ensuring disabled Save when invalid
  * [ ] Commit **“feat(ui): form error styling”**

---

## Phase P9 – Polish & Docs

* [ ] **C9‑1 Tighten Lefthook**

  * [ ] Ensure `pnpm test` runs headless; fails block commit
  * [ ] Add `pnpm typecheck` to CI script sample
  * [ ] Commit **“chore: final lefthook gates”**

* [ ] **C9‑2 README & badges**

  * [ ] Write detailed project README (setup, scripts, tech stack)
  * [ ] Add shields.io badges (pnpm, vite, vitest)
  * [ ] Commit **“docs: initial README”**

---

### ✅ Finishing

When every checkbox above is ticked and all Lefthook hooks pass on the main branch, the frontend skeleton is **DONE** and ready for feature expansion.
