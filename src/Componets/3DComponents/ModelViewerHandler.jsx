import React, {useRef, useEffect, useState} from 'react';

import { SketchFabViewer } from "./SketchfabViewer";
import { AccessoriesMenuOffset } from './AccessoriesMenuOffset';
import { MaterialChange } from './MaterialChange';
import { TextureChange } from './TextureChange';
import { ModelChange } from './ModelChange';
import { Annotations } from './Annotations';
import { ObjectVisibility } from './ObjectVisibility';

export default function ModelViewerHandler(props) {

  const apiRef = useRef(null);
  const nodes = useRef(null);
  const itemsCount = useRef(null);
  const opticsCount = useRef(null);
  const lightCount = useRef(null);
  const suppressorCount = useRef(null);
  const materials = useRef(null);
  const textures = useRef(null);
  const annotations = useRef(null);

  //Accessory Tab Hide/Show used to communicate with sketchfab on 
  AccessoriesMenuOffset(props, apiRef);
  
  //Change Model/Texture
  // TextureChange(props, apiRef, materials);//Change individual texture files
  MaterialChange(props, apiRef, materials, nodes);//Change out entire materials
  ModelChange(props, apiRef, nodes, itemsCount, opticsCount, lightCount, suppressorCount);

  //Visibility
  ObjectVisibility(props, apiRef, materials);

  //Annotations
  Annotations( props, apiRef, annotations );

  return (
    <SketchFabViewer
      apiRef={apiRef}
      nodesRef={nodes}
      itemsCountRef={itemsCount}
      opticsCountRef={opticsCount}
      lightCountRef={lightCount}
      suppressorCountRef={suppressorCount}
      materialsRef={materials}
      texturesRef={textures}
      annotaionsRef={annotations}
    ></SketchFabViewer>
  );
}
