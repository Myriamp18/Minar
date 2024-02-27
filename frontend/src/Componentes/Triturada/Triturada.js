import React from 'react'

import { useNavigate } from 'react-router-dom';

import { GiStonePile } from "react-icons/gi";
import { GiMineTruck } from "react-icons/gi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../ReporteExistencia/ReporteExistencia.css'

function Triturada() {
  const navigate = useNavigate();

  const onTMLE= () =>{
      navigate('/tmle')
  }
  const onTMLT= () =>{
      navigate('/tmlt')
  }
  const onTolvaG= () =>{
    navigate('/tolvag')
}
  return (
    <div className="existencia-container">
    <h1>Mineral Triturado:</h1>
    <div className="close-button" onClick={() => navigate('/mp')}>
            <FontAwesomeIcon icon={faTimes} />
            </div>
        
           
    <div className="button-container">
      <button className="btn-large btn-pt"  onClick={onTMLE}>
        <span className="iconnnes"> <GiStonePile /></span>
        <span className="button-text">
        Triturado MLE
         
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>

      </button>
      <button className="btn-large btn-pp" onClick={onTMLT}>
      <span className="iconnnes">  <GiStonePile /></span>
        <span className="button-text">
         Triturado MLT
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>
      </button>
      <button className="btn-large btn-mp" onClick={onTolvaG}>
      <span className="iconnnes"><GiMineTruck /></span>
        <span className="button-text">
         Tolva General
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>
      </button>
      
    </div>
  </div>
  )
}

export default Triturada
