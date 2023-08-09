import React, { CSSProperties, MouseEvent, useRef, useState } from "react";
import Draggable, { SaveDataProps } from "../../lib/Draggable";
import Sample from "../Sample";
import "./style.scss";
function SampleContainer() {
  type Direaction = "row" | "column";
  const [showOther, setShowOther] = useState<boolean>(false);
  const [direaction, setDireaction] = useState<Direaction>("row");
  const otherStyle: CSSProperties = {
    display: showOther ? "flex" : "none",
    width: direaction === "row" ? "30%" : "100vw",
    height: direaction === "row" ? "100vh" : "100px",
  };
  const draggableGroupRef = useRef<HTMLDivElement>(null);
  const dropDownMenuRef = useRef<HTMLUListElement>(null);
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

  const handleClickToggleBtn = () => {
    if (dropDownMenuRef.current) {
      dropDownMenuRef.current.classList.toggle("on");
    }
  };
  const handleClickBtn = (event: MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.name;
    dropDownMenuRef.current?.classList.toggle("on");
    switch (name) {
      case "btn-row":
        setDireaction("row");
        break;
      case "btn-column":
        setDireaction("column");
        break;
      case "btn-show":
        setShowOther(true);
        break;
      case "btn-hide":
        setShowOther(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="sample-container">
      <div className="top">
        <h2>Draggable-ts</h2>
        <div className="dropdown">
          <button
            className="dropdown-toggle"
            title="drop down menu"
            onClick={handleClickToggleBtn}
          >
            🔽
          </button>
          <div className="inner">
            <ul className="dropdown-menu" ref={dropDownMenuRef}>
              <li>
                <h5>other : </h5>
                <button
                  className={`btn ${showOther ? "on" : ""}`}
                  name="btn-show"
                  onClick={handleClickBtn}
                >
                  show
                </button>
                <button
                  className={`btn ${!showOther ? "on" : ""}`}
                  name="btn-hide"
                  onClick={handleClickBtn}
                >
                  hide
                </button>
              </li>
              <li>
                <h5>direction : </h5>
                <div className="btn-gruop">
                  <button
                    className={`btn ${direaction === "row" ? "on" : ""}`}
                    name="btn-row"
                    onClick={handleClickBtn}
                  >
                    row
                  </button>
                  <button
                    className={`btn ${direaction === "column" ? "on" : ""}`}
                    name="btn-column"
                    onClick={handleClickBtn}
                  >
                    column
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="sample-container__main"
        style={{ display: "flex", flexDirection: direaction }}
      >
        <div className="other" style={otherStyle}>
          <div>other</div>
        </div>
        <div className="draggable-group" ref={draggableGroupRef}>
          <Draggable
            id="drag1"
            x={100}
            y={100}
            saveData={saveData}
            draggableGroupRef={draggableGroupRef}
          >
            <Sample name="sample1" backgroundColor="#fff7a5" />
          </Draggable>
          <Draggable
            id="drag2"
            x={220}
            y={150}
            opacity={0.7}
            isBtnChanger={false}
            draggableGroupRef={draggableGroupRef}
          >
            <Sample
              name="sample2-no btn"
              width="200px"
              opacity={0.7}
              backgroundColor="#f6c7d3"
            />
          </Draggable>
          <Draggable
            id="drag3"
            x={200}
            y={200}
            opacity={0.4}
            draggableGroupRef={draggableGroupRef}
          >
            <Sample name="sample3" width="200px" height="200px" opacity={0.4} />
          </Draggable>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SampleContainer);
