import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Todo } from "../../types/todo";
import TodoEditor from "../TodoEditor";

describe("TodoEditor", () => {
	const mockTodo: Todo = {
		id: "1",
		title: "Test Todo",
		description: "Test Description",
		done: false,
	};

	const mockHandlers = {
		onSave: vi.fn(),
		onCancel: vi.fn(),
	};

	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("renders empty form in create mode", () => {
		render(<TodoEditor {...mockHandlers} />);

		expect(screen.getByTestId("title-input")).toHaveValue("");
		expect(screen.getByTestId("description-input")).toHaveValue("");
		expect(screen.getByTestId("done-checkbox")).not.toBeChecked();
	});

	it("renders prefilled form in edit mode", () => {
		render(<TodoEditor todo={mockTodo} {...mockHandlers} />);

		expect(screen.getByTestId("title-input")).toHaveValue(mockTodo.title);
		expect(screen.getByTestId("description-input")).toHaveValue(mockTodo.description);
		expect(screen.getByTestId("done-checkbox")).not.toBeChecked();
	});

	it("calls onCancel when cancel button is clicked", async () => {
		const user = userEvent.setup();
		render(<TodoEditor {...mockHandlers} />);

		await user.click(screen.getByTestId("cancel-button"));

		expect(mockHandlers.onCancel).toHaveBeenCalled();
	});

	it("disables save button when title is empty", async () => {
		render(<TodoEditor {...mockHandlers} />);

		expect(screen.getByTestId("save-button")).toBeDisabled();
	});

	it("enables save button when title is filled", async () => {
		const user = userEvent.setup();
		render(<TodoEditor {...mockHandlers} />);

		await user.type(screen.getByTestId("title-input"), "New Todo");

		expect(screen.getByTestId("save-button")).not.toBeDisabled();
	});

	it("calls onSave with form values when save button is clicked", async () => {
		const user = userEvent.setup();
		render(<TodoEditor {...mockHandlers} />);

		await user.type(screen.getByTestId("title-input"), "New Todo");
		await user.type(screen.getByTestId("description-input"), "New Description");
		await user.click(screen.getByTestId("done-checkbox"));
		await user.click(screen.getByTestId("save-button"));

		expect(mockHandlers.onSave).toHaveBeenCalledWith({
			title: "New Todo",
			description: "New Description",
			done: true,
		});
	});

	it("does not submit form when title is empty", async () => {
		const user = userEvent.setup();
		render(<TodoEditor {...mockHandlers} />);

		await user.type(screen.getByTestId("description-input"), "New Description");
		await user.click(screen.getByTestId("save-button"));

		expect(mockHandlers.onSave).not.toHaveBeenCalled();
	});
});
