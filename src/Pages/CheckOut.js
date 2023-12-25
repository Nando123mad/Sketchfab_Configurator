import React from 'react'
import { Link } from 'react-router-dom'
import CheckOutImg from '../Images/Custom Works P320 - Checkout-scale.png'

function CheckOut() {
  return (
    <div>
      <img src={CheckOutImg} alt="" style={{"width":"100%"}} />

      <Link to='/' className='vaultBtn'>
        <button style={{
          position:"absolute",
          top:0,
          height:"15%",
          width:"20%",
          backgroundColor:"transparent",
          cursor: "pointer",
          border:"none"

          }}></button>
      </Link>

    </div>
  )
}

export default CheckOut
