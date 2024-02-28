import CalcButton from "../CalcButton/CalcButton";

interface Props {
  CalcInput: (input: string) => void;
}

function Numpad({ CalcInput }: Props) {
  const getKeyPressed = (key: string) => {
    CalcInput(key);
  };
  return (
    <div className="wrapper">
      <div className="calc-buttons">
        <div className="calc-buttons-row">
          <CalcButton displayKey={getKeyPressed} symbol="C" />
          <CalcButton displayKey={getKeyPressed} symbol="&larr;" />
          <CalcButton displayKey={getKeyPressed} symbol="&radic;" />
          <CalcButton displayKey={getKeyPressed} symbol="%" />
        </div>
        <div className="calc-buttons-row">
          <CalcButton displayKey={getKeyPressed} symbol="7" />
          <CalcButton displayKey={getKeyPressed} symbol="8" />
          <CalcButton displayKey={getKeyPressed} symbol="9" />
          <CalcButton displayKey={getKeyPressed} symbol="+" />
        </div>
        <div className="calc-buttons-row">
          <CalcButton displayKey={getKeyPressed} symbol="4" />
          <CalcButton displayKey={getKeyPressed} symbol="5" />
          <CalcButton displayKey={getKeyPressed} symbol="6" />
          <CalcButton displayKey={getKeyPressed} symbol="-" />
        </div>
        <div className="calc-buttons-row">
          <CalcButton displayKey={getKeyPressed} symbol="1" />
          <CalcButton displayKey={getKeyPressed} symbol="2" />
          <CalcButton displayKey={getKeyPressed} symbol="3" />
          <CalcButton displayKey={getKeyPressed} symbol="x" />
        </div>
        <div className="calc-buttons-row">
          <CalcButton displayKey={getKeyPressed} symbol="." />
          <CalcButton displayKey={getKeyPressed} symbol="0" />
          <CalcButton displayKey={getKeyPressed} symbol="=" />
          <CalcButton displayKey={getKeyPressed} symbol="/" />
          <CalcButton displayKey={getKeyPressed} symbol="±" />
        </div>
      </div>
    </div>
  );
}

export default Numpad;
