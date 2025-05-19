import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Todo } from "../../types/todo";
import TodoCard from "../TodoCard";

describe("TodoCard", () => {
	const mockTodo: Todo = {
		id: "1",
		title: "Test Todo",
		description: "Test Description",
		done: false,
	};

	const mockHandlers = {
		onToggleDone: vi.fn(),
		onEdit: vi.fn(),
		onDelete: vi.fn(),
	};

	it("renders todo data correctly", () => {
		render(<TodoCard todo={mockTodo} {...mockHandlers} />);

		expect(screen.getByText("Test Todo")).toBeInTheDocument();
		expect(screen.getByText("Test Description")).toBeInTheDocument();
		expect(screen.getByTestId(`todo-checkbox-${mockTodo.id}`)).not.toBeChecked();
	});

	it("renders todo with done status", () => {
		const doneTodo = { ...mockTodo, done: true };
		render(<TodoCard todo={doneTodo} {...mockHandlers} />);

		expect(screen.getByTestId(`todo-checkbox-${mockTodo.id}`)).toBeChecked();
		expect(screen.getByText("Test Todo")).toHaveClass("line-through");
	});

	it("calls onToggleDone when checkbox is clicked", async () => {
		const user = userEvent.setup();
		render(<TodoCard todo={mockTodo} {...mockHandlers} />);

		await user.click(screen.getByTestId(`todo-checkbox-${mockTodo.id}`));

		expect(mockHandlers.onToggleDone).toHaveBeenCalledWith(mockTodo.id, true);
	});

	it("calls onEdit when edit button is clicked", async () => {
		const user = userEvent.setup();
		render(<TodoCard todo={mockTodo} {...mockHandlers} />);

		await user.click(screen.getByTestId(`edit-button-${mockTodo.id}`));

		expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockTodo.id);
	});

	it("calls onDelete when delete button is clicked", async () => {
		const user = userEvent.setup();
		render(<TodoCard todo={mockTodo} {...mockHandlers} />);

		await user.click(screen.getByTestId(`delete-button-${mockTodo.id}`));

		expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockTodo.id);
	});
});
