import React from "react";
import Header from "./Header";
import { render } from "../../setupTests";

const renderAndGetByText = (text) => {
  const { getByText } = render(<Header />);
  return getByText(text);
};

describe("Header", () => {
  describe("should display ", () => {
    test("title", () => {
      expect(renderAndGetByText("Advisors board")).toBeInTheDocument();
    });

    test("link to another tab", () => {
      const link = renderAndGetByText("Check the code on github");
      expect(link).toBeInTheDocument();
      const anchorTag = link.closest("a");

      expect(anchorTag).toHaveAttribute(
        "href",
        "https://github.com/orYoffe/review-board"
      );
      expect(anchorTag).toHaveAttribute("target", "_blank");
    });
  });
});
