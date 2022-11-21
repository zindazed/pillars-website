import React from "react";

export default function Heading1(props) {
  return (
    <h1
      style={{
        color: props.color ? props.color : "black",
        fontSize: props.fontSize,
        fontWeight: props.fontWeight,
      }}
      className={props.className}
    >
      {props.text}
    </h1>
  );
}
