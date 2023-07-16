import React, { CSSProperties } from "react";

type SampleProps = {
  name: string;
  opacity?: number;
  backgroundColor?: string;
  width?: string;
  height?: string;
};
function Sample({
  name,
  opacity = 1,
  backgroundColor = "rgb(212, 233, 250)",
  width = "100px",
  height = "100px",
}: SampleProps) {
  const style: CSSProperties = {
    width: width,
    height: height,
    backgroundColor: backgroundColor,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div className="sample" style={style}>
      <div>
        <p>{name}</p>
        <p>opacity:{opacity}</p>
      </div>
    </div>
  );
}

export default React.memo(Sample);
