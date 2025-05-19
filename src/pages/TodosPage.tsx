import { useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../api/services/todos";
import Skeleton from "../components/Skeleton";
import TodoCard from "../components/TodoCard";
import TodoEditor from "../components/TodoEditor";
import type { Todo } from "../types/todo";

export default function TodosPage() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [isCreating, setIsCreating] = useState(false);

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await getTodos();
			// Sort by newest first (assuming newer items have higher IDs)
			setTodos(data.sort((a, b) => b.id.localeCompare(a.id)));
		} catch (err) {
			setError("Failed to load todos. Please try again.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const handleCreateTodo = async (newTodo: Omit<Todo, "id">) => {
		try {
			// Optimistic update
			const tempId = `temp-${Date.now()}`;
			const tempTodo = { id: tempId, ...newTodo };

			setTodos((prev) => [tempTodo, ...prev]);
			setIsCreating(false);

			// Actual API call
			const createdTodo = await createTodo(newTodo);

			// Replace temp todo with actual one
			setTodos((prev) => prev.map((todo) => (todo.id === tempId ? createdTodo : todo)));
		} catch (err) {
			// Rollback on error
			setTodos((prev) => prev.filter((todo) => !todo.id.startsWith("temp-")));
			setError("Failed to create todo. Please try again.");
			console.error(err);
		}
	};

	const handleUpdateTodo = async (id: string, updates: Partial<Omit<Todo, "id">>) => {
		try {
			// Save original for potential rollback
			const originalTodo = todos.find((todo) => todo.id === id);
			if (!originalTodo) return;

			// Optimistic update
			setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)));
			setEditingId(null);

			// Actual API call
			await updateTodo(id, updates);
		} catch (err) {
			// Rollback on error
			const originalTodo = todos.find((todo) => todo.id === id);
			if (originalTodo) {
				setTodos((prev) => prev.map((todo) => (todo.id === id ? originalTodo : todo)));
			}
			setError("Failed to update todo. Please try again.");
			console.error(err);
		}
	};

	const handleToggleDone = async (id: string, done: boolean) => {
		try {
			// Find original for potential rollback
			const originalTodo = todos.find((todo) => todo.id === id);
			if (!originalTodo) return;

			// Optimistic update
			setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done } : todo)));

			// Actual API call
			await updateTodo(id, { done });
		} catch (err) {
			// Rollback on error
			setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !done } : todo)));
			setError("Failed to update todo status. Please try again.");
			console.error(err);
		}
	};

	const handleDeleteTodo = async (id: string) => {
		try {
			// Store for potential rollback
			const deletedTodo = todos.find((todo) => todo.id === id);
			const deletedTodoIndex = todos.findIndex((todo) => todo.id === id);

			if (!deletedTodo) return;

			// Optimistic update
			setTodos((prev) => prev.filter((todo) => todo.id !== id));

			// Actual API call
			await deleteTodo(id);
		} catch (err) {
			// Rollback on error
			const deletedTodo = todos.find((todo) => todo.id === id);
			const deletedTodoIndex = todos.findIndex((todo) => todo.id === id);

			if (deletedTodo && deletedTodoIndex !== -1) {
				setTodos((prev) => {
					const newTodos = [...prev];
					newTodos.splice(deletedTodoIndex, 0, deletedTodo);
					return newTodos;
				});
			}
			setError("Failed to delete todo. Please try again.");
			console.error(err);
		}
	};

	return (
		<div className="container mx-auto px-4 py-8 max-w-2xl">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Todos</h1>
				{!isCreating && (
					<button
						type="button"
						onClick={() => setIsCreating(true)}
						className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
						data-testid="create-button"
					>
						➕ Add Todo
					</button>
				)}
			</div>

			{error && (
				<div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md" role="alert">
					{error}
				</div>
			)}

			{isCreating && <TodoEditor onSave={handleCreateTodo} onCancel={() => setIsCreating(false)} />}

			{loading ? (
				<Skeleton rows={3} />
			) : todos.length === 0 ? (
				<div className="text-center py-8 text-gray-500" data-testid="empty-state">
					No todos yet. Click ➕ to add one.
				</div>
			) : (
				<div data-testid="todo-list">
					{todos.map((todo) =>
						editingId === todo.id ? (
							<TodoEditor
								key={todo.id}
								todo={todo}
								onSave={(updates) => handleUpdateTodo(todo.id, updates)}
								onCancel={() => setEditingId(null)}
							/>
						) : (
							<TodoCard
								key={todo.id}
								todo={todo}
								onToggleDone={handleToggleDone}
								onEdit={(id) => setEditingId(id)}
								onDelete={handleDeleteTodo}
							/>
						),
					)}
				</div>
			)}
		</div>
	);
}
