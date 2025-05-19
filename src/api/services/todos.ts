import type { Todo } from "../../types/todo";
import { request } from "../request";

// Base API URL - can be replaced with environment variable
const API_BASE = "http://localhost:8000/api";

export async function getTodos(): Promise<Todo[]> {
	return request<Todo[]>(`${API_BASE}/todos/`);
}

export async function createTodo(todo: Omit<Todo, "id">): Promise<Todo> {
	return request<Todo>(`${API_BASE}/todos/`, {
		method: "POST",
		body: todo,
	});
}

export async function updateTodo(id: string, todo: Partial<Omit<Todo, "id">>): Promise<Todo> {
	return request<Todo>(`${API_BASE}/todos/${id}`, {
		method: "PUT",
		body: todo,
	});
}

export async function deleteTodo(id: string): Promise<void> {
	return request<void>(`${API_BASE}/todos/${id}`, {
		method: "DELETE",
	});
}
