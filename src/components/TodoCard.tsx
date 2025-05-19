import type { Todo } from "../types/todo";

type TodoCardProps = {
	todo: Todo;
	onToggleDone: (id: string, done: boolean) => void;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
};

export default function TodoCard({ todo, onToggleDone, onEdit, onDelete }: TodoCardProps) {
	const { id, title, description, done } = todo;

	return (
		<div className="border rounded-lg p-4 mb-4 shadow-sm bg-white" data-testid={`todo-${id}`}>
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-3">
					<input
						type="checkbox"
						checked={done}
						onChange={() => onToggleDone(id, !done)}
						className="mt-1"
						data-testid={`todo-checkbox-${id}`}
					/>
					<div>
						<h3 className={`font-medium ${done ? "line-through text-gray-500" : ""}`}>{title}</h3>
						{description && <p className={`text-sm mt-1 ${done ? "text-gray-400" : "text-gray-600"}`}>{description}</p>}
					</div>
				</div>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={() => onEdit(id)}
						className="text-blue-500 hover:text-blue-700"
						aria-label="Edit"
						data-testid={`edit-button-${id}`}
					>
						✏️
					</button>
					<button
						type="button"
						onClick={() => onDelete(id)}
						className="text-red-500 hover:text-red-700"
						aria-label="Delete"
						data-testid={`delete-button-${id}`}
					>
						🗑️
					</button>
				</div>
			</div>
		</div>
	);
}
