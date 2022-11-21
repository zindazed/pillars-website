import React from "react";

export const CustomText = (props) => {
  return (
    <h5
      className={props.className}
      style={{
        color: props.color,
        fontSize: props.fontSize,
        fontWeight: props.fontWeight,
      }}
    >
      {props.name}
    </h5>
  );
};
