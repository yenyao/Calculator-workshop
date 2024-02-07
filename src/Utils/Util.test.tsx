/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import FormatEquation from "./Util";

describe("Button functions", () => {
  describe("Number inputs", () => {
    test("when input is a number and no other buttons have been pressed", () => {
      const expectedResult = {
        equation: "1",
        operation: "",
      };

      expect(
        FormatEquation(
          {
            equation: "0",
            operation: "",
          },
          "1"
        )
      ).toStrictEqual(expectedResult);
    });

    test("number should append when input is a number and a number already exists", () => {
      const expectedResult = {
        equation: "11",
        operation: "",
      };

      expect(
        FormatEquation(
          {
            equation: "1",
            operation: "",
          },
          "1"
        )
      ).toStrictEqual(expectedResult);
    });

    test("user should be able to input a negative number", () => {
      const expectedResult = {
        equation: "-",
        operation: "",
      };

      expect(
        FormatEquation(
          {
            equation: "0",
            operation: "",
          },
          "-"
        )
      ).toStrictEqual(expectedResult);
    });

    test("number should append when input is a number when a number and operator already exists", () => {
      const expectedResult = {
        equation: "9 + 99",
        operation: "+",
      };

      expect(
        FormatEquation(
          {
            equation: "9 + 9",
            operation: "+",
          },
          "9"
        )
      ).toStrictEqual(expectedResult);
    });
  });

  describe("Operator inputs", () => {
    test("should not change when input is an operator and no other buttons have been pressed", () => {
      const expectedResult = {
        equation: "0",
        operation: "",
      };

      expect(
        FormatEquation(
          {
            equation: "0",
            operation: "",
          },
          "+"
        )
      ).toStrictEqual(expectedResult);
    });

    test("should append operator when input is an operator and a number button has been pressed", () => {
      const expectedResult = {
        equation: "2 + ",
        operation: "+",
      };

      expect(
        FormatEquation(
          {
            equation: "2",
            operation: "",
          },
          "+"
        )
      ).toStrictEqual(expectedResult);
    });
  });

  describe("Deleting inputs", () => {
    test("should reset to 0 when C is pressed", () => {
      const expectedResult = {
        equation: "0",
        operation: "",
      };

      expect(
        FormatEquation(
          {
            equation: "2 + 2",
            operation: "+",
          },
          "C"
        )
      ).toStrictEqual(expectedResult);
    });

    test("should remove a number when user presses backspace and a number is the most recent input", () => {
      const expectedResult = {
        equation: "2 + ",
        operation: "+",
      };

      expect(
        FormatEquation(
          {
            equation: "2 + 2",
            operation: "+",
          },
          "←"
        )
      ).toStrictEqual(expectedResult);
    });

    test("should remove operator when user presses backspace and an operator is the most recent input", () => {
      const expectedResult = {
        equation: "2",
        operation: "",
      };

      expect(
        FormatEquation(
          {
            equation: "2 + ",
            operation: "+",
          },
          "←"
        )
      ).toStrictEqual(expectedResult);
    });
  });
  describe("Math operations", () => {
    test("should add 2 integer numbers together", () => {
      const expectedResult = {
        equation: "22",
        operation: "+",
      };

      expect(
        FormatEquation(
          {
            equation: "2 + 20",
            operation: "+",
          },
          "="
        )
      ).toStrictEqual(expectedResult);
    });

    test("should add 2 float numbers together and not have floating point error", () => {
      const expectedResult = {
        equation: "0.3",
        operation: "+",
      };

      expect(
        FormatEquation(
          {
            equation: "0.1 + 0.2",
            operation: "+",
          },
          "="
        )
      ).toStrictEqual(expectedResult);
    });
    test("should add a negative and positive numbers together", () => {
      const expectedResult = {
        equation: "1",
        operation: "+",
      };

      expect(
        FormatEquation(
          {
            equation: "-2 + 3",
            operation: "+",
          },
          "="
        )
      ).toStrictEqual(expectedResult);
    });
    test("should subtract 2 numbers numbers from each other", () => {
      const expectedResult = {
        equation: "1",
        operation: "-",
      };

      expect(
        FormatEquation(
          {
            equation: "3 - 2",
            operation: "-",
          },
          "="
        )
      ).toStrictEqual(expectedResult);
    });
    test("should divide 2 numbers", () => {
      const expectedResult = {
        equation: "2",
        operation: "/",
      };

      expect(
        FormatEquation(
          {
            equation: "4 / 2",
            operation: "/",
          },
          "="
        )
      ).toStrictEqual(expectedResult);
    });
    test("should find the percentage of two numbers", () => {
      const expectedResult = {
        equation: "50",
        operation: "%",
      };

      expect(
        FormatEquation(
          {
            equation: "1 % 2",
            operation: "%",
          },
          "="
        )
      ).toStrictEqual(expectedResult);
    });

    test("should find the cube root of a number", () => {
      const expectedResult = {
        equation: "4",
        operation: "√",
      };

      expect(
        FormatEquation(
          {
            equation: "3 √ 64",
            operation: "√",
          },
          "="
        )
      ).toStrictEqual(expectedResult);
    });
    test("should multiply 2 numbers", () => {
      const expectedResult = {
        equation: "8",
        operation: "x",
      };

      expect(
        FormatEquation(
          {
            equation: "2 x 4",
            operation: "x",
          },
          "="
        )
      ).toStrictEqual(expectedResult);
    });
  });
});
