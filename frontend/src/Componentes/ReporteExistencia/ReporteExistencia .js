import React from 'react'
import './ReporteExistencia.css'
import { FaFilePdf } from "react-icons/fa6";
import { GiGoldMine } from "react-icons/gi";
import { GiMiner } from "react-icons/gi";
import { GiMineTruck } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

export default function ReporteExistencia() {
  const navigate = useNavigate();

  const handelePT = () =>{
    navigate('/pt')
  }
  const handelePP = () =>{
    navigate('/pp')
  }


  return (


    <div className="existencia-container">
      <h1>Reporte de Existencia:</h1>
      <div className="button-container">
        <button className="btn-large btn-pt" onClick={handelePT}>
          <span className="iconnnes"><GiMineTruck /></span>
          <span className="button-text">
           Produccion Tolvas
           
        </span>
        <span className="button-textss">
         Pendiente
           
        </span>

        </button>
        <button className="btn-large btn-pp" onClick={handelePP}>
        <span className="iconnnes"><GiMiner /> </span>
          <span className="button-text">
           Produccion Patio
        </span>
        <span className="button-textss">
         Pendiente
           
        </span>
        </button>
        <button className="btn-large btn-mp" onClick={() => handleButtonClick('MP')}>
        <span className="iconnnes"><GiGoldMine /> </span>
          <span className="button-text">
           Minas Patio
        </span>
        <span className="button-textss">
         Pendiente
           
        </span>
        </button>
        <button className="btn-large btn-bs" onClick={() => handleButtonClick('BS')}>
        <span className="iconnnes"><FaFilePdf /> </span>
         
        </button>
      </div>
    </div>

  )
}
