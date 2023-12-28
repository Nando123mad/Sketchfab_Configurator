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
  const [equipment, setEquipment] = useState([0,0,0,0,0,0,3])//equipment current selection
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
      props.AccessorySelection([accessoryTab, id, texChange, uid]);

      //turn off item if its an accessory.
    }else{
      // Update the state with the modified array
      setEquipment(updatedEquipment); 
  
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
      {/* <p className="scroll">SCROLL</p> */}
    </div>
  );
}

export default Accessories;
