//Main
import { useRef, useEffect } from 'react';

//Additional Files
import { useIsMount } from '../useIsMount';

//*********REFRENCE**************/
    //props.AccessorySelection[] 
    //AccessorieID(int), ObjectID(int), TextureChange(bool), UID(int)
//*********REFRENCE**************/

export const MaterialChange = ( props, apiRef, materials, nodes ) => {
    // console.log(materials)
    //Function that runs and returns a bool on initial mount
    const isMount = useIsMount();
    useEffect(() => {
        if(isMount){
            // console.log('mounting in textureChange')
        }else{
            console.log("MATCHANGE")
            //TODO:Setting this manually is bad and not scalable. This was only done to select the materials within objects that contained multiple materials
            //In this setup we manually search and store the values of the location of the materials that we know will be changed out. (this requires printing out to console the material information so that we can manually set the setID)
            const objectsStateID = [4,2,30,1]//[FCU, Base, Slide, Barrel] [Accessories material setID Manually set. 

            if(props.AccessorySelection[2]){//confirms that it will be a texture change. (props.AccessorySelection[2] returns true or false)

                //Loop through materials and find changable materials by names. Then we switch their position and replace it with the correct material slot placement. 
                for (var i = 0; i < materials.current.length; i++) {
                    if(materials.current[i].name.endsWith(props.AccessorySelection[0])){
                        if( materials.current[i].name.match(/^\d/) ){ 
                            if(materials.current[i].name.startsWith(props.AccessorySelection[1])){
                                materials.current[i].stateSetID  = objectsStateID[props.AccessorySelection[0]]
                                apiRef.current.setMaterial(materials.current[i], function(err) {
                                    // console.log('Material Assigned')
                                });
                            }
                        }
                    }

                    //If Reset Configuration is selected.
                    if(props.AccessorySelection[3] === 1000000){
                        if(materials.current[i].name.startsWith(0)){
                            // console.log('all default material')
                            
                            materials.current[i].stateSetID  = objectsStateID[materials.current[i].name.charAt(materials.current[i].name.length - 1)]
                            apiRef.current.setMaterial(materials.current[i], function(err) {
                                // console.log('Material Assigned')
                            });
                        }
                        // console.log('Reset all materials')
                    }
                }

            }else{
                // console.log('Only model will be changed')
            }
        }
      }, [props.AccessorySelection ]);
    
}