# React Todo Frontend

A production-grade React Todo app with TypeScript, Tailwind CSS, and comprehensive testing.

[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-brightgreen)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-latest-green)](https://vitest.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.3-38B2AC)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-10.8.0-orange)](https://pnpm.io/)

## Implementation Progress

Based on the todos.md file:

- ✅ **P0 – Bootstrap**: All bootstrap tasks ready
- ✅ **P1 – Foundation**: Set up routing, placeholder pages, Vitest, and lefthook
- ✅ **P2 – API Layer**: Defined Todo type, fetch wrapper, and Todos GET service
- ✅ **P3 – Read UX**: Implemented loading skeleton, todo list rendering, and empty state
- ✅ **P4 – Create UX**: Added TodoEditor component with optimistic updates
- ✅ **P5 – Update UX**: Implemented edit mode toggle and update flow
- ✅ **P6 – Toggle Done**: Added checkbox handling with error rollback
- ✅ **P7 – Delete**: Implemented delete with optimistic removal and rollback
- ✅ **P8 – Validation**: Added form validation and visual indicators
- ✅ **P9 – Polish**: Updated README and documentation

## Features

- ✅ Create, Read, Update, Delete operations for todos
- 🚀 Optimistic UI updates with error rollbacks
- 🎨 Modern UI with Tailwind CSS
- 🧪 Comprehensive test coverage
- 🔒 Form validation with Zod
- 🔄 API integration

## Tech Stack

- **UI Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Testing**: Vitest + Testing Library
- **Linting**: Biome
- **Git Hooks**: Lefthook
- **Package Manager**: pnpm

## Project Structure

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

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   pnpm install
   ```
3. Start the development server:
   ```
   pnpm dev
   ```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests
- `pnpm lint` - Lint code
- `pnpm format` - Format code
- `pnpm typecheck` - Type check

## API Integration

The app integrates with a RESTful API with the following endpoints:

| Action  | Method | Endpoint          |
| ------- | ------ | ----------------- |
| Get All | GET    | `/api/todos/`     |
| Create  | POST   | `/api/todos/`     |
| Update  | PUT    | `/api/todos/{id}` |
| Delete  | DELETE | `/api/todos/{id}` |

The server proxy is configured in `vite.config.ts` to route `/api` requests to `http://localhost:3000`.

## Testing

This project uses Vitest and React Testing Library for testing. Run tests with:

```
pnpm test
```

## License

MIT