interface Props {
  symbol: string;
  displayKey: (input: string) => void;
}

function CalcButton({ symbol, displayKey }: Props) {
  return (
    <button className="calc-button" onClick={() => displayKey(symbol)}>
      {symbol}
    </button>
  );
}

export default CalcButton;
