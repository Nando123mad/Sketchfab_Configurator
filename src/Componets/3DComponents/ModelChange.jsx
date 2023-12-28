import { useRef, useEffect, useState } from 'react';
import { useIsMount } from '../useIsMount';

//*********REFRENCE**************/
    //props.AccessorySelection[]
    //AccessorieID(int), ObjectID(int), TextureChange(bool), UID(int)
//*********REFRENCE**************/

export const ModelChange = ( props, apiRef, nodes, itemsCount, opticsCount, lightCount, suppressorCount ) => {
    //Function that runs and returns a bool on initial mount
    const isMount = useIsMount();
    const [showing, setShowing] = useState(false);
    const [ opticSelection, setOpticSelection ] = useState(null)
    const [ suppressorSelection, setSuppressorSelection ] = useState(null)
    const [ lightSelection, setLightSelection ] = useState(null)

    useEffect(() => {
        if(isMount){
            // console.log('Mounting in modelChange')
        }else{
            var m = itemsCount.current;//all items
            var o = opticsCount.current;//optics items
            var s = suppressorCount.current;//suppressor items
            var l = lightCount.current;//light items
            
            // console.log("Optics:" + o);
            // console.log("Light:" + l);
            // console.log("Suppressor:" + s);

            if(props.AccessorySelection[2]){ //Check to see if its a texture change or model change
                // console.log('Only texture will be changed or if resetconfig (models will be hidden)')
                if(props.AccessorySelection[3] === 1000000){//Reset Config
                    for (var i in m) {
                        apiRef.current.hide(m[i]);
                    }
                    setShowing(false);
                }
            }else{//This is a model change

                // console.log(m)
                // console.log(props)
                // console.log(props.AccessorySelection[3])

                if(props.AccessorySelection[3].toString().startsWith("7")){ //Optics item
                    console.log("Optics Logic")
                    // console.log('test')
                    // console.log(o)
                    // console.log(props.AccessorySelection[3])
                    // console.log((props.AccessorySelection[3] % 10)*2)
                    var Selection = (props.AccessorySelection[3] % 10)*2;
                    for (var i in o) {
                        if(opticSelection == Selection){ //currently selected
                            apiRef.current.hide(o[i]);
                            setOpticSelection(null)
                        }else{
                            if(Selection == i){
                                //Show Optics 
                                apiRef.current.show(o[i]);
                                setOpticSelection(Selection)
                            }else if(Selection == i-1 ){
                                //Show Optics second
                                apiRef.current.show(o[i]);
                            }else{
                                //Hide non optics
                                apiRef.current.hide(o[i]);
                            }
                        }
                    }
                }else if(props.AccessorySelection[3].toString().startsWith("8")){ //Suppressor item
                    console.log("Suppressor Logic")
                    var Selection = (props.AccessorySelection[3] % 10)*2;
                    for (var j in o) {
                        if(suppressorSelection == Selection){ //currently selected
                            apiRef.current.hide(s[j]);
                            setSuppressorSelection(null)
                        }else{
                            if(Selection == j){
                                //Show Suppressor
                                apiRef.current.show(s[j]);
                                setSuppressorSelection(Selection)
                            }else if(Selection == j-1 ){
                                //Show Suppressor
                                apiRef.current.show(s[j]);
                            }else{
                                //Hide non suppressor
                                apiRef.current.hide(s[j]);
                            }
                        }
                    }
                }else if(props.AccessorySelection[3].toString().startsWith("9")){ //light item
                    console.log("Flashlight Logic")
                    var Selection = (props.AccessorySelection[3] % 10)*2;
                    for (var k in o) {
                        if(lightSelection == Selection){ //currently selected
                            console.log('currently selected')
                            apiRef.current.hide(l[k]);
                            setLightSelection(null)
                        }else{
                            if(Selection == k){
                                //Show Flashlight
                                apiRef.current.show(l[k]);
                                setLightSelection(Selection)
                            }else if(Selection == k-1 ){
                                //Show Flashlight
                                apiRef.current.show(l[k]);
                            }else{
                                //Hide non flashlight
                                apiRef.current.hide(l[k]);
                            }
                        }
                    }
                }
            }
        }
      }, [props.AccessorySelection]);
}