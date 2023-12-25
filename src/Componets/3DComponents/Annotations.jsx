import { useEffect, useState } from 'react';
import { useIsMount } from '../useIsMount';

export const Annotations = ( props, apiRef, annotations ) => {
    //Function that runs and returns a bool on initial mount
    const isMount = useIsMount();

    useEffect(() => {
        if(isMount){
          console.log('Mounting in Annotations')
        }else{
          //Run code after initial mount

          // console.log(annotations.current.length);
          if(props.AnnotationVisibility){
            console.log('Show Annotations')
            apiRef.current.showAnnotationTooltips();
          }else{
            // console.log('Hide Annotations')
            apiRef.current.hideAnnotationTooltips();
          }
          for (var i=0; i<annotations.current.length; i++){
            if(props.AnnotationVisibility){
              apiRef.current.showAnnotation(i);
            }else{
              apiRef.current.hideAnnotation(i);
            }
          }
        }
      }, [ props.AnnotationVisibility ]);
}