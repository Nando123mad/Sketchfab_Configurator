import {useRef, useEffect} from "react";
import {useIsMount} from "../useIsMount";

//Accessory Tab Hide/Show used to communicate with sketchfab viewer
export const AccessoriesMenuOffset = (props, apiRef) => {
  //Function that runs and returns a bool on initial mount
  const isMount = useIsMount();

  useEffect(() => {
    if (isMount) {
      //first mount
      // console.log('initial mount')
    } else {
      //after first mount
      if (props.AccessoriesMenuVisibility) {

        console.log("move to the right");
        //TODO This should be dynamic by taking in screen width information for proper offset 0.05 for 2500px and 0.005 for 1440
        const camMovY = (1 / 1440) * window.innerWidth; //dynamic window width for scaling the movement
        console.log(camMovY)

        if(props.CameraOffset){
          //True, so were moving the object to the right and accomodating the suppressor

          //[position, target,duration]
          console.log('suppressor on')
          apiRef.current.setCameraLookAt(
            [-0.4, -0.4, -0.05],//position
            [0.0, -0.075, -0.00005610803206950726],//target 
            2.0//duration
          );
        }else{
          //False, so were only moving the object to the right. no suppressor accomodation.

          //if suppressor on{ Change position of camera and target }
          //[position, target,duration]
          console.log('suppressor off')
          apiRef.current.setCameraLookAt(
            [-0.352825848627620646, -0.1, -0.05],//position
            [0.0, -0.025, -0.00005610803206950726],//target 
            2.0//duration
          );
        }


      } else {
        console.log("move center");
        // apiRef.current.recenterCamera();//Alternative, but it jerks the object into the center view. *unwanted behavior*
        //TODO This should be dynamic by taking in screen width information for proper centering

        if(props.CameraOffset){
          //True, so were moving to the center and accomodating the suppressor
          //[position, target,duration]
          apiRef.current.setCameraLookAt(
            [-0.5, -0.085, 0.0],//position
            [0.0, -0.085, -0.00005610803206950726],//target 
            2.0//duration
          );
        }else{
          //False, so were only moving the object to the center. no suppressor accomodation.
          apiRef.current.setCameraLookAt(
            [-0.312825848627620646, -0.025, 0.0],
            [0.0, -0.025, -0.00005610803206950726],
            2.0
          );
        }

        
      }
    }
  }, [props.AccessoriesMenuVisibility, props.CameraOffset]);
};
