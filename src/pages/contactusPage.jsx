import React, { useEffect, useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import Typography from "@mui/material/Typography";

export default function ContactusPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <>
      <Typography
        className="text-center"
        style={{
          fontSize: "100px",
          // fontFamily: "cursive",
          fontWeight: "bold",
          color: "#FFBA07",
          fontFamily: "Montserrat', sans-serif",
        }}
      >
        welcome to contact us page
      </Typography>
    </>
  );
}
