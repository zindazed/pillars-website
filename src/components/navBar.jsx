import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import NavLink from "./navLink";
import ReorderRoundedIcon from "@mui/icons-material/ReorderRounded";
import { useLocation } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { auth } from "../firebase-config";
import { AuthContext } from "./auth";

export default function NavBar(props) {
  const [active_link, setActiveLinks] = useState(1);
  const location = useLocation();
  const path = location.pathname;
  const [anchorEl, setAnchorEl] = useState(null);
  const openAnchorEl = Boolean(anchorEl);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (path === "/") {
      setActiveLinks(1);
    } else if (path === "/shop") {
      setActiveLinks(2);
    } else if (path === "/cart") {
      setActiveLinks(3);
    } else if (path === "/about_us") {
      setActiveLinks(4);
    }
  }, []);

  const signout = async () => {
    sessionStorage.clear();
    await auth.signOut().then(() => {
      window.location.href = "/";
    });
  };

  const links = [
    {
      id: 1,
      name: "home",
      link: "/",
      className: "nav-item nav-link px-5 mont",
    },
    {
      id: 2,
      name: "shop",
      link: "shop",
      className: "nav-item nav-link px-5 mont",
    },
    {
      id: 3,
      name: "cart",
      link: "cart",
      className: "nav-item nav-link px-5 mont",
    },
    {
      id: 4,
      name: "about us",
      link: "about_us",
      className: "nav-item nav-link px-5 mont",
    },
  ];

  const handleAnchorEL = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAnchorEL = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="d-none d-lg-block navbar navbar-expand-md w-100">
      <div
        style={{ position: "fixed", top: "3px" }}
        className="container-fluid"
      >
        {/* <Link className="navbar-brand " to="/"> */}
        <h5
          style={{
            fontSize: "30px",
            fontWeight: "bold",
          }}
          className={
            path === "/shop" || path === "/cart"
              ? "d-block themeColor mx-2 my-1"
              : "d-block text-white mx-2 my-1"
          }
        >
          Hijab gallery
        </h5>
        {/* </Link> */}
        <button
          className="navbar-toggler bg-warning p-0"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
          style={{ border: "2px solid white" }}
        >
          <ReorderRoundedIcon
            style={{ fontSize: "35px" }}
            className="navbar-toggler-icon text-white"
          />
        </button>

        <div
          className="collapse navbar-collapse float-right mr-3"
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav ml-auto text-center m-0">
            {links.map((link) => {
              return (
                <NavLink
                  keyValue={link.id}
                  link={link.link}
                  name={link.name}
                  // handleOclick={handleSetActiveLink(link.id)}
                  handleOclick={() => setActiveLinks(link.id)}
                  className={
                    link.className +
                    (link.id === active_link
                      ? link.id === 1
                        ? " activeHome"
                        : link.id === 4
                        ? " activeAbout"
                        : link.id === 2 || link.id === 3
                        ? " activeOthers"
                        : ""
                      : "")
                  }
                />
              );
            })}
          </ul>
        </div>
        {/* <button
          className=" p-0 m-2"
          type="button"
          onClick={handleAnchorEL}
          data-target="#collapsibleNavbar"
          style={{ border: "2px solid white", borderRadius: "20px" }}
        > */}
        {/* </button> */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openAnchorEl}
          onClose={handleCloseAnchorEL}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={signout}>
            <AccountCircle className="mr-2" />
            logout
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
}
