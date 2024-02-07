import { useState } from "react";
import "./App.css";
import Numpad from "./Components/Numpad/Numpad";
import FormatDisplay from "./Utils/Util";

function App() {
  const [display, setDisplay] = useState({
    equation: "0",
    operation: "",
  });

  const newDisplay = (newDisplayMessage: string) => {
    setDisplay(FormatDisplay(display, newDisplayMessage));
  };

  return (
    <>
      <div className="result-display">{display.equation}</div>
      <Numpad CalcInput={newDisplay} />
    </>
  );
}

export default App;
