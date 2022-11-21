import React, { useState, useEffect } from "react";
import { Home, People, ShoppingBag, ShoppingCart } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { CustomText } from "./CustomText";

export default function BottomNav(props) {
  const [active_link, setActiveLinks] = useState(1);
  const location = useLocation();
  const path = location.pathname;

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

  const links = [
    {
      id: 1,
      name: "home",
      link: "/",
      linkIcon: (
        <Home
          className={active_link === 1 ? "themeBg text-white" : "themeColor"}
          style={{ borderRadius: "40px", fontSize: "40px", padding: "7px" }}
          onClick={() => setActiveLinks(1)}
        />
      ),
    },
    {
      id: 2,
      name: "shop",
      link: "shop",
      linkIcon: (
        <ShoppingBag
          className={active_link === 2 ? "themeBg text-white" : "themeColor"}
          style={{ borderRadius: "40px", fontSize: "40px", padding: "7px" }}
          onClick={() => setActiveLinks(2)}
        />
      ),
    },
    {
      id: 3,
      name: "cart",
      link: "cart",
      linkIcon: (
        <ShoppingCart
          className={active_link === 3 ? "themeBg text-white" : "themeColor"}
          style={{ borderRadius: "40px", fontSize: "40px", padding: "7px" }}
          onClick={() => setActiveLinks(3)}
        />
      ),
    },
    {
      id: 4,
      name: "about",
      link: "about_us",
      linkIcon: (
        <People
          className={active_link === 4 ? "themeBg text-white" : "themeColor"}
          style={{ borderRadius: "40px", fontSize: "40px", padding: "7px" }}
          onClick={() => setActiveLinks(4)}
        />
      ),
    },
  ];

  return (
    <div
      style={{ zIndex: "999 !important" }}
      className="d-lg-none container d-flex justify-content-center"
    >
      <div
        className="bg-white row py-1 customCard"
        style={{
          borderRadius: "20px",
          position: "fixed",
          bottom: "5px",
          width: "98%",
        }}
      >
        {links.map((link) => {
          return (
            <div key={link.id} className="col-3 d-flex justify-content-center">
              <div className="text-center">
                <Link to={link.link}>{link.linkIcon}</Link>
                <CustomText className="mt-1" fontSize="12px" name={link.name} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
