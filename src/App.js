//Main
import React ,{ useState } from 'react'

import './Styles/App.css'

//Additional Files
// import Navbar from './Componets/Header';
// import logo from './logo.svg';
// import Gun from './Images/Sig_1 3.png'
// import AmbientLeft from './Images/yellow-blur-rl.png'
// import AmbientRight from './Images/yellow-blur-br.png'
import LogoMark from './Images/Logo-mark.png'
import Header from './Componets/Header';
import Accessories from './Componets/Accessories';
import ModelViewerHandler from './Componets/3DComponents/ModelViewerHandler'
import MobileModal from './Componets/MobileModal'
import LoadingScreen from './Componets/LoadingScreen';


function App() {
  const [MenuVisability,setMenuVisability] = useState(true)
  //AccessorieID(int), ObjectID(int), TextureChange(bool)
  const [AccessorySelection,setAccessorySelection] = useState([0, 0, true, 1000000])
  const [AccessoryVisibility,setAccessoryVisibility] = useState(9)
  const [AnnotationVisibility,setAnnotationVisibility] = useState(false)

  return (
    <>
    <MobileModal/>
    <div className="App">
      <LoadingScreen/>
      <Header AccessoriesMenuVisibility={(value) => { setMenuVisability(value); setAnnotationVisibility(false)}} />
      <img className='LogoMark' src={LogoMark} alt="Logo Mark" />
      <Accessories AccessorySelection={(value)=>{ setAccessorySelection(value) }} AccessoryVisibility={(value)=>{ setAccessoryVisibility(value) }} AnnotationVisibility={(value)=>{ setAnnotationVisibility(value)}}  />
      {/* <img className='gunImg' src={Gun} alt="Gun Image" /> */}
      <ModelViewerHandler AccessoriesMenuVisibility={MenuVisability} AccessorySelection={AccessorySelection} AccessoryVisibility={AccessoryVisibility} AnnotationVisibility={AnnotationVisibility} />
      {/* <img src={AmbientLeft} alt="Yellow Ambient Graphic" className='AmbientLeft' /> */}
      {/* <img src={AmbientRight} alt="Yellow Ambient Graphic" className='AmbientRight' /> */}
    </div>
    </>
  );
}

export default App;
