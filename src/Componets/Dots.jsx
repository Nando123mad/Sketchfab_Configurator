import React from "react";

export default function Dots(props) {
  return (
    <div
      style={{
        position: "absolute",
        width: "2px",
        height: "2px",
        background: "white",
        top: `${props.Top ? "-2px" : null}`,
        bottom: `${props.Bottom ? "-2px" : null}`,
        left: `${props.Left ? "-2px" : null}`,
        right: `${props.Right ? "-2px" : null}`,
      }}
    ></div>
  );
}
