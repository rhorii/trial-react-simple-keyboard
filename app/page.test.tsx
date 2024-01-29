import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
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

describe("Keyboard", () => {
  it("push the value if clicked number keys", () => {
    render(<Page />);

    const output = screen.getByRole("textbox");
    const numbers = "1 2 3 4 5 6 7 8 9 0".split(" ");

    numbers.forEach((number, index) => {
      const key = screen.getByText(number);
      fireEvent.click(key);
      expect(output).toHaveValue(numbers.slice(0, index + 1).join(""));
    });
  });

  it("clears one value if clicked the backspace key", () => {
    render(<Page />);

    const output = screen.getByRole("textbox");
    "1 2 3".split(" ").forEach((number) => {
      const key = screen.getByText(number);
      fireEvent.click(key);
    });

    expect(output).toHaveValue("123");

    const backspaceKey = screen.getByText("１もじもどる");
    fireEvent.click(backspaceKey);
    expect(output).toHaveValue("12");
  });

  it("clears all values if cliecked the enter key", () => {
    render(<Page />);

    const output = screen.getByRole("textbox");
    "1 2 3".split(" ").forEach((number) => {
      const key = screen.getByText(number);
      fireEvent.click(key);
    });

    expect(output).toHaveValue("123");

    const enterKey = screen.getByText("こたえあわせ");
    fireEvent.click(enterKey);
    expect(output).toHaveValue("");
  });
});
