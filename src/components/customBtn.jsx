import React from "react";

export default function CustomBtn(props) {
  return (
    <button
      style={{
        color: props.textColor,
        backgroundColor: props.bgColor,
        borderRadius: "0px !important",
        border: "1px solid" + props.bgColor,
        fontSize: props.fontSize,
      }}
      className="px-2"
    >
      {props.text}
    </button>
  );
}
