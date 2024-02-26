import React from 'react'
import { BsMinecartLoaded } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../ReporteExistencia/ReporteExistencia.css'


function MMezclas() {
    const navigate = useNavigate();

    const onMezclasMLT= () =>{
        navigate('/mmlt')
    }
    const onMezclasMLE= () =>{
        navigate('/mmle')
    }
  return (
    <div className="existencia-container">
    <h1>Mineral Mezclas:</h1>
    <div className="close-button" onClick={() => navigate('/mp')}>
            <FontAwesomeIcon icon={faTimes} />
            </div>
        
           
    <div className="button-container">
      <button className="btn-large btn-pt"  onClick={onMezclasMLT}>
        <span className="iconnnes"><BsMinecartLoaded /></span>
        <span className="button-text">
       Mineral Mezclas MLT
         
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>

      </button>
      <button className="btn-large btn-pp" onClick={onMezclasMLE}>
      <span className="iconnnes"> <BsMinecartLoaded /></span>
        <span className="button-text">
        Mineral Mezclas MLE
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>
      </button>

      </div>
      </div>
  )
}

export default MMezclas
