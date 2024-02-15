/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import CalcButton from "./CalcButton";

describe("Calculator button", () => {
  const mockHandleClick = jest.fn();

  beforeEach(() => {
    render(<CalcButton symbol={"0"} displayKey={mockHandleClick} />);
  });

  test("renders calculator button with correct symbol", () => {
    expect(screen.getByText(0)).toBeInTheDocument();
  });

  test("mock function should be called once when calculator button is clicked", async () => {
    await userEvent.click(screen.getByText(0));
    expect(mockHandleClick).toHaveBeenCalled();
  });
});
