import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "./page";

it("renders correctly", () => {
  const { container } = render(<Page />);

  expect(container).toMatchSnapshot();
});

it("renders all headings", () => {
  render(<Page />);

  const headings = screen.getAllByRole("heading");

  expect(headings).toHaveLength(4);
  for (const heading of headings) {
    expect(heading).toBeInTheDocument();
  }
});
