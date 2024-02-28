import { useState } from "react";
import "./App.css";
import Numpad from "./Components/Numpad/Numpad";
import FormatDisplay from "./Utils/Input";
import { OperationSymbol } from "./Constants/OperationSymbols";

function App() {
  const [display, setDisplay] = useState({
    equation: "0",
    operation: "",
    previousEquations: [] as string[],
    index: -1,
  });

  const newDisplay = (recentInput: string) => {
    setDisplay(FormatDisplay(display, recentInput));
  };

  return (
    <>
      <div className="result-display">{display.equation}</div>
      <div className="memory-button-wrapper">
        <div className="mem-buttons-row">
          <button className="memory-button" onClick={() => newDisplay(OperationSymbol.Up)}>{"↑"}</button>
          <button className="memory-button" onClick={() => newDisplay(OperationSymbol.Down)}>{"↓"}</button>
        </div>
      </div>
      <Numpad CalcInput={newDisplay} />
    </>
  );
}

export default App;
