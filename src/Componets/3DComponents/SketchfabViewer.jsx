import React, {useEffect, useRef, useState} from "react";
import Annotation from "../../Images/Annotation.png";

// import { isMobile } from "react-device-detect";

// Our wonderful chair model
// let MODEL_UID = "dd210b5271e244bf91b3cfe923aec6bd";
let MODEL_UID = "3aa1e6eee0834d07abf8ee81f810f754";
// 388160ef3a1645f7a54aa39498554cef
// let MODEL_UID ="1b718a23d03e48d78366b388e2256eb6";

// if(isMobile){
//   MODEL_UID ="d0073abcaad04f2ab4e7f4f5e9709cef";
// }

const isMobile = false;
// const BACKGROUND_UID = "acf263922aa14bba903d46af02101850";

const useSketchfabViewer = () => {
  // This ref will contain the actual iframe object
  const viewerIframeRef = useRef(null);
  const [api, setApi] = useState();
  const [nodes, setNodes] = useState();
  var [itemsCount, setItemsCount] = useState([]);
  var [opticsCount, setOpticsCount] = useState([]);
  var [suppressorCount, setSuppressorCount] = useState([]);
  var [lightCount, setLightCount] = useState([]);
  const [materials, setMaterials] = useState();
  const [textures, setTextures] = useState();
  const [annotations, setAnnotations] = useState();

  // const [knobNumbers, setKnobNumbers] = useState();
  // const [hardware, setHardware] = useState();
  const [camera, setCamera] = useState();

  const [loadFactor, setLoadFactor] = useState(0);
  const header = document.getElementById("load-header");
  const accessories = document.getElementById("load-accessories");
  const splashLogo = document.getElementById("splash-loading-img");

  useEffect(() => {
    if (loadFactor == 1) {
      //Fade In
      splashLogo.setAttribute("style", "visibility:hidden");

      header.setAttribute("style", "opacity: 1; -webkit-animation: fade 2s; animation: fade 2s;");
      accessories.setAttribute("style", "opacity: 1; -webkit-animation: fade 2s; animation: fade 2s;");

      // apiFrame.setAttribute('style','width: calc(100%+500px)');

      //Splash logo hide

      //Fade Out
      // header.setAttribute('style','opacity: 0; -webkit-animation: fade 2s; -webkit-animation-direction: reverse; animation: fade 2s; animation-direction: reverse;')
      // accessories.setAttribute('style','opacity: 0; -webkit-animation: fade 2s; -webkit-animation-direction: reverse; animation: fade 2s; animation-direction: reverse;')
    }
  }, [loadFactor]);

  const ViewerIframe = (
    <iframe
      id="api-frame"
      // We feed the ref to the iframe component to get the underlying DOM object
      ref={viewerIframeRef}
      allowFullScreen
      mozallowfullscreen="true"
      webkitallowfullscreen="true"
      title="sketchfab-viewer"
      //   width="100vw"
      //   height="100vh"
    />
  );

  useEffect(() => {
    // Initialize the viewer
    let client = new window.Sketchfab(viewerIframeRef.current);
    client.init(MODEL_UID, {
      autostart: 1,
      ui_infos: 0,
      ui_loading: 0, //removes loading bar for model so we can implement our own
      annotation_tooltip_visible: 1,
      annotations_visible: 1,
      double_click: 0,
      transparent: 1,
      // camera: 0,
      ui_controls: 0,
      ui_help: 0,
      ui_hint: 0,
      ui_stop: 0,
      ui_watermark: 0,
      api_log: 1,
      preload: 1,
      success: (_api) => {
        setApi(_api);
        // console.log(_api)

        //Loading Model
        _api.addEventListener("modelLoadProgress", function (factor) {
          // window.console.log(factor.progress);
          setLoadFactor(factor.progress);
        });
        
        _api.addEventListener("viewerready", () => {
          _api.getMaterialList(function (err, _materials) {
            setMaterials(_materials);
            let _textures = [];
            let j = 16;
            for (let i = 0; i < _materials.length; i++) {
              let m = _materials[i];
              console.log(m.name, m);
              _textures[m.name] = m.channels.AlbedoPBR.texture;
            }
            setTextures(_textures);
          });

          if (isMobile) {
            //If using mobile, set the texture quality to low.
            _api.setTextureQuality("ld", function (err) {
              if (!err) {
                // window.console.log('Texture quality set to low definition');
              }
            });
          } else {
            _api.setTextureQuality("hd", function (err) {
              if (!err) {
                // window.console.log('Texture quality set to high definition');
              }
            });
          }
          _api.play(function (err) {
            if (!err) {
              // window.console.log('Animation playing');
            }
          });
          _api.pause(function (err) {
            if (!err) {
              // window.console.log('Animation paused');
            }
          });
          _api.getAnnotationList(function (err, _annotations) {
            if (!err) {
              setAnnotations(_annotations);
              for (let i = 0; i < _annotations.length; i++) {
                _api.hideAnnotation(i);
                // if(i==0){
                //   _api.showAnnotation(0);//show the first annotation if there is one.
                // }
              }
              _api.setAnnotationsTexture(
                {
                  // url: "https://cdn.filestackcontent.com/A6HyqbKrrRoChUMHrEELHz/https://dl.dropboxusercontent.com/s/nz1skyjom3tjq6x/MRLogo.png?dl=0",
                  url: Annotation,
                  iconSize: 64,
                  colNumber: 10,
                  padding: 2,
                },
                function () {}
              );
              // console.log(_annotations);
            }
          });
          _api.getNodeMap(function (err, nodes) {
            if (!err) {
              var ICID = []; //All Items
              var OCID = []; //Optics Items
              var SCID = []; //Suppressor Items
              var LCID = []; //Lights Items
              for (const i in nodes) {
                if (nodes[i].name) {
                  // console.log(nodes[i].name);
                  //make sure theres a name available
                  if (nodes[i].name.startsWith("Accessory")) {

                    if(nodes[i].name.includes("Optic")){
                      OCID.push(nodes[i].instanceID);
                    }else if(nodes[i].name.includes("Suppressor")){
                      SCID.push(nodes[i].instanceID);
                    }else if(nodes[i].name.includes("Flashlight")){
                      LCID.push(nodes[i].instanceID);
                    }

                    //Additional Items to be turned on/off named "[NAME]" in Blender
                    _api.hide(nodes[i].instanceID);
                    ICID.push(nodes[i].instanceID);
                  }
                }
              }
              setItemsCount(ICID);
              setOpticsCount(OCID);
              setSuppressorCount(SCID);
              setLightCount(LCID);
              setNodes(nodes);
            }
          });
          // _api.addEventListener(
          //   "click",
          //   function (info) {
          //     window.console.log("click at", info.position2D);
          //     if (info.instanceID) {
          //       // Hit
          //       // window.console.log('clicked node', info.instanceID);
          //     }
          //     // _api.setCameraLookAt( [-0.22976517709999916, -8.068645615899994, 3.308996290299999],
          //     //  [0.0322999439, 0.4904305136, 2.3266117162], 3 );
          //   },
          //   {pick: "slow"}
          // );
          _api.getCameraLookAt(function (err, _camera) {
            // setCamera(_camera)
            console.log(_camera.position); // [x, y, z]
            console.log(_camera.target); // [x, y, z]
          });
          _api.addTexture(
            "https://cdn.filestackcontent.com/A6HyqbKrrRoChUMHrEELHz/http://dl.dropboxusercontent.com/s/n9wdc35p0lrzmtf/Glock_Lower_D_Optimized.jpg?dl=0",
            function (err, textureId) {
              // setBodyFront(textureId);
              // console.log(textureId, err);
            }
          );
        });
      },
      error: () => {
        console.log("Viewer error");
      },
    });
  }, []);

  return [
    ViewerIframe,
    api,
    nodes,
    itemsCount,
    opticsCount,
    lightCount,
    suppressorCount,
    materials,
    textures,
    annotations
  ];
};

export const SketchFabViewer = ({
  apiRef,
  nodesRef,
  itemsCountRef,
  opticsCountRef,
  lightCountRef,
  suppressorCountRef,
  materialsRef,
  texturesRef,
  annotaionsRef
}) => {
  const [
    ViewerIframe,
    api,
    nodes,
    itemsCount,
    opticsCount,
    lightCount,
    suppressorCount,
    materials,
    textures,
    annotations
  ] = useSketchfabViewer();

  nodesRef.current = nodes;
  itemsCountRef.current = itemsCount;
  opticsCountRef.current = opticsCount;
  lightCountRef.current = lightCount;
  suppressorCountRef.current = suppressorCount;
  materialsRef.current = materials;
  texturesRef.current = textures;
  annotaionsRef.current = annotations;

  apiRef.current = api;
  return ViewerIframe;
};
