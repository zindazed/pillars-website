import React, { useState, useContext } from "react";
import { CartCounterContext } from "./cartCounter";
import { Link } from "react-router-dom";

export default function NavLink(props) {
  const { currentCount } = useContext(CartCounterContext);
  return (
    <li className={props.className} key={props.keyValue}>
      <Link
        style={{ textDecoration: "none", fontSize: "20px" }}
        to={props.link === "/" ? "/" : "/" + props.link}
        onClick={props.handleOclick}
      >
        {props.name}
      </Link>
      {props.link === "cart" ? (
        <h5
          className="bg-dark text-white ml-2"
          style={{
            borderRadius: "40px",
            fontSize: "15px",
            padding: "2px 7px 3px 7px",
            display: "inline",
          }}
        >
          {currentCount}
        </h5>
      ) : (
        ""
      )}
    </li>
  );
}
