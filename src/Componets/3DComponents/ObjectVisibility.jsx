import { useEffect, useState } from 'react';
import { useIsMount } from '../useIsMount';
import { MaterialChange } from './MaterialChange';

export const ObjectVisibility = ( props, apiRef, materials ) => {
    //Function that runs and returns a bool on initial mount
    const isMount = useIsMount();

    let objTexture = {
        internalFormat: "RGB",
        magFilter: "LINEAR",
        minFilter: "LINEAR_MIPMAP_LINEAR",
        texCoordUnit: 1,
        textureTarget: "TEXTURE_2D",
        uid: "",
        wrapS: "REPEAT",
        wrapT: "REPEAT"
    };

    const objectsStateID = [4,2,18,1]//Accessories material setID Manually set. 
    useEffect(() => {
        if(isMount){
            console.log('Mounting in ObjectVisibility')
        }else{
            //Run code after initial mount     

            console.log(props)
            for (var i = 0; i < materials.current.length; i++) {
                //save out materials
                var m = materials.current[i];
                if(props.AccessoryVisibility===9){//special index indicating fully visible object
                    m.channels.Opacity = {
                        enable: true,
                        factor: 1.0,
                        type:"dithering",
                        objTexture
                    };

                    if(m.name.includes("OpticB")){
                        m.channels.Opacity = {
                            enable: true,
                            factor: 0,
                            type:"refraction",
                            objTexture
                        };
                    }

                    apiRef.current.setMaterial(materials.current[i], function(err) {
                    });
                    //TODO Bad hardcoded method
                    // if(materials.current[i].name.endsWith(props.AccessorySelection[0])){
                    //     if( materials.current[i].name.match(/^\d/) ){ 
                    //         if(materials.current[i].name.startsWith(props.AccessorySelection[1])){

                    //             console.log('Material Assigned')
                    //             console.log(materials.current[i].name)
                    //             console.log("Its this accessory that should be getting changed: "+ props.AccessorySelection[1])
                    //             console.log("From this tab: "+ props.AccessorySelection[0])

                    //             materials.current[i].stateSetID  = objectsStateID[props.AccessorySelection[0]]
                    //             apiRef.current.setMaterial(materials.current[i], function(err) {
                    //             });
                    //         }
                    //     }
                    // }else{
                    //     apiRef.current.setMaterial(materials.current[i], function(err) {
                    //     });
                    // }
                }else{
                    //Check that the material selected is for the correct accessory being focused on
                    if(!m.name.endsWith(props.AccessoryVisibility)){
                        //All other non-focused objects
                        m.channels.Opacity = {
                            enable:true,
                            factor: 0.1,
                            type:"dithering",
                            objTexture
                        };
                        // //finally set the new material.
                        apiRef.current.setMaterial(m, function(err) {
                            // console.log(err);
                        });
                    }else{
                        //Focused Object
                        m.channels.Opacity = {
                            enable: true,
                            factor: 1.0,
                            type:"dithering",
                            objTexture
                        };
                        if(m.name.includes("OpticB")){
                            m.channels.Opacity = {
                                enable: true,
                                factor: 0,
                                type:"refraction",
                                objTexture
                            };
                        }
                        //TODO Bad hardcoded method
                        if(materials.current[i].name.endsWith(props.AccessoryVisibility)){
                            if( materials.current[i].name.match(/^\d/) ){ 
                                if(materials.current[i].name.startsWith(props.AccessorySelection[1])){
                                    console.log('Material Assigned')
                                    console.log(materials.current[i].name)
                                    console.log("Its this accessory that should be getting changed: "+ props.AccessorySelection[1])
                                    console.log("From this tab: "+ props.AccessorySelection[0])

                                    materials.current[i].stateSetID  = objectsStateID[props.AccessoryVisibility]
                                    apiRef.current.setMaterial(materials.current[i], function(err) {
                                        console.log('Material Assigned')
                                    });
                                }
                            }
                        }

                    }
                }


            }
        }
        

            
      }, [ props.AccessoryVisibility ]);
}