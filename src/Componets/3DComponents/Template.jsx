import { useEffect, useState } from 'react';
import { useIsMount } from '../useIsMount';

export const Template = ( ObjectsPassedIn ) => {
    //Function that runs and returns a bool on initial mount
    const isMount = useIsMount();

    useEffect(() => {
        if(isMount){
            // console.log('Mounting in Templpate')
        }else{
            //Run code after initial mount
        }
      }, [ VariablesToWatch ]);
}