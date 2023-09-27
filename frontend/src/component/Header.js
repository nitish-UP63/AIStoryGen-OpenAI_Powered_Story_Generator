import React from "react";
import "./header.css";
import {} from "@mui/material";
import mylogo from "../assets/ai_loog_2.jpg";

function Header() {
  return (
    <header>
      <img alt="log" src={mylogo} className="logo" />
      <div className="title">Story Scribe AI</div>
    </header>
  );
}

export default Header;
