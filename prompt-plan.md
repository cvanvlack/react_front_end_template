Below is a **three‑pass decomposition** that gets you from a blank folder to a production‑grade React Todo front‑end, together with a **ready‑to‑copy prompt pack** you can feed to a code‑generation LLM (e.g. GPT‑4‑Turbo) to implement each slice in strict TDD style.

---

## ✨ Pass #1 – High‑Level Blueprint (milestone phases)

| Phase                | Goal (definition of done)                                                                                    | Key Outputs                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **P0 – Bootstrap**   | Project starts, can run `pnpm dev` and open a blank page                                                     | Vite + TS + React scaffold, ESLint removed, Biome installed, Tailwind pipeline wired, Lefthook installed with empty config  |
| **P1 – Foundation**  | A smoke‑tested skeleton page with routing, global styles, and CI‑quality gates                               | `<App>` + `react‑router` route `/`, empty `<TodosPage>`, type‑only Todo model, Vitest harness, Lefthook commands run & pass |
| **P2 – API Layer**   | Strongly‑typed service module that can **fetch** real backend todos and handle basic errors                  | `api/services/todos.ts` (GET only), configurable base URL, fetch wrapper with `try/catch`, unit test w/ MSW                 |
| **P3 – Read UX**     | List of todos renders in UI with loading skeleton and “no todos” empty‑state; state lives in local component | `<TodoCard>`, `<TodosPage>` uses `useEffect`, Vitest UI tests for list / skeleton / empty                                   |
| **P4 – Create UX**   | User can add a new todo via inline editor; optimistic card added, POST on save, removed on cancel            | `<TodoEditor>`, POST service, optimistic reducer, component tests                                                           |
| **P5 – Update UX**   | Edit existing todo in place; PUT on save, revert on cancel                                                   | Edit mode toggle, PUT service, reducer update, tests                                                                        |
| **P6 – Toggle Done** | Checkbox toggles `done`; PUT on success, rollback on failure                                                 | Done checkbox handler, service, tests                                                                                       |
| **P7 – Delete**      | 🗑️ removes todo; DELETE service; item vanishes only after 200 OK                                            | Delete button, reducer, tests                                                                                               |
| **P8 – Validation**  | All client forms enforce rules; invalid save is impossible                                                   | Zod schema (or hand‑rolled), disabled Save, red borders, tests                                                              |
| **P9 – Polish**      | Quality gates solid, docs, scripts, sample CI, README finalized                                              | Lefthook fully wired, scripts green, bad commit blocked, README updated                                                     |

---

## 🔨 Pass #2 – Break Phases into Iterative Chunks

(Each chunk \~½ day‑ish; target “review‑able PR” size.)

| Chunk ID | Derived From | Incremental Objective                                                             |
| -------- | ------------ | --------------------------------------------------------------------------------- |
| **C0‑1** | P0           | Initialise repo, install pnpm workspace, commit Vite template                     |
| **C0‑2** | P0           | Swap ESLint → Biome, add `pnpm format`, commit                                    |
| **C0‑3** | P0           | Add Tailwind, default config, purge paths confirmed                               |
| **C0‑4** | P0           | Commit Lefthook + empty `lefthook.yml`; hook install script                       |
| **C1‑1** | P1           | Add `App.tsx`, `main.tsx`, baseline route `/`                                     |
| **C1‑2** | P1           | Scaffold `TodosPage.tsx` with placeholder text                                    |
| **C1‑3** | P1           | Add Vitest, Testing‑Library, `setupTests.ts`; first red‑green smoke test          |
| **C1‑4** | P1           | Implement Lefthook commands `format`, `lint`, `types`, `test`; CI‑like local gate |
| **C2‑1** | P2           | Create `types/todo.ts` & Zod schema                                               |
| **C2‑2** | P2           | Build `api/request.ts` wrapper with typed error                                   |
| **C2‑3** | P2           | Implement `todos.ts` (GET only) + unit test with MSW                              |
| **C3‑1** | P3           | Add loading skeleton component; show while fetch pending                          |
| **C3‑2** | P3           | Render list with mocked `TodoCard`                                                |
| **C3‑3** | P3           | Empty‑state text + test                                                           |
| **C4‑1** | P4           | `<TodoEditor>` component (controlled form, no network yet)                        |
| **C4‑2** | P4           | Hook up optimistic POST; error rollback path                                      |
| **C4‑3** | P4           | Tests: create, cancel, error rollback                                             |
| **C5‑1** | P5           | Enable edit mode on card; copy values into `<TodoEditor>`                         |
| **C5‑2** | P5           | Put service, optimistic update, cancel path                                       |
| **C6‑1** | P6           | Add `onToggleDone` in card; service PUT call                                      |
| **C6‑2** | P6           | Failure rollback scenario test                                                    |
| **C7‑1** | P7           | Delete button, service DELETE, optimistic removal                                 |
| **C7‑2** | P7           | MSW failure test → item reappears                                                 |
| **C8‑1** | P8           | Extract validation rules, integrate with `<TodoEditor>`                           |
| **C8‑2** | P8           | Disable Save until valid; test suites                                             |
| **C9‑1** | P9           | Harden Lefthook: `stage_fixed: true`, block on test fail                          |
| **C9‑2** | P9           | Final README, badges, quick‑start commands                                        |

---

## 🪄 Pass #3 – Micro‑Steps inside Each Chunk (example)

To keep this brief, here’s the pattern you’ll follow for **every** chunk (repeat until all green):

1. **Red** – write failing test first (Vitest or MSW as appropriate).
2. **Green** – implement code to pass.
3. **Refactor** – apply Biome autofix & Tailwind classes cleanup.
4. **Commit** – run Lefthook; commit only if hooks pass.

*Example for chunk C3‑1 (“loading skeleton”)*

| Step | Command                                                    | Expected State |
| ---- | ---------------------------------------------------------- | -------------- |
| S1   | `touch src/components/Skeleton.tsx`                        | file created   |
| S2   | Write test `TodosPage shows skeleton while loading`        | fails          |
| S3   | Implement Skeleton component & use in `TodosPage`          | test passes    |
| S4   | `pnpm biome lint --fix`                                    | no lint errors |
| S5   | `git add -A && git commit -m "feat(ui): loading skeleton"` | hooks succeed  |

---

# 📜 Prompt Pack for Code‑Gen LLM

> **Usage** – feed **one prompt per chunk** to the LLM; wait for green tests before moving to the next.
> Each prompt is plain text (tagged). Adjust naming or test text literals freely.

---

### Prompt C0‑1 – Initialise Repo

```text
You are ChatGPT‑Dev‑Mode acting as my automated CLI.

**Task**  
1. Initialise a new pnpm workspace using Vite React+TS template called `todo-frontend`.  
2. Remove ESLint config & packages.  
3. Commit all with message "chore: bootstrap vite + pnpm".

**Constraints**  
- Run shell commands only (no explanatory prose).  
- Assume git repo already `git init`ed.  
- End output with literal line `#DONE`.
```

---

### Prompt C0‑2 – Replace ESLint with Biome

```text
Goal: Add Biome and remove all ESLint traces.

Steps:
1. `pnpm add -D @biomejs/biome`
2. Delete `.eslintrc*` and any eslint‑related deps in package.json.
3. Create `.biome.json` with default recommended config.
4. Add script `"lint":"biome lint"` and `"format":"biome format"`.
5. Run `pnpm biome format . --write`
6. Commit "chore: switch to Biome".

Return only the diffstat plus `#DONE`.
```

---

### Prompt C0‑3 – Tailwind Setup

```text
Configure Tailwind in the existing project.

Requirements:
- Install `tailwindcss postcss autoprefixer -D`
- Generate `tailwind.config.ts` with `content` pointing at `./src/**/*.{ts,tsx}`.
- Add `@tailwind base; @tailwind components; @tailwind utilities;` to `src/global.css`
- Import that CSS in `src/main.tsx`.
- Verify `pnpm dev` still works.
- Commit "style: tailwindcss pipeline".

Respond `#DONE` only on success.
```

---

### Prompt C0‑4 – Lefthook Skeleton

```text
Install Lefthook and initialise pre‑commit hook.

Checklist:
1. `pnpm add -D lefthook`
2. `npx lefthook install`
3. Create empty `lefthook.yml`.
4. Commit "chore: lefthook skeleton".

Return `#DONE`.
```

---

### Prompt C1‑1 – Basic Routing

```text
Implement minimal routing.

Tasks
1. `pnpm add react-router-dom`
2. Create `src/App.tsx` with BrowserRouter and single Route path="/" element={<TodosPage />} (import stub).
3. Update `src/main.tsx` to render <App/>.
4. Ensure `pnpm dev` hot‑reloads blank Todos page.

Add Vitest smoke test in `src/pages/__tests__/TodosPage.test.tsx` asserting it renders placeholder text.

All tests must pass (`pnpm test`).

Commit "feat: routing skeleton".

Provide only `#DONE`.
```

---

### Prompt C1‑2 – TodosPage Placeholder

```text
Inside `src/pages/TodosPage.tsx` implement:

- Return a div containing h1 "Todos".
- Add placeholder "Coming soon…".
- Add basic Tailwind container class.

Update test to expect these elements.

Commit "feat(ui): TodosPage placeholder".

Output `#DONE`.
```

---

### Prompt C1‑3 – Vitest Harness

```text
Set up Vitest + Testing Library.

Steps:
1. `pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`
2. Create `vitest.config.ts` that uses `react()` plugin and `environment: 'jsdom'`.
3. Add `setupTests.ts` importing `@testing-library/jest-dom`.
4. Ensure `pnpm test` passes.

Commit "test: vitest harness".

Return `#DONE`.
```

---

*(…continue prompts C1‑4 through C9‑2 in exactly the same style)*

For brevity only the first nine prompts are shown. Follow the same template for the remaining chunks listed in **Pass #2**. Each should:

1. **Specify minimal objective + acceptance test**
2. **Enumerate deterministic shell/code steps**
3. **End with commit message + `#DONE` sentinel**

This keeps the code‑gen loop predictable: run prompt → run tests → commit → next prompt.

---

## ⏭️ Next Actions

1. Copy **Pass #2 table** into an issue tracker as milestones.
2. Feed **Prompt C0‑1** to your LLM‑powered dev‑agent and iterate.
3. Review PRs; tweak prompts if reality differs.

That’s everything you need to spin up the frontend safely, with granular progress and tight feedback loops. Good building!
