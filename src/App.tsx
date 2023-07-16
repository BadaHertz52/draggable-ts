import Sample from "./components/Sample";
import Draggable, { SaveDataProps } from "./lib/components/Draggable";

function App() {
  const saveData = (props: SaveDataProps) => {
    console.log("save data", props.x, props.y);
  };
  return (
    <div className="App">
      <Draggable id="drag1" x={0} y={0} saveData={saveData}>
        <Sample name="sample1" backgroundColor="#fff7a5" />
      </Draggable>
      <Draggable id="drag2" x={0} y={110} opacity={0.7}>
        <Sample name="sample2" opacity={0.7} backgroundColor="#f6c7d3" />
      </Draggable>
      <Draggable id="drag3" x={0} y={110} opacity={0.4}>
        <Sample name="sample3" opacity={0.4} />
      </Draggable>
    </div>
  );
}

export default App;
