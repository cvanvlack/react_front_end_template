import { useState } from "react";
import type { Todo } from "../types/todo";

type TodoEditorProps = {
	todo?: Todo;
	onSave: (todo: Omit<Todo, "id">) => void;
	onCancel: () => void;
};

export default function TodoEditor({ todo, onSave, onCancel }: TodoEditorProps) {
	const [title, setTitle] = useState(todo?.title || "");
	const [description, setDescription] = useState(todo?.description || "");
	const [done, setDone] = useState(todo?.done || false);

	const [errors, setErrors] = useState<Record<string, string>>({});

	const isValid = () => {
		const newErrors: Record<string, string> = {};

		if (!title.trim()) {
			newErrors.title = "Title is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (isValid()) {
			onSave({ title, description, done });
		}
	};

	return (
		<form onSubmit={handleSubmit} className="border rounded-lg p-4 mb-4 shadow-sm bg-white" data-testid="todo-editor">
			<div className="mb-3">
				<label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
					Title
				</label>
				<input
					id="title"
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className={`w-full p-2 border rounded ${errors.title ? "border-red-500" : "border-gray-300"}`}
					placeholder="Enter todo title"
					aria-invalid={!!errors.title}
					data-testid="title-input"
				/>
				{errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
			</div>

			<div className="mb-3">
				<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
					Description (optional)
				</label>
				<textarea
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded"
					placeholder="Enter todo description"
					rows={3}
					data-testid="description-input"
				/>
			</div>

			<div className="mb-4">
				<label className="flex items-center">
					<input
						type="checkbox"
						checked={done}
						onChange={(e) => setDone(e.target.checked)}
						className="mr-2"
						data-testid="done-checkbox"
					/>
					<span className="text-sm text-gray-700">Mark as done</span>
				</label>
			</div>

			<div className="flex justify-end gap-2">
				<button
					type="button"
					onClick={onCancel}
					className="px-4 py-2 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
					data-testid="cancel-button"
				>
					Cancel
				</button>
				<button
					type="submit"
					className={`px-4 py-2 rounded shadow-sm text-sm font-medium text-white ${
						!title.trim() ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
					}`}
					disabled={!title.trim()}
					data-testid="save-button"
				>
					Save
				</button>
			</div>
		</form>
	);
}
