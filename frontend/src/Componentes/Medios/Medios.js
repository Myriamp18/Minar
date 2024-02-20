import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GiStonePile } from "react-icons/gi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '.././ReporteExistencia/ReporteExistencia.css'

function Medios() {

    const navigate = useNavigate();

    const onMedios46= () =>{
        navigate('/medios46')
    }
    const onMedios4= () =>{
        navigate('/medios4')
    }
    const onMedios3= () =>{
        navigate('/medios3')
    }
 
  return (
    <div className="existencia-container">
    <h1>Medios:</h1>
    <div className="close-button" onClick={() => navigate('/pp')}>
            <FontAwesomeIcon icon={faTimes} />
            </div>
        
           
     <div className="button-container">
      <button className="btn-large btn-pt" onClick={onMedios46}  >
        <span className="iconnnes"><GiStonePile /></span>
        <span className="button-text">
        Medios Conc. 4.06-4.10
         
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>

      </button>
      <button className="btn-large btn-pp" onClick={onMedios4}>
      <span className="iconnnes"><GiStonePile /></span>
        <span className="button-text">
        Medios Conc. 4.00-4.04
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>
      </button>
      <button className="btn-large btn-mp"  onClick={onMedios3}>
      <span className="iconnnes"> <GiStonePile /></span>
        <span className="button-text">
        Medios Conc. 3.98
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>
      </button>
      
    </div>
  </div>
  )
}

export default Medios
