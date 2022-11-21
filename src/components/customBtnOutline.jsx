import React from "react";

export default function CustomBtnOutline(props) {
  return (
    <button
      style={{
        color: props.textColor,
        backgroundColor: props.bgColor,
        borderRadius: props.borderRadius,
        border: "3px solid " + props.textColor,
        fontSize: props.fontSize,
        fontWeight: "bold",
        width: props.width,
        whiteSpace: "nowrap",
      }}
      className={
        props.black ? "customBtnBlack robo px-3" : "customBtn robo px-3"
      }
      onClick={props.handleOnClick}
    >
      {props.text}
    </button>
  );
}
