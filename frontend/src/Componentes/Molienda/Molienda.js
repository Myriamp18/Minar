import React from 'react'
import { GiManualMeatGrinder } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { FaPercent } from "react-icons/fa";

import { FaFilePdf } from "react-icons/fa6";
import './Molienda.css'

function Molienda() {

    const navigate = useNavigate();

  const onMezclas= () =>{
      navigate('/mezclas')
  }
  const onPromedios= () =>{
      navigate('/promedios')
  }
  const onPdf= () =>{
    navigate('/pdfmolienda')
}
  return (
    <div>
    <div className="molienda-container">
    <h1>Reporte Molienda:</h1>
    
    <div className="buttonmo-container">
      <button className="btnmo-large btnmo-pt"  onClick={onMezclas}>
        <span className="iconnnesmo"><GiManualMeatGrinder /></span>
        <span className="buttonmo-text">
        Mezclas Molienda
         
      </span>
      <span className="buttonmo-textss">
       Pendiente
         
      </span>
  
      </button>
      <button className="btnmo-large btnmo-pp" onClick={onPromedios}>
      <span className="iconnnesmo"> <FaPercent /></span>
        <span className="buttonmo-text">
       Promedios
      </span>
      <span className="buttonmo-textss">
       Pendiente
         
      </span>
      </button>
      <button className="btnmo btnmo-bs" onClick={onPdf}>
        <span className="iconnnespdf"><FaFilePdf /> </span>
       
        </button>
    </div>
    </div>
  </div>
  )
}

export default Molienda
