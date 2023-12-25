import { useRef, useEffect, useState } from 'react';
import { useIsMount } from '../useIsMount';

//*********REFRENCE**************/
    //props.AccessorySelection[]
    //AccessorieID(int), ObjectID(int), TextureChange(bool), UID(int)
//*********REFRENCE**************/

export const ModelChange = ( props, apiRef, nodes, itemsCount ) => {
    //Function that runs and returns a bool on initial mount
    const isMount = useIsMount();
    const [showing, setShowing] = useState(false);

    useEffect(() => {
        if(isMount){
            // console.log('Mounting in modelChange')
        }else{
            var m = itemsCount.current;
            if(props.AccessorySelection[2]){ //Check to see if its a texture change or model change
                // console.log('Only texture will be changed or if resetconfig (models be hidden)')
                if(props.AccessorySelection[3] === 800000){//Reset Config
                    for (var i in m) {
                        apiRef.current.hide(m[i]);
                    }
                    setShowing(false);
                }
            }else{//This is a model change
                if(props.AccessorySelection[3] === 700000){//Optics item
                    for (var i in m) {
                        if(showing){//currently showing....so Hide
                            apiRef.current.hide(m[i]);
                        }else{//currently hidden....so show
                            apiRef.current.show(m[i]);
                        }
                    }
                    setShowing(!showing)
                }
            }
        }
      }, [props.AccessorySelection]);
}