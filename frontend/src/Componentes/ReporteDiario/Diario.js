import React from 'react'
import '../ReporteExistencia/ReporteExistencia.css'
import { GiManualMeatGrinder } from "react-icons/gi";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { GiMineralPearls } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { FaFilePdf } from "react-icons/fa6";


function Diario() {
    const navigate = useNavigate();

  const handeleJS = () =>{
    navigate('/djigss')
  }
  const handeleJSXH = () =>{
    navigate('/djigsch')
  }
  const handeleMESAS = () =>{
    navigate('/dmesas')
  }
  const handeleSELEC = () =>{
    navigate('/dseleccion')
  }
  const handelePDF = () =>{
    navigate('/pdfdiario')
  }
  const handeleEXCEL = () =>{
    navigate('/excel')
  }
  return (
    <div className="existencia-container">
      <h1>Reporte de Produccion Diaria:</h1>
      <div className="button-container">
        <button className="btn-large btn-pt" onClick={handeleJS}>
          <span className="iconnnes"><GiManualMeatGrinder /></span>
          <span className="button-text">
          JIG´SS
           
        </span>
        <span className="button-textss">
         Pendiente
           
        </span>

        </button>
        <button className="btn-large btn-pp" onClick={handeleJSXH}>
        <span className="iconnnes"><GiManualMeatGrinder /> </span>
          <span className="button-text">
           JIG´SS CHINOS
        </span>
        <span className="button-textss">
         Pendiente
           
        </span>
        </button>
        <button className="btn-large btn-mp" onClick={handeleMESAS}>
        <span className="iconnnes"><MdOutlineTableRestaurant /> </span>
          <span className="button-text">
           MESAS
        </span>
        <span className="button-textss">
         Pendiente
           
        </span>
        </button>
        <button className="btn-large btn-mp" onClick={handeleSELEC}>
        <span className="iconnnes"><GiMineralPearls /> </span>
          <span className="button-text">
           SELECCION
        </span>
        <span className="button-textss">
         Pendiente
           
        </span>
        </button>
        <button className="btnmo btnmo-bs" onClick={handelePDF}>
        <span className="iconnnespdf"><FaFilePdf /> </span>
       
        </button>
        <button className="btnmo btnmo-bs" onClick={handeleEXCEL}>
        <span className="iconnnespdf"><FaFilePdf /> </span>
       
        </button>
      </div>
    </div>
  )
}

export default Diario
