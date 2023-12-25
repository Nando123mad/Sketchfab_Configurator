//Main
import { useRef, useEffect } from 'react';

//Additional Files
import { useIsMount } from '../useIsMount';
import TextureInfo from '../../api/API_ModelInfo.json'

//*********REFRENCE**************/
    //props.AccessorySelection[]
    //AccessorieID(int), ObjectID(int), TextureChange(bool), UID(int)
//*********REFRENCE**************/

//TODO This can be more dynamic, currently the textures are being "imported" every time. That run should be skipped if the texture has beeen imported in the past
//Additionally, Diffuse, mettalic, roughness and normal assignment code is copy paste....theyre very similar and can be consolidated to smaller code otherwise it's a pain changing in 4 different places. 
//materials are reassigned to all objects at end during reset config. This can be more specific to only the materials that have been changed for less computation. 
//Adding texture change to accessories can add more complication in the future.....

export const TextureChange = ( props, apiRef, materials ) => {
    console.log(materials)
    //Function that runs and returns a bool on initial mount
    const isMount = useIsMount();
    useEffect(() => {
        if(isMount){
            // console.log('mounting in textureChange')
        }else{
            if(props.AccessorySelection[2]){//confirms that it will be a texture change. (props.AccessorySelection[2] returns true or false)
                var countGlock4 = 0;
                var DiffuseURL, MetallicURL, RoughnessURL, NormalURL;
                // console.log(materials)

                // //TODO: we should only add texture if it hasnt been added
                //Api fetch to retrieve URL information
                DiffuseURL = TextureInfo.Model[props.AccessorySelection[3]].Diffuse;
                MetallicURL = TextureInfo.Model[props.AccessorySelection[3]].Metallic;
                RoughnessURL = TextureInfo.Model[props.AccessorySelection[3]].Roughness;
                NormalURL = TextureInfo.Model[props.AccessorySelection[3]].Normal;
                console.log(DiffuseURL)
                console.log(MetallicURL)
                console.log(RoughnessURL)
                console.log(NormalURL)

                //DIFFUSE/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                apiRef.current.addTexture(DiffuseURL, function(err, textureId0) {
                    //Loop through all materials
                    for (var i = 0; i < materials.current.length; i++) {
                            //Check that the material matches the accessory selection
                            if(materials.current[i].name.endsWith(props.AccessorySelection[0])){
                                // console.log(materials.current[i].name)//Specific material we are changing
                                materials.current[i].channels.AlbedoPBR.texture =  {
                                    internalFormat: "RGB",
                                    magFilter: "LINEAR",
                                    minFilter: "LINEAR_MIPMAP_LINEAR",
                                    texCoordUnit: 1,
                                    textureTarget: "TEXTURE_2D",
                                    uid: textureId0,
                                    wrapS: "REPEAT",
                                    wrapT: "REPEAT"
                                };
                            }else if(props.AccessorySelection[3] === 800000){//ResetConfig
                                //Check that the material is not an accessoy
                                if(!materials.current[i].name.includes("Accessory")){
                                    materials.current[i].channels.AlbedoPBR.texture =  {
                                        internalFormat: "RGB",
                                        magFilter: "LINEAR",
                                        minFilter: "LINEAR_MIPMAP_LINEAR",
                                        texCoordUnit: 1,
                                        textureTarget: "TEXTURE_2D",
                                        uid: textureId0,
                                        wrapS: "REPEAT",
                                        wrapT: "REPEAT"
                                    };
                                }else{
                                    //the material belongs to an accessory
                                }
                            }
                    }
                    countGlock4++; //This is to check that it is the last texture being updated otherwise continue assigning the textures and the rest of the maps(Albedo, Mettalic, Roughness, Normal).
                    if (countGlock4 == 4){
                    //Loop through the material to update the specific material
                    for (var i = 0; i < materials.current.length; i++) {
                        //This is where the material is set to the current model.. it's placed inside the texture function because otherwise it would be called too early. 
                        if(materials.current[i].name.endsWith(props.AccessorySelection[0])){
                            apiRef.current.setMaterial(materials.current[i], function(err) {
                                console.log('Material Assigned')
                            });
                        }else if(props.AccessorySelection[3] === 800000){
                            apiRef.current.setMaterial(materials.current[i], function(err) {
                                console.log('Material Assigned')
                            });
                        }
                    }
                    }
                });

                //METALLIC/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                apiRef.current.addTexture(MetallicURL, function(err, textureId1) {
                    for (var i = 0; i < materials.current.length; i++) {
                        //Here is where we choose to assign for specific material
                        if(materials.current[i].name.endsWith(props.AccessorySelection[0])){
                            materials.current[i].channels.MetalnessPBR.texture = {
                                internalFormat: "RGB",
                                magFilter: "LINEAR",
                                minFilter: "LINEAR_MIPMAP_LINEAR",
                                texCoordUnit: 1,
                                textureTarget: "TEXTURE_2D",
                                uid: textureId1,
                                wrapS: "REPEAT",
                                wrapT: "REPEAT"
                            };
                        }else if(props.AccessorySelection[3] === 800000){
                            //Check that the material is not an accessoy
                            if(!materials.current[i].name.includes("Accessory")){
                                materials.current[i].channels.MetalnessPBR.texture = {
                                    internalFormat: "RGB",
                                    magFilter: "LINEAR",
                                    minFilter: "LINEAR_MIPMAP_LINEAR",
                                    texCoordUnit: 1,
                                    textureTarget: "TEXTURE_2D",
                                    uid: textureId1,
                                    wrapS: "REPEAT",
                                    wrapT: "REPEAT"
                                };
                            }else{
                                //the material belongs to an accessory
                            }
                        }
                    }
                    countGlock4++; //This is to check that it is the last texture being updated otherwise continue the assigning the textures the rest of the maps(Albedo, Mettalic, Roughness, Normal).
                    if (countGlock4 == 4){
                        //Loop through the material to update the specific material
                        for (var i = 0; i < materials.current.length; i++) {
                            //This is where the material is set to the current model.. it's placed inside the texture function because otherwise it would be called too early. 

                            if(materials.current[i].name.endsWith(props.AccessorySelection[0])){
                                apiRef.current.setMaterial(materials.current[i], function(err) {
                                    console.log('Material Assigned')
                                });
                            }else if(props.AccessorySelection[3] === 800000){
                                apiRef.current.setMaterial(materials.current[i], function(err) {
                                    console.log('Material Assigned')
                                });
                            }
                        }
                    }
                });

                //ROUGHNESS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                apiRef.current.addTexture(RoughnessURL, function(err, textureId2) {
                    //This is where the texture is assigned to the material the "mat" stands for material.
                    for (var i = 0; i < materials.current.length; i++) {
                        //Here is where we choose to assign for specific material
                        if(materials.current[i].name.endsWith(props.AccessorySelection[0])){
                            materials.current[i].channels.RoughnessPBR.texture =  {
                                internalFormat: "RGB",
                                magFilter: "LINEAR",
                                minFilter: "LINEAR_MIPMAP_LINEAR",
                                texCoordUnit: 1,
                                textureTarget: "TEXTURE_2D",
                                uid: textureId2,
                                wrapS: "REPEAT",
                                wrapT: "REPEAT"
                            };
                        }else if(props.AccessorySelection[3] === 800000){
                            //Check that the material is not an accessoy
                            if(!materials.current[i].name.includes("Accessory")){
                                materials.current[i].channels.RoughnessPBR.texture =  {
                                    internalFormat: "RGB",
                                    magFilter: "LINEAR",
                                    minFilter: "LINEAR_MIPMAP_LINEAR",
                                    texCoordUnit: 1,
                                    textureTarget: "TEXTURE_2D",
                                    uid: textureId2,
                                    wrapS: "REPEAT",
                                    wrapT: "REPEAT"
                                };
                            }else{
                                //the material belongs to an accessory
                            }
                        }
                    }

                    countGlock4++; //This is to check that it is the last texture being updated otherwise continue the assigning the textures the rest of the maps(Albedo, Mettalic, Roughness, Normal).
                    if (countGlock4 == 4){
                        //Loop through the material to update the specific material
                        for (var i = 0; i < materials.current.length; i++) {
                            //This is where the material is set to the current model.. it's placed inside the texture function because otherwise it would be called too early. 
                            if(materials.current[i].name.endsWith(props.AccessorySelection[0])){
                                apiRef.current.setMaterial(materials.current[i], function(err) {
                                    console.log('Material Assigned')
                                });
                            }else if(props.AccessorySelection[3] === 800000){
                                apiRef.current.setMaterial(materials.current[i], function(err) {
                                    console.log('Material Assigned')
                                });
                            }
                        }
                    }
                });

                //NORMAL////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                apiRef.current.addTexture(NormalURL, function(err, textureId3) {
                    //This is where the texture is assigned to the material the "mat" stands for material.
                    for (var i = 0; i < materials.current.length; i++) {
                        //Here is where we choose to assign for specific material
                        if(materials.current[i].name.endsWith(props.AccessorySelection[0])){
                            materials.current[i].channels.NormalMap.texture =  {
                                internalFormat: "RGB",
                                magFilter: "LINEAR",
                                minFilter: "LINEAR_MIPMAP_LINEAR",
                                texCoordUnit: 1,
                                textureTarget: "TEXTURE_2D",
                                uid: textureId3,
                                wrapS: "REPEAT",
                                wrapT: "REPEAT"
                            };
                        }else if(props.AccessorySelection[3] === 800000){
                            //Check that the material is not an accessoy
                            if(!materials.current[i].name.includes("Accessory")){
                                materials.current[i].channels.NormalMap.texture =  {
                                    internalFormat: "RGB",
                                    magFilter: "LINEAR",
                                    minFilter: "LINEAR_MIPMAP_LINEAR",
                                    texCoordUnit: 1,
                                    textureTarget: "TEXTURE_2D",
                                    uid: textureId3,
                                    wrapS: "REPEAT",
                                    wrapT: "REPEAT"
                                };
                            }else{
                                //the material belongs to an accessory
                            }
                        }
                    }

                    countGlock4++; //This is to check that it is the last texture being updated otherwise continue the assigning the textures the rest of the maps(Albedo, Mettalic, Roughness, Normal).
                    if (countGlock4 == 4){
                        //Loop through the material to update the specific material
                        for (var i = 0; i < materials.current.length; i++) {
                            //This is where the material is set to the current model.. it's placed inside the texture function because otherwise it would be called too early. 
                            if(materials.current[i].name.endsWith(props.AccessorySelection[0])){
                                apiRef.current.setMaterial(materials.current[i], function(err) {
                                    console.log('Material Assigned')
                                });
                            }else if(props.AccessorySelection[3] === 800000){
                                apiRef.current.setMaterial(materials.current[i], function(err) {
                                    console.log('Material Assigned')
                                });
                            }
                        }
                    }
                });
            }else{
                // console.log('Only model will be changed')
            }
        }
      }, [props.AccessorySelection]);
    
}