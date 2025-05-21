import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import type { Todo } from "../../../types/todo";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../todos";

const mockTodos: Todo[] = [
	{
		id: "1",
		title: "Test Todo 1",
		description: "Test Description 1",
		done: false,
	},
	{
		id: "2",
		title: "Test Todo 2",
		description: "Test Description 2",
		done: true,
	},
];

// Setup MSW server
const server = setupServer(
	http.get("/api/todos/", () => {
		return HttpResponse.json(mockTodos);
	}),
	http.post("/api/todos/", async ({ request }) => {
		const newTodo = (await request.json()) as Omit<Todo, "id">;
		return HttpResponse.json({ id: "3", ...newTodo });
	}),
	http.put("/api/todos/:id", async ({ params, request }) => {
		const id = params.id;
		const updates = (await request.json()) as Partial<Todo>;
		const todo = mockTodos.find((t) => t.id === id);

		if (!todo) {
			return new HttpResponse(null, { status: 404 });
		}

		return HttpResponse.json({ ...todo, ...updates });
	}),
	http.delete("/api/todos/:id", ({ params }) => {
		const id = params.id;
		const todoExists = mockTodos.some((t) => t.id === id);

		if (!todoExists) {
			return new HttpResponse(null, { status: 404 });
		}

		return new HttpResponse(null, { status: 200 });
	}),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Todo API Service", () => {
	it("getTodos should fetch all todos", async () => {
		const todos = await getTodos();
		expect(todos).toEqual(mockTodos);
		expect(todos.length).toBe(2);
	});

	it("createTodo should create a new todo", async () => {
		const newTodo = {
			title: "New Todo",
			description: "New Description",
			done: false,
		};

		const createdTodo = await createTodo(newTodo);
		expect(createdTodo).toHaveProperty("id", "3");
		expect(createdTodo.title).toBe(newTodo.title);
	});

	it("updateTodo should update an existing todo", async () => {
		const updates = {
			title: "Updated Todo",
			done: true,
		};

		const updatedTodo = await updateTodo("1", updates);
		expect(updatedTodo.title).toBe(updates.title);
		expect(updatedTodo.done).toBe(updates.done);
		expect(updatedTodo.id).toBe("1");
	});

	it("deleteTodo should delete a todo", async () => {
		await expect(deleteTodo("1")).resolves.toBeUndefined();
	});
});
