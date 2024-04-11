import React from 'react'
import { BsMinecartLoaded } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { GiMineralPearls } from "react-icons/gi";
import { GiStonePile } from "react-icons/gi";
import { MdFrontLoader } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './ReporteExistencia.css'
function PT() {

    const navigate = useNavigate();

    const onSilos= () =>{
        navigate('/silos')
    }
    const onSeleccion= () =>{
        navigate('/seleccion')
    }
    const onGrano= () =>{
      navigate('/granobaribright')
  }
  const onConc= () =>{
    navigate('/concentradobaribright')
}
  
  return (
    <div className="existencia-container">
    <h1>Produccion Tolvas:</h1>
    <div className="close-button" onClick={() => navigate('/existencia')}>
            <FontAwesomeIcon icon={faTimes} />
            </div>
        
           
    <div className="button-container">
      <button className="btn-large btn-pt"  onClick={onSilos}>
        <span className="iconnnes"><BsMinecartLoaded /></span>
        <span className="button-text">
        Silos
         
      </span>
      

      </button>
      <button className="btn-large btn-pp" onClick={onSeleccion}>
      <span className="iconnnes"> <GiMineralPearls /></span>
        <span className="button-text">
         Barita Seleccion
      </span>
     
      </button>
      <button className="btn-large btn-mp" onClick={onGrano}>
      <span className="iconnnes"> <GiStonePile /></span>
        <span className="button-text">
         Grano Baribright
      </span>
      
      </button>
      <button className="btn-large btn-bs" onClick={onConc}>
      <span className="iconnnes"><MdFrontLoader /> </span>
      <span className="button-text">
         Conc. Baribright
      </span>
     
       
      </button>
    </div>
  </div>
  )
}

export default PT
