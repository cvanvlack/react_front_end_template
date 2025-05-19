import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import type { Todo } from "../../types/todo";
import TodosPage from "../TodosPage";

const mockTodos: Todo[] = [
	{
		id: "2",
		title: "Second Todo",
		description: "This should appear first as it's newer",
		done: false,
	},
	{
		id: "1",
		title: "First Todo",
		description: "This should appear second as it's older",
		done: true,
	},
];

// Setup MSW server
const server = setupServer(
	http.get("/api/todos/", () => {
		return HttpResponse.json(mockTodos);
	}),
	http.post("/api/todos/", async ({ request }) => {
		const newTodo = await request.json();
		return HttpResponse.json({ id: "3", ...newTodo });
	}),
	http.put("/api/todos/:id", async ({ params, request }) => {
		const { id } = params;
		const updates = await request.json();
		const todo = mockTodos.find((t) => t.id === id.toString());

		if (!todo) {
			return new HttpResponse(null, { status: 404 });
		}

		return HttpResponse.json({ ...todo, ...updates });
	}),
	http.delete("/api/todos/:id", ({ params }) => {
		const { id } = params;
		const todoExists = mockTodos.some((t) => t.id === id.toString());

		if (!todoExists) {
			return new HttpResponse(null, { status: 404 });
		}

		return new HttpResponse(null, { status: 200 });
	}),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("TodosPage", () => {
	it("renders the page title", async () => {
		render(<TodosPage />);
		expect(screen.getByText("Todos")).toBeInTheDocument();
	});

	it("shows loading skeleton initially", () => {
		render(<TodosPage />);
		expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
	});

	it("renders todos after loading", async () => {
		render(<TodosPage />);

		// Wait for loading to finish and todos to appear
		await waitFor(() => {
			expect(screen.queryByTestId("loading-skeleton")).not.toBeInTheDocument();
		});

		expect(screen.getByTestId("todo-list")).toBeInTheDocument();
		expect(screen.getByText("Second Todo")).toBeInTheDocument();
		expect(screen.getByText("First Todo")).toBeInTheDocument();

		// Verify sort order (newest first)
		const todoElements = screen.getAllByTestId(/^todo-/);
		expect(todoElements[0]).toHaveTextContent("Second Todo");
		expect(todoElements[1]).toHaveTextContent("First Todo");
	});

	it("shows empty state when no todos", async () => {
		// Override the handler for this specific test
		server.use(
			http.get("/api/todos/", () => {
				return HttpResponse.json([]);
			}),
		);

		render(<TodosPage />);

		await waitFor(() => {
			expect(screen.queryByTestId("loading-skeleton")).not.toBeInTheDocument();
		});

		expect(screen.getByTestId("empty-state")).toBeInTheDocument();
		expect(screen.getByText("No todos yet. Click ➕ to add one.")).toBeInTheDocument();
	});

	it("displays add todo button", async () => {
		render(<TodosPage />);

		await waitFor(() => {
			expect(screen.queryByTestId("loading-skeleton")).not.toBeInTheDocument();
		});

		expect(screen.getByTestId("create-button")).toBeInTheDocument();
	});
});
