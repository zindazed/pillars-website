import React from "react";
import { Link } from "react-router-dom";

export default function NavLinkSmall(props) {
  return (
    <div className="d-flex align-items-center mx-4">
      {props.icon}
      <Link
        style={{ textDecoration: "none" }}
        to={props.link === "/" ? "/" : "/" + props.link}
        onClick={props.handleOclick}
        className="linkSmall mont"
      >
        {props.name}
      </Link>
    </div>
  );
}
