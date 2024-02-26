import React from 'react'
import { GiMineralPearls } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../ReporteExistencia/ReporteExistencia.css'

function MPatio() {
  const navigate = useNavigate();

  const onPatioMLT= () =>{
      navigate('/mpmlt')
  }
  const onPatioMLE= () =>{
      navigate('/mpmle')
  }
  return (
    <div className="existencia-container">
    <h1>Minera en Patio:</h1>
    <div className="close-button" onClick={() => navigate('/mp')}>
            <FontAwesomeIcon icon={faTimes} />
            </div>
        
           
    <div className="button-container">
      <button className="btn-large btn-pt"  onClick={onPatioMLT}>
        <span className="iconnnes"><GiMineralPearls /></span>
        <span className="button-text">
        Mineral Patio MLT
         
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>

      </button>
      <button className="btn-large btn-pp" onClick={onPatioMLE}>
      <span className="iconnnes"> <GiMineralPearls /></span>
        <span className="button-text">
        Mineral Patio MLE
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>
      </button>

      </div>
      </div>
  )
}

export default MPatio
