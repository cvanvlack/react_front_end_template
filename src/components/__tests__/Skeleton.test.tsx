import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Skeleton from "../Skeleton";

describe("Skeleton", () => {
	it("renders with default props", () => {
		render(<Skeleton />);

		const skeleton = screen.getByTestId("loading-skeleton");
		expect(skeleton).toBeInTheDocument();

		// Default is 3 rows
		const skeletonItems = skeleton.querySelectorAll(".flex.flex-col");
		expect(skeletonItems.length).toBe(3);
	});

	it("renders with custom number of rows", () => {
		render(<Skeleton rows={5} />);

		const skeletonItems = screen.getByTestId("loading-skeleton").querySelectorAll(".flex.flex-col");
		expect(skeletonItems.length).toBe(5);
	});

	it("applies custom className", () => {
		render(<Skeleton className="custom-class" />);

		const skeleton = screen.getByTestId("loading-skeleton");
		expect(skeleton).toHaveClass("custom-class");
	});
});
