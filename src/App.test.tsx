/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("renders screen display and numpad", () => {
  render(<App />);
  expect(screen.getAllByText(0)[0]).toBeInTheDocument();
  expect(screen.getAllByText(0)[1]).toBeInTheDocument();
  expect(screen.getByText(1)).toBeInTheDocument();
  expect(screen.getByText(2)).toBeInTheDocument();
  expect(screen.getByText(3)).toBeInTheDocument();
  expect(screen.getByText(4)).toBeInTheDocument();
  expect(screen.getByText(5)).toBeInTheDocument();
  expect(screen.getByText(6)).toBeInTheDocument();
  expect(screen.getByText(7)).toBeInTheDocument();
  expect(screen.getByText(8)).toBeInTheDocument();
  expect(screen.getByText(9)).toBeInTheDocument();
  expect(screen.getByText("+")).toBeInTheDocument();
  expect(screen.getByText("-")).toBeInTheDocument();
  expect(screen.getByText("=")).toBeInTheDocument();
  expect(screen.getByText("/")).toBeInTheDocument();
  expect(screen.getByText("x")).toBeInTheDocument();
  expect(screen.getByText("√")).toBeInTheDocument();
  expect(screen.getByText("←")).toBeInTheDocument();
  expect(screen.getByText("%")).toBeInTheDocument();
  expect(screen.getByText("C")).toBeInTheDocument();
  expect(screen.getByText(".")).toBeInTheDocument();
});
