import React from 'react'
import { BsMinecartLoaded } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { GiMineralPearls } from "react-icons/gi";
import { GiStonePile } from "react-icons/gi";
import { MdFrontLoader } from "react-icons/md";
function PT() {
    const navigate = useNavigate();
    const onSilos= () =>{
        navigate('/silos')
    }
    const onSeleccion= () =>{
        navigate('/seleccion')
    }
  
  return (
    <div className="existencia-container">
    <h1>Produccion Tolvas:</h1>
    <div className="button-container">
      <button className="btn-large btn-pt"  onClick={onSilos}>
        <span className="iconnnes"><BsMinecartLoaded /></span>
        <span className="button-text">
        Silos
         
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>

      </button>
      <button className="btn-large btn-pp" onClick={onSeleccion}>
      <span className="iconnnes"> <GiMineralPearls /></span>
        <span className="button-text">
         Barita Seleccion
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>
      </button>
      <button className="btn-large btn-mp" onClick={() => handleButtonClick('MP')}>
      <span className="iconnnes"> <GiStonePile /></span>
        <span className="button-text">
         Grano Baribright
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>
      </button>
      <button className="btn-large btn-bs" onClick={() => handleButtonClick('BS')}>
      <span className="iconnnes"><MdFrontLoader /> </span>
      <span className="button-text">
         Conc. Baribright
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>
       
      </button>
    </div>
  </div>
  )
}

export default PT
