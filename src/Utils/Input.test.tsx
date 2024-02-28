/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import FormatEquation from "./Input";
import { OperationSymbol } from "../Constants/Operations";

describe("Button functions", () => {
  describe("Number inputs", () => {
    test("when input is a number and no other buttons have been pressed", () => {
      const expectedResult = {
        equation: "1",
        operation: "",
        previousEquations: [],
        index: 0,
      };

      expect(
        FormatEquation(
          {
            equation: "0",
            operation: "",
            previousEquations: [],
            index: 0,
          },
          "1"
        )
      ).toStrictEqual(expectedResult);
    });

    test("number should append when input is a number and a number already exists", () => {
      const expectedResult = {
        equation: "11",
        operation: "",
        previousEquations: [],
        index: 0,
      };

      expect(
        FormatEquation(
          {
            equation: "1",
            operation: "",
            previousEquations: [],
            index: 0,
          },
          "1"
        )
      ).toStrictEqual(expectedResult);
    });

    test("user should be able to input a negative number", () => {
      const expectedResult = {
        equation: "-",
        operation: "",
        previousEquations: [],
        index: 0,
      };

      expect(
        FormatEquation(
          {
            equation: "0",
            operation: "",
            previousEquations: [],
            index: 0,
          },
          "-"
        )
      ).toStrictEqual(expectedResult);
    });

    test("number should append when input is a number when a number and operator already exists", () => {
      const expectedResult = {
        equation: "9 + 99",
        operation: OperationSymbol.Add,
        previousEquations: [],
        index: 0,
      };

      expect(
        FormatEquation(
          {
            equation: "9 + 9",
            operation: OperationSymbol.Add,
            previousEquations: [],
            index: 0,
          },
          "9"
        )
      ).toStrictEqual(expectedResult);
    });

    test("input should be considered a new number when user just pressed =", () => {
      const expectedResult = {
        equation: "3",
        operation: OperationSymbol.Equal,
        previousEquations: ["9 + 9"],
        index: 0,
      };

      expect(
        FormatEquation(
          {
            equation: "9 + 9",
            operation: OperationSymbol.Equal,
            previousEquations: ["9 + 9"],
            index: 0,
          },
          "3"
        )
      ).toStrictEqual(expectedResult);
    });
  });

  describe("Operator inputs", () => {
    test("should not change when input is an operator and no other buttons have been pressed", () => {
      const expectedResult = {
        equation: "0",
        operation: "",
        previousEquations: [],
        index: 0,
      };

      expect(
        FormatEquation(
          {
            equation: "0",
            operation: "",
            previousEquations: [],
            index: 0,
          },
          OperationSymbol.Add
        )
      ).toStrictEqual(expectedResult);
    });

    test("should append operator when input is an operator and a number button has been pressed", () => {
      const expectedResult = {
        equation: "2 + ",
        operation: OperationSymbol.Add,
        previousEquations: [],
        index: 0,
      };

      expect(
        FormatEquation(
          {
            equation: "2",
            operation: "",
            previousEquations: [],
            index: 0,
          },
          OperationSymbol.Add
        )
      ).toStrictEqual(expectedResult);
    });
  });

  describe("Deleting inputs", () => {
    test("should reset to 0 when C is pressed", () => {
      const expectedResult = {
        equation: "0",
        operation: OperationSymbol.Clear,
        previousEquations: [],
        index: 0,
      };

      expect(
        FormatEquation(
          {
            equation: "2 + 2",
            operation: OperationSymbol.Add,
            previousEquations: [],
            index: 0,
          },
          OperationSymbol.Clear
        )
      ).toStrictEqual(expectedResult);
    });

    test("should remove a number when user presses backspace and a number is the most recent input", () => {
      const expectedResult = {
        equation: "2 + ",
        operation: OperationSymbol.Add,
        previousEquations: [],
        index: 0,
      };

      expect(
        FormatEquation(
          {
            equation: "2 + 2",
            operation: OperationSymbol.Add,
            previousEquations: [],
            index: 0,
          },
          OperationSymbol.Backspace
        )
      ).toStrictEqual(expectedResult);
    });

    test("should remove operator when user presses backspace and an operator is the most recent input", () => {
      const expectedResult = {
        equation: "2",
        operation: "",
        previousEquations: [],
        index: 0,
      };

      expect(
        FormatEquation(
          {
            equation: "2 + ",
            operation: OperationSymbol.Add,
            previousEquations: [],
            index: 0,
          },
          OperationSymbol.Backspace
        )
      ).toStrictEqual(expectedResult);
    });
  });

  describe("Math operations", () => {
    test("should add 2 integer numbers together", () => {
      const expectedResult = {
        equation: "22",
        operation: OperationSymbol.Equal,
        previousEquations: ["2 + 20"],
        index: 0,
      };

      expect(
        FormatEquation(
          {
            equation: "2 + 20",
            operation: OperationSymbol.Add,
            previousEquations: [],
            index: -1,
          },
          OperationSymbol.Equal
        )
      ).toStrictEqual(expectedResult);
    });

    test("should add 2 float numbers together and not have floating point error", () => {
      const expectedResult = {
        equation: "0.3",
        operation: OperationSymbol.Equal,
        previousEquations: ["0.1 + 0.2"],
        index: 0,
      };

      expect(
        FormatEquation(
          {
            equation: "0.1 + 0.2",
            operation: OperationSymbol.Add,
            previousEquations: [],
            index: -1,
          },
          OperationSymbol.Equal
        )
      ).toStrictEqual(expectedResult);
    });

    test("should add a negative and positive numbers together", () => {
      const expectedResult = {
        equation: "1",
        operation: OperationSymbol.Equal,
        previousEquations: ["-2 + 3"],
        index: 0,
      };

      expect(
        FormatEquation(
          {
            equation: "-2 + 3",
            operation: OperationSymbol.Equal,
            previousEquations: [],
            index: -1,
          },
          OperationSymbol.Equal
        )
      ).toStrictEqual(expectedResult);
    });

    test("should subtract 2 numbers numbers from each other", () => {
      const expectedResult = {
        equation: "1",
        operation: OperationSymbol.Equal,
        previousEquations: ["3 - 2"],
        index: 0,
      };

      expect(
        FormatEquation(
          {
            equation: "3 - 2",
            operation: "-",
            previousEquations: [],
            index: -1,
          },
          OperationSymbol.Equal
        )
      ).toStrictEqual(expectedResult);
    });

    test("should divide 2 numbers", () => {
      const expectedResult = {
        equation: "2",
        operation: OperationSymbol.Equal,
        previousEquations: ["4 / 2"],
        index: 0,
      };

      expect(
        FormatEquation(
          {
            equation: "4 / 2",
            operation: OperationSymbol.Divide,
            previousEquations: [],
            index: -1,
          },
          OperationSymbol.Equal
        )
      ).toStrictEqual(expectedResult);
    });

    test("should find the percentage of two numbers", () => {
      const expectedResult = {
        equation: "50",
        operation: OperationSymbol.Equal,
        previousEquations: ["1 % 2"],
        index: 0,
      };

      expect(
        FormatEquation(
          {
            equation: "1 % 2",
            operation: OperationSymbol.Percentage,
            previousEquations: [],
            index: -1,
          },
          OperationSymbol.Equal
        )
      ).toStrictEqual(expectedResult);
    });

    test("should find the cube root of a number", () => {
      const expectedResult = {
        equation: "4",
        operation: OperationSymbol.Equal,
        previousEquations: ["3 √ 64"],
        index: 0,
      };

      expect(
        FormatEquation(
          {
            equation: "3 √ 64",
            operation: OperationSymbol.Divide,
            previousEquations: [],
            index: -1,
          },
          OperationSymbol.Equal
        )
      ).toStrictEqual(expectedResult);
    });

    test("should multiply 2 numbers", () => {
      const expectedResult = {
        equation: "8",
        operation: OperationSymbol.Equal,
        previousEquations: ["2 x 4"],
        index: 0,
      };

      expect(
        FormatEquation(
          {
            equation: "2 x 4",
            operation: OperationSymbol.Multiply,
            previousEquations: [],
            index: -1,
          },
          OperationSymbol.Equal
        )
      ).toStrictEqual(expectedResult);
    });
  });

  describe("Memory Operations", () => {
    test("should clear previous equations from memory", () => {
      const expectedResult = {
        equation: "0",
        operation: OperationSymbol.Clear,
        previousEquations: [],
        index: -1,
      };

      expect(
        FormatEquation(
          {
            equation: "0",
            operation: OperationSymbol.Clear,
            previousEquations: ["2 x 4", "3 / 6"],
            index: -1,
          },
          OperationSymbol.Clear
        )
      ).toStrictEqual(expectedResult);
    });

    test("should recall previous equation", () => {
      const expectedResult = {
        equation: "3 / 6",
        operation: OperationSymbol.Equal,
        previousEquations: ["2 x 4", "3 / 6", "1 % 2"],
        index: 1,
      };

      expect(
        FormatEquation(
          {
            equation: "50",
            operation: OperationSymbol.Equal,
            previousEquations: ["2 x 4", "3 / 6", "1 % 2"],
            index: 2,
          },
          OperationSymbol.Up
        )
      ).toStrictEqual(expectedResult);
    });

    test("should recall next equation in memory", () => {
      const expectedResult = {
        equation: "1 % 2",
        operation: OperationSymbol.Percentage,
        previousEquations: ["2 x 4", "3 / 6", "1 % 2"],
        index: 2,
      };

      expect(
        FormatEquation(
          {
            equation: "0",
            operation: OperationSymbol.Percentage,
            previousEquations: ["2 x 4", "3 / 6", "1 % 2"],
            index: 1,
          },
          OperationSymbol.Down
        )
      ).toStrictEqual(expectedResult);
    });
  });
});
