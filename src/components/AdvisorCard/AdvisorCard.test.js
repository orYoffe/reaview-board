import React from "react";
import AdvisorCard from "./AdvisorCard";
import { render } from "../../setupTests";

const advisor = {
  id: 1,
  name: "John",
  reviewsCount: 5012,
  avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/pierre_nel/128.jpg",
  title: "Nostrum itaque aut esse ut molestiae quod.",
  status: "online",
  languages: ["English", "German"],
};

const renderAndGetByText = (text, options) => {
  const { getByText } = render(<AdvisorCard advisor={advisor} />);
  return getByText(text, options);
};

describe("AdvisorCard", () => {
  describe("should display the advisor's", () => {
    test("name", () => {
      expect(renderAndGetByText(advisor.name)).toBeInTheDocument();
    });

    test("status", () => {
      expect(
        renderAndGetByText("Online", { exact: false })
      ).toBeInTheDocument();
    });

    test("reviews count", () => {
      expect(
        renderAndGetByText(advisor.reviewsCount + "", { exact: false })
      ).toBeInTheDocument();
    });

    test("languages", () => {
      expect(
        renderAndGetByText(advisor.languages.join(", "), { exact: false })
      ).toBeInTheDocument();
    });

    test("title", () => {
      renderAndGetByText(`${advisor.name} ${advisor.title}`);
    });
  });
});
