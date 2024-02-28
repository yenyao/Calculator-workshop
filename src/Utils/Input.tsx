import { useState } from "react";
import { ErrorCode } from "../Constants/ErrorCodes";
import { OperationSymbol } from "../Constants/OperationSymbols";
import { ToggleSign } from "./Helper";
import {
  ClearInput,
  DeleteInput,
  EqualInput,
  NumberInput,
  OperatorInput,
  RecallMemoryInput,
  ToggleNegativeInput,
} from "./Operations";

export interface CalculateMemory {
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
  let previousOperation = operation;
  let pastEquations = previousEquations;
  let currentIndex = index;

  let calcMemory = {
    equation: equation === "0" ? "" : equation,
    operation: operation,
    previousEquations: previousEquations,
    index: index,
  };

  switch (true) {
    case numberRegex.test(recentInput):
      return NumberInput(calcMemory, recentInput);
    case operatorRegex.test(recentInput) &&
      !operatorRegex.test(previousOperation) &&
      equation !== "0":
      return OperatorInput(calcMemory, recentInput);
    case recentInput === OperationSymbol.ToggleNegative:
      return ToggleNegativeInput(calcMemory);
    case recentInput === OperationSymbol.Clear:
      return ClearInput(calcMemory);
    case recentInput === OperationSymbol.Backspace:
      return DeleteInput(calcMemory);
    case recentInput === OperationSymbol.Equal:
      return EqualInput(calcMemory);
    case recentInput === OperationSymbol.Down ||
      recentInput === OperationSymbol.Up:
      return RecallMemoryInput(calcMemory, recentInput);
    default:
      currentEquation = ErrorCode.InvalidOperation;
      break;
  }

  return {
    equation: currentEquation === "" ? "0" : currentEquation,
    operation: previousOperation,
    previousEquations: pastEquations,
    index: currentIndex,
  };
}
