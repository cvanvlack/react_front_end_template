# 🗒️ Throughline React Todo Frontend – Implementation Checklist

Use this file as your living, check‑as‑you‑go tracker. Each **Phase** is broken into the **Chunks** (≈½‑day PRs) we outlined, then further into the concrete shell / code steps you’ll perform.

> **How to use**
>
> 1. Tick a Chunk checkbox when **all** its inner tasks are complete **and merged**.
> 2. Feel free to break a Chunk into smaller commits locally; merge as one PR.
> 3. Keep this list in the repo root so every PR updates the same source‑of‑truth.

---

## Legend

* [x] ☐ Unchecked  ｜ \[x] ☑ Done

---

## Phase P0 – Bootstrap

* [x] **C0‑1 Bootstrap repository**

  * [x] Initialise git & pnpm workspace (`git init`, `pnpm init`)
  * [x] `pnpm create vite@latest todo-frontend --template react-ts`
  * [x] Remove ESLint config & packages left by Vite template
  * [x] First green `pnpm dev` starts blank page
  * [x] Commit **“chore: bootstrap vite + pnpm”**

* [x] **C0‑2 Replace ESLint → Biome**

  * [x] `pnpm add -D @biomejs/biome`
  * [x] Delete `.eslintrc*`, `eslint*` deps from *package.json*
  * [x] Add `.biome.json` with recommended rules
  * [x] Add scripts `lint` / `format`, run `pnpm biome format . --write`
  * [x] Commit **“chore: switch to Biome”**

* [x] **C0‑3 Tailwind pipeline**

  * [x] `pnpm add -D tailwindcss postcss autoprefixer`
  * [x] `npx tailwindcss init -p`
  * [x] Configure `tailwind.config.ts` → `./src/**/*.{ts,tsx}`
  * [x] Add `@tailwind base/components/utilities` to `src/global.css`
  * [x] Import `global.css` in `src/main.tsx`
  * [x] Verify builds & hot‑reload
  * [x] Commit **“style: tailwindcss pipeline”**

* [x] **C0‑4 Lefthook skeleton**

  * [x] `pnpm add -D lefthook`
  * [x] `npx lefthook install` (creates `.lefthook` git hooks)
  * [x] Add empty `lefthook.yml` to repo root
  * [x] Commit **“chore: lefthook skeleton”**

---

## Phase P1 – Foundation

* [x] **C1‑1 Routing skeleton**

  * [x] `pnpm add react-router-dom@latest`
  * [x] Create `src/App.tsx` with `<BrowserRouter>` & single Route `/`
  * [x] Update `src/main.tsx` to render `<App/>`
  * [x] Stub `src/pages/TodosPage.tsx`
  * [x] Quick manual test in browser
  * [x] Commit **“feat: routing skeleton”**

* [x] **C1‑2 TodosPage placeholder**

  * [x] Implement header **Todos** and placeholder text
  * [x] Add Tailwind container / typography classes
  * [x] Adjust Vitest smoke test to expect text
  * [x] Commit **“feat(ui): TodosPage placeholder”**

* [x] **C1‑3 Vitest harness**

  * [x] `pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`
  * [x] Create `vitest.config.ts` with `react()` plugin & `environment:'jsdom'`
  * [x] Add `setupTests.ts` importing jest‑dom matchers
  * [x] Ensure `pnpm test` passes
  * [x] Commit **“test: vitest harness”**

* [x] **C1‑4 Lefthook quality gates**

  * [x] Update `lefthook.yml` with commands: `format`, `lint`, `types`, `test`
  * [x] Add `stage_fixed:true` on `format`
  * [x] Confirm hooks fire on `git commit`
  * [x] Commit **“chore: quality gates via Lefthook”**

---

## Phase P2 – API Layer

* [x] **C2‑1 Define Todo type & schema**

  * [x] Create `src/types/todo.ts` with `Todo` interface
  * [x] Export Zod schema (or keep simple type for now)
  * [x] Commit **“feat(types): Todo model”**

* [x] **C2‑2 Fetch wrapper**

  * [x] Add `src/api/request.ts` with `async function request<T>()`
  * [x] Generic error handling incl. network/JSON errors
  * [x] Unit test using Vitest
  * [x] Commit **“feat(api): generic request helper”**

* [x] **C2‑3 Todos GET service**

  * [x] `src/api/services/todos.ts` exposing `getTodos()`
  * [x] Mock backend with MSW in test; expect typed array
  * [x] Commit **“feat(api): getTodos service”**

---

## Phase P3 – Read UX

* [x] **C3‑1 Loading skeleton**

  * [x] `src/components/Skeleton.tsx`
  * [x] Show while `isLoading`
  * [x] Unit test skeleton visible before fetch resolves
  * [x] Commit **“feat(ui): loading skeleton”**

* [x] **C3‑2 Render Todo list**

  * [x] `src/components/TodoCard.tsx` layout only
  * [x] Map list in `TodosPage`
  * [x] Tests for list render order (newest first)
  * [x] Commit **“feat(ui): todo list display”**

* [x] **C3‑3 Empty state message**

  * [x] Show text when list length === 0
  * [x] Test for empty state
  * [x] Commit **“feat(ui): empty-state message”**

---

## Phase P4 – Create UX

* [x] **C4‑1 TodoEditor component**

  * [x] Controlled inputs for title, description, done
  * [x] Tailwind card styling
  * [x] Local form validation (title required)
  * [x] Commit **“feat(ui): TodoEditor component”**

* [x] **C4‑2 POST service & optimistic add**

  * [x] `createTodo()` in `todos.ts`
  * [x] Add reducer to prepend new card in `TodosPage`
  * [x] Rollback on error path
  * [x] Tests: optimistic success & error rollback
  * [x] Commit **“feat(api+ui): create todo flow”**

* [x] **C4‑3 Cancel new todo**

  * [x] Remove unsaved card on cancel click
  * [x] Test cancel
  * [x] Commit **“feat(ui): cancel new todo”**

---

## Phase P5 – Update UX

* [x] **C5‑1 Edit mode toggle**

  * [x] Convert `TodoCard` to editor on ✏️ click
  * [x] Preserve original values for cancel
  * [x] Commit **“feat(ui): edit mode toggle”**

* [x] **C5‑2 PUT service & optimistic update**

  * [x] `updateTodo()` in service
  * [x] Local state update on success, revert on failure
  * [x] Tests covering success/failure
  * [x] Commit **“feat(api+ui): update todo flow”**

---

## Phase P6 – Toggle Done

* [x] **C6‑1 Checkbox handler**

  * [x] Add `onToggleDone` prop to `TodoCard`
  * [x] Call `updateTodo()` service
  * [x] Commit **“feat(ui): toggle done”**

* [x] **C6‑2 Failure rollback**

  * [x] MSW test simulating 500 → checkbox reverts
  * [x] Commit **“fix(ui): rollback toggle failure”**

---

## Phase P7 – Delete

* [x] **C7‑1 Delete service & optimistic removal**

  * [x] `deleteTodo()` in service
  * [x] Remove item on 200 OK
  * [x] Commit **“feat(api+ui): delete todo”**

* [x] **C7‑2 Rollback on error**

  * [x] Test DELETE error → item restored
  * [x] Commit **“fix(ui): rollback delete failure”**

---

## Phase P8 – Validation Hardening

* [x] **C8‑1 Central validation rules**

  * [x] Extract Zod schema; reuse in create/edit
  * [x] Disable Save until valid
  * [x] Commit **“feat(validation): shared rules”**

* [x] **C8‑2 Visual invalid states**

  * [x] Tailwind red border + aria‑invalid
  * [x] Tests ensuring disabled Save when invalid
  * [x] Commit **“feat(ui): form error styling”**

---

## Phase P9 – Polish & Docs

* [x] **C9‑1 Tighten Lefthook**

  * [x] Ensure `pnpm test` runs headless; fails block commit
  * [x] Add `pnpm typecheck` to CI script sample
  * [x] Commit **“chore: final lefthook gates”**

* [x] **C9‑2 README & badges**

  * [x] Write detailed project README (setup, scripts, tech stack)
  * [x] Add shields.io badges (pnpm, vite, vitest)
  * [x] Commit **“docs: initial README”**

---

### ✅ Finishing

When every checkbox above is ticked and all Lefthook hooks pass on the main branch, the frontend skeleton is **DONE** and ready for feature expansion.
