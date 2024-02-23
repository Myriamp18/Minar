import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GiMineWagon } from "react-icons/gi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '.././ReporteExistencia/ReporteExistencia.css'

function DesechoSeleccion() {
  const navigate = useNavigate();

  const onDesecho43= () =>{
      navigate('/desecho43')
  }
  const onDesecho39= () =>{
    navigate('/desecho39')
}

  return (
    <div className="existencia-container">
    <h1>Desecho Grano Seleccion:</h1>
    <div className="close-button" onClick={() => navigate('/pp')}>
            <FontAwesomeIcon icon={faTimes} />
            </div>
        
           
     <div className="button-container">
      <button className="btn-large btn-pt" onClick={onDesecho43}  >
        <span className="iconnnes">< GiMineWagon /></span>
        <span className="button-text">
        Grano Seleccion 4.30
         
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>

      </button>
      <button className="btn-large btn-pp" onClick={onDesecho39}>
      <span className="iconnnes">< GiMineWagon /></span>
        <span className="button-text">
        Grano Seleccion 3.90
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>
      </button>
    
      
    </div>
  </div>
  )
}

export default DesechoSeleccion
