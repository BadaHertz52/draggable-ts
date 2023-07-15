import React, { useRef } from "react";
import Draggable from "./lib/Draggable";

function App() {
  const onMove = (x: number, y: number) => {};
  return (
    <div className="App">
      <Draggable x={0} y={0}>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "#fec9b7",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>sample</div>
        </div>
      </Draggable>
    </div>
  );
}

export default App;
