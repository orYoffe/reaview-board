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

describe("AdvisorCard", () => {
  test("renders name", async () => {
    const { getByText } = render(<AdvisorCard advisor={advisor} />);
    const name = getByText(advisor.name);

    expect(name).toBeInTheDocument();
  });

  test("renders status", async () => {
    const { getByText } = render(<AdvisorCard advisor={advisor} />);
    const status = getByText("Online", { exact: false });

    expect(status).toBeInTheDocument();
  });

  test("renders reviews count", async () => {
    const { getByText } = render(<AdvisorCard advisor={advisor} />);
    const reviewsCount = getByText(advisor.reviewsCount + "", { exact: false });

    expect(reviewsCount).toBeInTheDocument();
  });

  test("renders languages", async () => {
    const { getByText } = render(<AdvisorCard advisor={advisor} />);
    const languages = getByText(advisor.languages.join(", "), { exact: false });

    expect(languages).toBeInTheDocument();
  });

  test("renders title", async () => {
    const { getByText } = render(<AdvisorCard advisor={advisor} />);
    const title = getByText(`${advisor.name} ${advisor.title}`);

    expect(title).toBeInTheDocument();
  });
});
