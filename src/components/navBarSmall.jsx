import React, { useState, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import NavLinkSmall from "./navLinkSmall";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HailIcon from "@mui/icons-material/Hail";
import { CartCounterContext } from "./cartCounter";
import { AccountCircle } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { auth } from "../firebase-config";
import { AuthContext } from "./auth";

export default function NavBarSmall() {
  const [open, setOpen] = React.useState(false);
  const { currentCount } = useContext(CartCounterContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const openAnchorEl = Boolean(anchorEl);
  const { currentUser } = useContext(AuthContext);

  const handleAnchorEL = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAnchorEL = () => {
    setAnchorEl(null);
  };

  const signout = async () => {
    sessionStorage.clear();
    await auth.signOut().then(() => {
      window.location.href = "/";
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div style={{ padding: "5px" }}>
        <div className="navSmall b-block d-lg-none">
          {/* <Link to="/" className="text-decoration-none"> */}
          <h5 style={{ fontSize: "20px" }} className="brand mx-2 mt-1 mont">
            Hijab gallery
          </h5>
          {/* </Link> */}
          <div>
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
            <div className="d-inline">
              {/* <Link to="cart"> */}
              <button
                className="navbar-toggler  p-0 m-2  mr-4"
                type="button"
                style={{ border: "2px solid white" }}
              >
                <ShoppingCartIcon
                  style={{ fontSize: "25px" }}
                  className="navbar-toggler-icon text-white"
                />
              </button>
              {/* </Link> */}
              <h5
                className="bg-dark text-white ml-2 position-absolute"
                style={{
                  borderRadius: "40px",
                  border: "2px solid white",
                  fontSize: "15px",
                  padding: "2px 7px 3px 7px",
                  display: "inline",
                  top: "5px",
                  right: "6px",
                }}
              >
                {currentCount}
              </h5>
            </div>
            {/* <button
              className="navbar-toggler  p-0 m-2 "
              type="button"
              onClick={handleOpen}
              data-target="#collapsibleNavbar"
              style={{ border: "2px solid white" }}
            >
              {!open ? (
                <ReorderRoundedIcon
                  style={{ fontSize: "35px" }}
                  className="navbar-toggler-icon text-white"
                />
              ) : (
                <CloseIcon
                  style={{ fontSize: "35px" }}
                  className="navbar-toggler-icon text-white"
                />
              )}
            </button> */}
          </div>
        </div>
        <Drawer anchor={"left"} open={open} onClose={handleClose}>
          <div
            style={{ width: "260px" }}
            // role="presentation"
            className="drawer"
            // onClick={handleClose}
            onKeyDown={handleClose}
          >
            <div>
              <NavLinkSmall
                link="/"
                name="home"
                handleOclick={handleClose}
                icon={
                  <HomeIcon
                    style={{ fontSize: "30px" }}
                    className="text-white mr-3"
                  />
                }
              />
              <NavLinkSmall
                link="shop"
                name="shop"
                handleOclick={handleClose}
                icon={
                  <ShoppingBagIcon
                    style={{ fontSize: "30px" }}
                    className="text-white mr-3"
                  />
                }
              />
              <NavLinkSmall
                link="cart"
                name="cart"
                handleOclick={handleClose}
                icon={
                  <ShoppingCartIcon
                    style={{ fontSize: "30px" }}
                    className="text-white mr-3"
                  />
                }
              />
              <NavLinkSmall
                link="about_us"
                name="about us"
                handleOclick={handleClose}
                icon={
                  <HailIcon
                    style={{ fontSize: "30px" }}
                    className="text-white mr-3"
                  />
                }
              />
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
