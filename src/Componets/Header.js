//Main
import React, {useState} from "react";
import {Link} from "react-router-dom";

//Additional Files
import LOGO from "../Images/Logo.png";
import Hide from "../Images/hide.png";
import Show from "../Images/show.png";
import SaveImg from "../Images/download-circle 2.png";
import Dots from "./Dots";
import "../Styles/header.css";

export default function Header(props) {
  const [showAccessories, setShowAccessories] = useState(true);

  //Updates the Accessories menu to show or hide and updates the 3D scene to offset object
  function AccessoriesMenuVisibility() {
    props.AccessoriesMenuVisibility(!showAccessories);
    //here we change the canvas size and the opacity of the accesssories tab.
    if (!showAccessories) {
      // document.getElementById("api-frame").setAttribute("style",`width: 130% !important;`);
      document.getElementById("load-accessories").setAttribute("style", "opacity: 1; -webkit-animation: fade 2s; animation: fade 2s; pointer-events:initial;");
    }else if (showAccessories){
      document.getElementById("api-frame").setAttribute("style", "width: 100% !important;");
      document.getElementById("load-accessories").setAttribute("style","opacity: 0; -webkit-animation: fade 2s; -webkit-animation-direction: reverse; animation: fade 2s; animation-direction: reverse; pointer-events:none;");
    }
    //Instead of this, set up to call the accessories id and set opacity off/on
    setShowAccessories(!showAccessories);
  }

  return (
    <div id="load-header" className="header">
      <div className="headerLogo">
        <img onClick={()=>(window.location.reload())} src={LOGO} alt="SIG SAUER" className="SigLogo" />
      </div>

      <div className="headerMidBtns">
        <Dots Top Left />
        <Dots Top Right />
        <Dots Bottom Left />
        <Dots Bottom Right />

        {/* <div
          className="headerImg"
          onClick={() => {
            AccessoriesMenuVisibility();
          }}
        >
          <img src={showAccessories ? `${Show}` : `${Hide}`} alt="View" className="showImg" />
        </div> */}
        <div className="headerMidFocusBtn">TANGO-DMR 3-18X44MM</div>
        <Link to="/myvault" className="vaultBtn">
          MY VAULT
        </Link>
        <Link to="/#community" className="communityBtn ">
          COMMUNITY
        </Link>
        <Link to="/#profile" className="profileBtn ">
          PROFILE
        </Link>
      </div>

      <div className="headerRightBtnss">
        {/* Top Div */}
        <div className="headerRightBtnA">
          <Dots Top Left />
          <Dots Top Right />
          <Dots Bottom Left />

          <div className="headerTopRightBtns">
            <div className="headerRFocusBtn">
              AS CONFIGURED <h3> &nbsp; $1,299.99</h3>
            </div>
            <Link to="/checkout" className="subimtOrderBtn">
              SUBMIT ORDER
            </Link>
          </div>
        </div>

        {/* Bototm Div */}
        <div className="headerRightBtnB">
          <div className="saveButton">
            <Dots Bottom Left />
            <Dots Bottom Right />
            <a href="http://clients.yeswearemad.com/sigsauerconfig/" className="saveText">
              <img src={SaveImg} alt="Save Icon" className="saveImg" />
            </a>
            <a href="http://clients.yeswearemad.com/sigsauerconfig/" className="saveText">SAVE</a>
          </div>
        </div>
      </div>
    </div>
  );
}

