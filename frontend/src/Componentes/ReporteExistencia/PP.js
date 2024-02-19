import React from 'react'
import { MdTableRestaurant } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { GiManualMeatGrinder } from "react-icons/gi";
import { GiStonePile } from "react-icons/gi";
import { FaRoad } from "react-icons/fa";
import { GiMineralPearls } from "react-icons/gi";
import { MdFrontLoader } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { GiMinerals } from "react-icons/gi";
import { GiMineWagon } from "react-icons/gi";
import { GiWheelbarrow } from "react-icons/gi";
import './PP.css'
function PP() {
  const navigate = useNavigate();

  const onMesas= () =>{
      navigate('/concmesas')
  }
  const onSeleccion= () =>{
      navigate('/seleccion')
  }
  const onGrano= () =>{
    navigate('/granobaribright')
}
const onConcmesas= () =>{ 
  navigate('/concmesas')
}
const onConcjigs= () =>{ 
   navigate('/concjigssec')
 }

return (
 
<div><h1>Produccion Patio:</h1>
  <div className="pp-container">
  <div className="close-button" onClick={() => navigate('/existencia')}>
          <FontAwesomeIcon icon={faTimes} />
          </div>
      
         
  <div className="buttonpp-container">
    <button className="btnpp-large btnpp-pt"  onClick={onConcmesas}>
      <span className="iconnnespp"><MdTableRestaurant /></span>
      <span className="buttonpp-text">
      Conc. Mesas
       
    </span>
    <span className="buttonpp-textss">
     Pendiente
       
    </span>

    </button>
    <button className="btnpp-large btnpp-pp" onClick={onConcjigs}>
    <span className="iconnnespp"> <GiManualMeatGrinder /></span>
      <span className="buttonpp-text">
       Conc. JIGG´S Secundario
    </span>
    <span className="buttonpp-textss">
     Pendiente
       
    </span>
    </button>
    <button className="btnpp-large btnpp-mp" onClick={onGrano}>
    <span className="iconnnespp"> <GiStonePile /></span>
      <span className="buttonpp-text">
       Medios
    </span>
    <span className="buttonpp-textss">
     Pendiente
       
    </span>
    </button>
    <button className="btnpp-large btnpp-bs" onClick={onConcmesas}>
    <span className="iconnnespp"><FaRoad /></span>
    <span className="buttonpp-text">
       Grano Bandas Seleccion 4.25
    </span>
    <span className="buttonpp-textss">
     Pendiente
       
    </span>
     
    </button>

    <button className="btnpp-large btnpp-bs" onClick={onConcmesas}>
    <span className="iconnnespp"><GiMineralPearls /> </span>
    <span className="buttonpp-text">
       Grano P/Molienda
    </span>
    <span className="buttonpp-textss">
     Pendiente
       
    </span>
     
    </button>

    <button className="btnpp-large btnpp-bs" onClick={onConcmesas}>
    <span className="iconnnespp"><GiMineralPearls /> </span>
    <span className="buttonpp-text">
       Grano JIG´SS Chino
    </span>
    <span className="buttonpp-textss">
     Pendiente
       
    </span>
     
    </button>

    <button className="btnpp-large btnpp-bs" onClick={onConcmesas}>
    <span className="iconnnespp"><MdFrontLoader /> </span>
    <span className="buttonpp-text">
       Desensolve JIG´SS Chino
    </span>
    <span className="buttonpp-textss">
     Pendiente
       
    </span>
     
    </button>

    <button className="btnpp-large btnpp-bs" onClick={onConcmesas}>
    <span className="iconnnespp"><MdFrontLoader /> </span>
    <span className="buttonpp-text">
       Desensolve 4.00-4.10
    </span>
    <span className="buttonpp-textss">
     Pendiente
       
    </span>
     
    </button>

    <button className="btnpp-large btnpp-bs" onClick={onConcmesas}>
    <span className="iconnnespp">< GiMineWagon /> </span>
    <span className="buttonpp-text">
     Desecho Grano Seleccion
    </span>
    <span className="buttonpp-textss">
     Pendiente
       
    </span>
     
    </button>

    <button className="btnpp-large btnpp-bs" onClick={onConcmesas}>
    <span className="iconnnespp"><GiMinerals /> </span>
    <span className="buttonpp-text">
       Baritron
    </span>
    <span className="buttonpp-textss">
     Pendiente
       
    </span>
     
    </button>

    <button className="btnpp-large btnpp-bs" onClick={onConcmesas}>
    <span className="iconnnespp"><GiWheelbarrow /> </span>
    <span className="buttonpp-text">
       Tolvas de Molinos y Mezclas
    </span>
    <span className="buttonpp-textss">
     Pendiente
       
    </span>
     
    </button>
  </div>
  </div>
</div>
)
}


export default PP
