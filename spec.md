# 🧩 React Todo Frontend – Specification

A minimal yet production-grade frontend template using **React**, **Vite**, **TypeScript**, **TailwindCSS**, and **Lefthook**, integrating with a RESTful FastAPI backend. Designed to demonstrate best practices in project scaffolding, UX structure, and maintainable code—ready to extend.

---

## 1. 📦 Tech Stack

| Category        | Tooling                       |
| --------------- | ----------------------------- |
| UI Framework    | React 19                      |
| Build Tool      | Vite                          |
| Language        | TypeScript                    |
| Styling         | TailwindCSS + ShadCN + Lucide |
| Routing         | React Router DOM              |
| Testing         | Vitest + Testing Library      |
| Linting         | Biome                         |
| Git Hooks       | Lefthook                      |
| Package Manager | pnpm                          |

---

## 2. 📁 Folder Structure (`src/`)

```
src/
├── api/
│   └── services/
│       └── todos.ts          # API calls (GET, POST, PUT, DELETE)
├── components/
│   ├── TodoCard.tsx          # View mode component
│   └── TodoEditor.tsx        # Edit/Create form
├── pages/
│   └── TodosPage.tsx         # Top-level page, contains list and + button
├── types/
│   └── todo.ts               # `Todo` type
├── App.tsx                   # Routing setup
├── main.tsx                  # Vite entrypoint
├── global.css                # Tailwind entrypoint
└── setupTests.ts             # Vitest + React Testing Library setup
```

---

## 3. 📊 Data Model

```ts
export type Todo = {
  id: string;
  title: string;
  description: string;
  done: boolean;
};
```

### API Endpoints (FastAPI backend)

| Action  | Method | Endpoint          |
| ------- | ------ | ----------------- |
| Get All | GET    | `/api/todos/`     |
| Create  | POST   | `/api/todos/`     |
| Update  | PUT    | `/api/todos/{id}` |
| Delete  | DELETE | `/api/todos/{id}` |

---

## 4. 🎨 UI Behavior

### Page Initialization

* On mount: `GET /api/todos/`
* Show **skeleton placeholder** while loading
* Show **“No todos yet. Click + to add one.”** if empty

### Todo List Display

* Ordered by insert time (newest first)
* Each todo is rendered as a **card** with:

  * ✅ Title
  * ✅ Description
  * ✅ Done checkbox (toggles status via PUT)
  * ✅ Edit (✏️) button
  * ✅ Delete (🗑️) button

### Create New Todo

* Clicking ➕ icon:

  * Adds a **new card at the top**, in **edit mode**
  * Allows **multiple unsaved cards**
* Form includes:

  * Required: `title` (non-empty)
  * Optional: `description`
  * Optional: `done`
* `Save`: POST `/api/todos/` → prepend result
* `Cancel`: remove new card entirely

### Edit Existing Todo

* In-place inline replacement with input fields
* `Save`: PUT `/api/todos/{id}` → update local state
* `Cancel`: revert to original display

### Toggle `done`

* Checkbox toggles value
* Sends `PUT /api/todos/{id}` with updated value
* Update UI only on success

### Delete

* Clicking 🗑️ sends `DELETE /api/todos/{id}`
* On success: remove from local state
* No confirmation prompt

---

## 5. ✅ Validation

* `title` is required (minLength 1)
* `description` optional (empty string valid)
* Form prevents submission if invalid
* Invalid fields are visually highlighted (`border-red-500`)
* Save button is **disabled** until valid

---

## 6. 🔄 State Management

* Use only **`useState` / `useReducer`** for local state
* No global store, no external query libraries
* Todo list is stored in component state

---

## 7. 🔗 Routing

* Uses `react-router-dom`
* Defines a single route:

  * `/` → `<TodosPage />`

---

## 8. 🧪 Testing Plan

* Test runner: **Vitest**
* Utilities: **@testing-library/react**
* Setup file: `setupTests.ts`
* Example tests:

  * `TodoCard.test.tsx` – toggling, rendering
  * `TodoEditor.test.tsx` – validation, submission, cancel behavior

```ts
// Example: setupTests.ts
import "@testing-library/jest-dom";
```

---

## 9. 🛡️ Quality Gates (Pre-commit via Lefthook)

```yaml
pre-commit:
  parallel: true
  commands:
    format:
      glob: "*.{js,jsx,ts,tsx,json,md}"
      run: pnpm biome format --write {staged_files}
      stage_fixed: true

    lint:
      glob: "*.{ts,tsx}"
      run: pnpm biome lint {staged_files}

    types:
      run: pnpm tsc --noEmit

    test:
      run: pnpm test --run
```

---

## 10. 🔧 Dev Scripts (`package.json`)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "biome lint",
    "format": "biome format",
    "typecheck": "tsc --noEmit"
  }
}
```

---

## 11. 🧱 Installation & Bootstrap

```bash
pnpm create vite
# Choose: React + TypeScript

pnpm install -D tailwindcss postcss autoprefixer
pnpm install react-router-dom @testing-library/react @testing-library/jest-dom vitest lefthook biome

npx tailwindcss init -p
lefthook install
```
