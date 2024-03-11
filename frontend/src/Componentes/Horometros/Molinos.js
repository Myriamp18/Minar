import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IoMdClock } from "react-icons/io";
import { GiManualMeatGrinder } from "react-icons/gi";
import './Horometro.css'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Molinos() {
    const navigate = useNavigate();

    const onHMolinos= () =>{
        navigate('/Horomolinos')
    }
    const onMolinos= () =>{
        navigate('/molinos')
    }
   
  return (
    <div>
    <div className="molienda-container">
    <h1>Molinos:</h1>
    <div className="close-button" onClick={() => navigate('/horometros')}>
        <FontAwesomeIcon icon={faTimes} />
        </div>
    <div className="buttonh-container">
      <button className="btnh-large btnh-pt"  onClick={onHMolinos}>
        <span className="iconnnesh"><IoMdClock /></span>
        <span className="buttonh-text">
        Horometros Molinos
         
      </span>
      <span className="buttonh-textss">
       Pendiente
         
      </span>
  
      </button>
      <button className="btnh-large btnh-pp" onClick={onMolinos}>
      <span className="iconnnesh"><GiManualMeatGrinder /></span>
        <span className="buttonh-text">
      Horas Molinos
      </span>
      <span className="buttonh-textss">
       Pendiente
         
      </span>
      </button>
    
    </div>
    </div>
  </div>
  )
}

export default Molinos
