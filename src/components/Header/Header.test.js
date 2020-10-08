import React from "react";
import Header from "./Header";
import { render } from "../../setupTests";

describe("Header", () => {
  test("renders title", async () => {
    const { getByText } = render(<Header />);

    const headerTitle = getByText("Advisors board");
    expect(headerTitle).toBeInTheDocument();
  });
  test("renders link to another tab", async () => {
    const { getByText } = render(<Header />);

    const link = getByText("Check the code on github");
    expect(link).toBeInTheDocument();

    expect(link.closest("a")).toHaveAttribute(
      "href",
      "https://github.com/orYoffe/review-board"
    );
    expect(link.closest("a")).toHaveAttribute("target", "_blank");
  });
});
