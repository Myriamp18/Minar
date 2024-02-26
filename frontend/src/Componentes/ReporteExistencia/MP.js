import React from 'react'
import { BsMinecartLoaded } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { GiMineralPearls } from "react-icons/gi";
import { GiStonePile } from "react-icons/gi";
import { MdFrontLoader } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './ReporteExistencia.css'

function MP() {
    const navigate = useNavigate();

    const onMezclas= () =>{
        navigate('/mineral')
    }
    const onPatio= () =>{
        navigate('/patio')
    }
    const onTriturada= () =>{
      navigate('/triturada')
  }
  const onTolva= () =>{
    navigate('/tolva')
}
  
  return (
    <div className="existencia-container">
    <h1>Mineral Patio:</h1>
    <div className="close-button" onClick={() => navigate('/existencia')}>
            <FontAwesomeIcon icon={faTimes} />
            </div>
        
           
    <div className="button-container">
      <button className="btn-large btn-pt"  onClick={onMezclas}>
        <span className="iconnnes"><BsMinecartLoaded /></span>
        <span className="button-text">
        Mineral P/Mezclas
         
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>

      </button>
      <button className="btn-large btn-pp" onClick={onPatio}>
      <span className="iconnnes"> <GiMineralPearls /></span>
        <span className="button-text">
         Mineral en Patio
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>
      </button>
      <button className="btn-large btn-mp" onClick={onTriturada}>
      <span className="iconnnes"> <GiStonePile /></span>
        <span className="button-text">
         Mineral Triturado
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>
      </button>
      <button className="btn-large btn-bs" onClick={onTolva}>
      <span className="iconnnes"><MdFrontLoader /> </span>
      <span className="button-text">
         Mineral T.General
      </span>
      <span className="button-textss">
       Pendiente
         
      </span>
       
      </button>
    </div>
  </div>
  )
}

export default MP
