import React from "react";
import Draggable, { SaveDataProps } from "../../lib/components/Draggable";
import Sample from "../Sample";

function SampleContainer() {
  const saveData = (props: SaveDataProps) => {
    console.log(
      "id:",
      props.id,
      "x:",
      props.x,
      "y:",
      props.y,
      "zIndex",
      props.zIndex
    );
  };
  return (
    <div className="sample-container">
      <Draggable id="drag1" x={0} y={0} saveData={saveData}>
        <Sample name="sample1" backgroundColor="#fff7a5" />
      </Draggable>
      <Draggable id="drag2" x={110} y={0} opacity={0.7}>
        <Sample name="sample2" opacity={0.7} backgroundColor="#f6c7d3" />
      </Draggable>
      <Draggable id="drag3" x={230} y={0} opacity={0.4}>
        <Sample name="sample3" opacity={0.4} />
      </Draggable>
    </div>
  );
}

export default React.memo(SampleContainer);
