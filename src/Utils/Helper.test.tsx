/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { ToggleSign } from "./Helper";

describe("Turn positive number to negative", () => {
  test("Create negative symbol when no equation is present", () => {
    expect(ToggleSign("0", 0)).toEqual("-");
  });

  test("Add negative symbol in front of a single digit number", () => {
    expect(ToggleSign("9", 0)).toEqual("-9");
  });

  test("Add negative symbol in front of a double digit number", () => {
    expect(ToggleSign("99", 0)).toEqual("-99");
  });

  test("Add negative symbol after an operator", () => {
    expect(ToggleSign("99 * ", 5)).toEqual("99 * -");
  });

  test("Add negative symbol in front of the second double digit number", () => {
    expect(ToggleSign("99 * 11", 5)).toEqual("99 * -11");
  });
});

describe("Turn negative number to positive", () => {
  test("Remove negative symbol when equation is just a negative symbol", () => {
    expect(ToggleSign("-", 0)).toEqual("0");
  });

  test("Remove negative symbol in front of a single digit number", () => {
    expect(ToggleSign("-9", 0)).toEqual("9");
  });

  test("Remove negative symbol in front of a double digit number", () => {
    expect(ToggleSign("-99", 0)).toEqual("99");
  });

  test("Remove negative symbol after an operator", () => {
    expect(ToggleSign("99 * -", 5)).toEqual("99 * ");
  });

  test("Remove negative symbol in front of the second double digit number", () => {
    expect(ToggleSign("99 * -11", 5)).toEqual("99 * 11");
  });
});
