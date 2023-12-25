//Main
import React from "react";

import "../Styles/App.css";
import Dots from "./Dots";

export default function MobileModal() {
  return (
    <>
      <div className="MobileModalParent">
        <div className="MobileModalChild">
          <Dots Top Left />
          <Dots Top Right />
          <Dots Bottom Left />
          <Dots Bottom Right />
          VIEW ON LARGER SCREEN OR DESKTOP
        </div>
      </div>
    </>
  );
}