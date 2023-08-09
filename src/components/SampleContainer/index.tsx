import React from "react";
import Draggable, { SaveDataProps } from "../../lib/Draggable";
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
      <Draggable id="drag1" x={100} y={100} saveData={saveData}>
        <Sample name="sample1" backgroundColor="#fff7a5" />
      </Draggable>
      <Draggable id="drag2" x={220} y={150} opacity={0.7} isBtnChanger={false}>
        <Sample
          name="sample2-no btn"
          width="200px"
          opacity={0.7}
          backgroundColor="#f6c7d3"
        />
      </Draggable>
      <Draggable id="drag3" x={200} y={200} opacity={0.4}>
        <Sample name="sample3" width="200px" height="200px" opacity={0.4} />
      </Draggable>
    </div>
  );
}

export default React.memo(SampleContainer);
