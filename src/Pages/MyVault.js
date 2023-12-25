import React from 'react'
import { Link } from 'react-router-dom'
import VaultPage from '../Images/SIG - Vault Page-scale.png'

function MyVault() {
  return (
    <div>
      <img src={VaultPage} alt="Vault Page" style={{ "width": "100%" }} />
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

export default MyVault