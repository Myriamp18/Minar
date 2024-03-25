import React from 'react'
import { FaPowerOff } from 'react-icons/fa';

function CerrarSesion({onClick}) {
  return (
    <div>
  
      <button onClick={onClick}>
        <FaPowerOff />
       
      </button>
   
    </div>
  )
}

export default CerrarSesion
