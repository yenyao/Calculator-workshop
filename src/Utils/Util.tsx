interface CalculateMemory {
  equation: string;
  operation: string;
}

export default function FormatEquation(
  { equation, operation }: CalculateMemory,
  newValue: string
): CalculateMemory {
  const numberRegex = new RegExp(/[0-9.]/); // Numbers and decimal point
  const operatorRegex = new RegExp(/[√+-/x%]/); // Math Operators
  let currentEquation = equation === "0" ? "" : equation;
  let currentOperation = operation;

  switch (true) {
    case numberRegex.test(newValue):
      currentEquation += newValue;
      break;
    case operatorRegex.test(newValue) && currentOperation === "":
      if (equation === "0" && newValue === "-") {
        currentEquation += newValue;
      } else if (equation !== "0") {
        currentEquation += " " + newValue + " ";
        currentOperation += newValue;
      }
      break;
    case newValue === "C":
      currentEquation = "0";
      currentOperation = "";
      break;
    case newValue === "←":
      const lastValue = currentEquation.substring(currentEquation.length - 1);
      if (numberRegex.test(lastValue)) {
        currentEquation = currentEquation.slice(0, -1);
      } else {
        currentEquation = currentEquation.slice(0, -3);
        currentOperation = "";
      }
      break;
    case newValue === "=":
      let splitEquation = currentEquation.split(/[\s,]+/);
      const nums = [parseFloat(splitEquation[0]), parseFloat(splitEquation[2])];
      const op = splitEquation[1];
      currentEquation = Operate(nums, op);
      break;
    default:
      break;
  }

  return {
    equation: currentEquation === "" ? "0" : currentEquation,
    operation: currentOperation,
  };
}

function Operate(numbers: number[], operator: string): string {
  let result = 0;
  switch (operator) {
    case "+":
      result = Math.round((numbers[0] + numbers[1]) * 1e8) / 1e8;
      break;
    case "-":
      result = numbers[0] - numbers[1];
      break;
    case "/":
      result = numbers[0] / numbers[1];
      break;
    case "%":
      result = (numbers[0] / numbers[1]) * 100;
      break;
    case "√":
      result = Math.round(Math.pow(numbers[1], 1 / numbers[0]) * 1e11) / 1e11;
      break;
    case "x":
      result = numbers[0] * numbers[1];
      break;
    default:
      break;
  }
  return result.toString();
}
