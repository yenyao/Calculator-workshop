import { OperationSymbol } from "../Constants/OperationSymbols";
import { ToggleSign } from "./Helper";
import { CalculateMemory } from "./Input";

const numberRegex = new RegExp(/[0-9.]/); // Numbers and decimal point

export function NumberInput(
  { equation, operation, previousEquations, index }: CalculateMemory,
  recentInput: string
): CalculateMemory {
  if (
    operation === OperationSymbol.Equal ||
    operation === OperationSymbol.Up ||
    operation === OperationSymbol.Down
  ) {
    equation = "";
    index = -1;
  }
  equation += recentInput;

  return {
    equation,
    operation,
    previousEquations,
    index,
  };
}

export function OperatorInput(
  { equation, operation, previousEquations, index }: CalculateMemory,
  recentInput: string
): CalculateMemory {
  equation += " " + recentInput + " ";
  operation = recentInput;
  index = -1;

  return {
    equation,
    operation,
    previousEquations,
    index,
  };
}

export function ToggleNegativeInput({
  equation,
  operation,
  previousEquations,
  index,
}: CalculateMemory): CalculateMemory {
  let i = equation.length - 1;
  while (numberRegex.test(equation[i]) && i > -1) {
    i--;
  }

  equation = ToggleSign(equation, i + 1);

  return {
    equation,
    operation,
    previousEquations,
    index,
  };
}

export function ClearInput({
  equation,
  operation,
  previousEquations,
  index,
}: CalculateMemory): CalculateMemory {
  if (operation === OperationSymbol.Clear) {
    previousEquations = [];
  }
  equation = "0";
  operation = OperationSymbol.Clear;
  return {
    equation,
    operation,
    previousEquations,
    index,
  };
}

export function DeleteInput({
  equation,
  operation,
  previousEquations,
  index,
}: CalculateMemory): CalculateMemory {
  if (equation !== ("" || undefined)) {
    const lastValue = equation.substring(equation.length - 1);
    if (numberRegex.test(lastValue)) {
      equation = equation.slice(0, -1);
    } else {
      equation = equation.slice(0, -3);
      operation = "";
    }
  }
  return {
    equation,
    operation,
    previousEquations,
    index,
  };
}

export function EqualInput({
  equation,
  operation,
  previousEquations,
  index,
}: CalculateMemory): CalculateMemory {
  let splitEquation = equation.split(/[\s,]+/);
  const nums = [parseFloat(splitEquation[0]), parseFloat(splitEquation[2])];
  const op = splitEquation[1];
  previousEquations.unshift(equation);
  operation = OperationSymbol.Equal;
  equation = CalculateEquation(nums, op);
  return {
    equation,
    operation,
    previousEquations,
    index,
  };
}

export function RecallMemoryInput(
  { equation, operation, previousEquations, index }: CalculateMemory,
  recentInput: string
): CalculateMemory {
  if (operation === OperationSymbol.Up || operation === OperationSymbol.Down) {
    if (
      index < previousEquations.length - 1 &&
      recentInput === OperationSymbol.Up
    )
      index++;
    if (index > -1 && recentInput === OperationSymbol.Down) index--;
  } else {
    index =
      recentInput === OperationSymbol.Down ? previousEquations.length - 1 : 0;
  }

  if (recentInput === OperationSymbol.Down) {
    equation = index > -1 ? previousEquations[index] : equation;
    operation = OperationSymbol.Down;
  } else {
    equation =
      index < previousEquations.length ? previousEquations[index] : equation;
    operation = OperationSymbol.Up;
  }
  return {
    equation,
    operation,
    previousEquations,
    index,
  };
}

function CalculateEquation(numbers: number[], operator: string): string {
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
