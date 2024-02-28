import { OperationSymbol } from "../Constants/Operations";

interface CalculateMemory {
  equation: string;
  operation: string;
  previousEquations: string[];
  index: number;
}

export default function FormatEquation(
  { equation, operation, previousEquations, index }: CalculateMemory,
  recentInput: string
): CalculateMemory {
  const numberRegex = new RegExp(/[0-9.]/); // Numbers and decimal point
  const operatorRegex = new RegExp(/[√+-/x%]/); // Math Operators
  let currentEquation = equation === "0" ? "" : equation;
  let currentOperation = operation;
  let pastEquations = previousEquations;
  let currentIndex = index;

  switch (true) {
    case numberRegex.test(recentInput):
      if (currentOperation === OperationSymbol.Equal) {
        currentEquation = "";
      }
      currentEquation += recentInput;
      break;
    case operatorRegex.test(recentInput) &&
      !operatorRegex.test(currentOperation):
      if (equation === "0" && recentInput === OperationSymbol.Subtract) {
        currentEquation += recentInput;
      } else if (equation !== "0") {
        currentEquation += " " + recentInput + " ";
        currentOperation += recentInput;
      }
      break;
    case recentInput === OperationSymbol.Clear:
      if (currentOperation === OperationSymbol.Clear) {
        pastEquations = [];
      }
      currentEquation = "0";
      currentOperation = OperationSymbol.Clear;
      console.log(pastEquations);
      break;
    case recentInput === OperationSymbol.Backspace:
      if (currentEquation !== ("" || undefined)) {
        const lastValue = currentEquation.substring(currentEquation.length - 1);
        if (numberRegex.test(lastValue)) {
          currentEquation = currentEquation.slice(0, -1);
        } else {
          currentEquation = currentEquation.slice(0, -3);
          currentOperation = "";
        }
      }
      break;
    case recentInput === OperationSymbol.Equal:
      let splitEquation = currentEquation.split(/[\s,]+/);
      const nums = [parseFloat(splitEquation[0]), parseFloat(splitEquation[2])];
      const op = splitEquation[1];
      pastEquations.unshift(currentEquation);
      currentOperation = OperationSymbol.Equal;
      currentEquation = Operate(nums, op);
      console.log(pastEquations);
      break;
    case recentInput === OperationSymbol.Down:
      if (
        currentOperation === OperationSymbol.Up ||
        currentOperation === OperationSymbol.Down
      ) {
        if (currentIndex > -1) currentIndex--;
      } else {
        currentIndex = previousEquations.length - 1;
      }
      currentEquation =
        currentIndex > -1 ? previousEquations[currentIndex] : currentEquation;
      currentOperation = OperationSymbol.Down;
      break;
    case recentInput === OperationSymbol.Up:
      if (
        currentOperation === OperationSymbol.Up ||
        currentOperation === OperationSymbol.Down
      ) {
        if (currentIndex < previousEquations.length - 1) currentIndex++;
      } else {
        currentIndex = 0;
      }

      currentEquation =
        currentIndex < previousEquations.length
          ? previousEquations[currentIndex]
          : currentEquation;
      currentOperation = OperationSymbol.Up;
      break;
    default:
      break;
  }

  return {
    equation: currentEquation === "" ? "0" : currentEquation,
    operation: currentOperation,
    previousEquations: pastEquations,
    index: currentIndex,
  };
}

function Operate(numbers: number[], operator: string): string {
  let result = 0;
  switch (operator) {
    case OperationSymbol.Add:
      result = Math.round((numbers[0] + numbers[1]) * 1e8) / 1e8;
      break;
    case OperationSymbol.Subtract:
      result = numbers[0] - numbers[1];
      break;
    case OperationSymbol.Divide:
      result = numbers[0] / numbers[1];
      break;
    case OperationSymbol.Percentage:
      result = (numbers[0] / numbers[1]) * 100;
      break;
    case OperationSymbol.Root:
      result = Math.round(Math.pow(numbers[1], 1 / numbers[0]) * 1e11) / 1e11;
      break;
    case OperationSymbol.Multiply:
      result = numbers[0] * numbers[1];
      break;
    default:
      break;
  }
  return result.toString();
}
