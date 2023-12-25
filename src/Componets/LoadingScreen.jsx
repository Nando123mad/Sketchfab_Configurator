//Main
import React from "react";

import "../Styles/App.css";
import LOGO from "../Images/Logo.png";

export default function LoadingScreen() {
  return (
    <div id="splash-loading-img">
      <img src={LOGO} alt="SIG SAUER Logo"></img>

      <div id="load">
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </div>
    </div>
  );
}
