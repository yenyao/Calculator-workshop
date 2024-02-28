function convertToNegative(inputString: string, charIndex: number) {
  return (
    inputString.slice(0, charIndex) +
    "-" +
    inputString.slice(charIndex, inputString.length)
  );
}

function convertToPositive(inputString: string, charIndex: number) {
  return (
    inputString.slice(0, charIndex) +
    inputString.slice(charIndex + 1, inputString.length)
  );
}

export function ToggleSign(currentEquation: string, index: number): string {
  if (currentEquation === "0") return "-";
  if (currentEquation === "-") return "0";

  return currentEquation[index] === "-"
    ? convertToPositive(currentEquation, index)
    : convertToNegative(currentEquation, index);
}
