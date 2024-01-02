import React, { useState } from "react";
import "../Styles/accessories.css";
import InfoPic from "../Images/../Images/information.svg";
import Check from "../Images/check_circle.png";
import Reset from "../Images/reset.png";
import Slider from "../Images/vertical-slider.png";
import Data from "../api/API_Accessories.json";
import Dots from "./Dots";

function Accessories(props) {
  const [accessoryTab, setAccessoryTab] = useState(0);//current accessory tab selection
  const [equipment, setEquipment] = useState([0,0,0,0,0,0])//equipment current selection
  const [annotationSel, setAnnotationSel] = useState(null);//Annotation Visibility
  const [accessoryFocus, setAccessoryFocus] = useState(false);//Accessory Visibility

  //update current tab selection (value = tabIndex)
  function AccessoryTabSelection(value){
    //Get accessory list
    var elem = document.getElementsByClassName("leftside");  

    //check if the selection is the current selected tab so we can skip
    if(value === accessoryTab){//Clicked on the already selected tab
      //Send accessoryTab index values upstream to change material visibility
      if(accessoryFocus){//already on...so turn off focus
        props.AccessoryVisibility(9);
        elem[value].classList.remove("underline");
      }else{//turn on focus
        props.AccessoryVisibility(value);
        elem[value].classList.add("underline");
      }
      setAccessoryFocus(!accessoryFocus);
    }else{
      //Manually Send accessoryTab index of 9 to change material to full visibility
      props.AccessoryVisibility(9);
      setAccessoryFocus(false);

      //Reset and turn off Annotations
      setAnnotationSel(null);
      props.AnnotationVisibility(false);

      //Set accessory to fetch api for proper information displayed
      setAccessoryTab(value);
  
      //Loop through accessory list and assign default styling for all   
      for (var i = 0; i < elem.length; i++) {
        elem[i].className = "leftside";
      }
      //update current tab selection with higlighted styling
      elem[value].classList.add("btnSelected");
    }
  }
  
  //send values to the sketchfabviewer specifiying the equipped accessory
  //AccessorieID(int), ObjectID(int), TextureChange(bool), UID(int)
  function EquipAccessory(accessoryTab, id, texChange, uid){
    // Create a copy of the array
    const updatedEquipment = [...equipment];

    // Modify the desired index
    updatedEquipment[accessoryTab] = id; 

    //check if the selection is the already selected accessory
    if(updatedEquipment[accessoryTab] == equipment[accessoryTab]){
      console.log('same Accessory is clicked');
      console.log(accessoryTab, id, texChange, uid)
      if(uid===800000){
        console.log('offset camera: false')
        props.CameraOffset(false);
      }
      props.AccessorySelection([accessoryTab, id, texChange, uid]);


      updatedEquipment[accessoryTab] = null; 
      setEquipment(updatedEquipment); 
      //If above 6 (an accessory) and we want to give the option to 

      //turn off item if its an accessory.
    }else{
      // Update the state with the modified array
      setEquipment(updatedEquipment); 
      if(uid===800000){
        console.log('offset camera: true')
        props.CameraOffset(true);
      }
      //Send values to parent
      props.AccessorySelection([accessoryTab, id, texChange, uid]);

      //turn off annotation
      setAnnotationSel(null)
      props.AnnotationVisibility(false);

    }
  }

  function ShowAnnotations(id){
    //Only show annotation if its for the current equipment
    if(id===equipment[accessoryTab]){
      //check if the selection is the already selected annotation
      if(id === annotationSel){
        setAnnotationSel(null)
        props.AnnotationVisibility(false);
      }else{
        setAnnotationSel(id)
        props.AnnotationVisibility(true);
      }
    }else{
      console.log('not the current selected equipment')
    }
  }

  function ResetConfig(){
    setEquipment([0,0,0,0,0,0,3])
    //Also if suppressor is on lets turn it off and change the camera position or atleast make a call to move the camera correctly. 

    //Pass a unique value (1000000) that forces a reset on texutres
    props.AccessorySelection([0, 0, true, 1000000]);
  }

  return (
    <div id='load-accessories' className="accessories">
      <div className="accessoriesContainer">
        <Dots Top Right/>
        <Dots Top Left/>
        <Dots Bottom Right/>
        <Dots Bottom Left/>

        <div className="accessoriesLeft">
          {/* Top Left Card */}
          <div className="accessoriesTitle">ACCESSORIES</div>

          {/* Bottom Left Long Card */}
          <div className="accessoriesTitleBtns"> 
            <button  // {/* <img src={Check} alt="checkmark" className="checkImg" />  */}
              onClick={() => AccessoryTabSelection(0)} className="leftside btnSelected"> Fire Control Unit </button>
            <button onClick={() => AccessoryTabSelection(1)} className="leftside"> Grip Mods </button>
            <button onClick={() => AccessoryTabSelection(2)} className="leftside"> Slides </button>
            <button onClick={() => AccessoryTabSelection(3)} className="leftside"> Barrels </button>
            <button onClick={() => AccessoryTabSelection(4)} className="leftside"> Guides & Springs </button>
            <button onClick={() => AccessoryTabSelection(5)} className="leftside"> Magazines </button>
            <button onClick={() => AccessoryTabSelection(6)} className="leftside"> Optics </button>
            <button onClick={() => AccessoryTabSelection(7)} className="leftside"> Suppressor </button>
            <button onClick={() => AccessoryTabSelection(8)} className="leftside"> Flashlight </button>
          </div>
        </div>

        <div className="accessoriesRight">
          {/* Top Right Card */}
          <div className="arTop">
            <button onClick={()=>{ResetConfig()}} className="arTopBtn">
              <img src={Reset} alt="refresh" className="reset" />{" "}
              <div>RESET CONFIGURATION</div>
            </button>
            <div className="sliderContainer">
              <img src={Slider} alt="slider" className="slider" />
            </div>
          </div>

          {/* Bottom Right Long Card */}
          {/* Turned off scroll for now */}
          {/* <div className="scrollWheelContainer">
              <Dots Top Right/>
              <Dots Bottom Right/> */}
            <div className="scrollwheel">
              <div className="cards">
                {Data.Accessories[accessoryTab].Objects.map((data, id) => {
                  return (
                    <div key={id} onClick={()=>{EquipAccessory(accessoryTab, id, data.TexChange, data.UID)}} className={equipment[accessoryTab] === id? "arcard selected": "arcard"}>
                      <div className="artopcard">
                        <p className="artopp">
                          {data.ProductName}
                        </p>
                        <img src={InfoPic} onClick={()=>{ShowAnnotations(id)}} alt="I" className={id==annotationSel? "informationImgSel":"informationImg"} />
                      </div>
                      <div className="arbottomcard">
                        <div className="arbottomcardleft">
                          <p className='priceTxt'>
                            ${data.Price}
                          </p>
                          <p className='equipTxt'>
                            {equipment[accessoryTab] === id&& "EQUIPPED"}
                          </p>
                        </div>

                        <img src={data.URL} alt="accessory img" className="Grip1" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          {/* </div> */}
        </div>

      </div>
      {/* <p className="scroll">SCROLL</p> */}
    </div>
  );
}

export default Accessories;
