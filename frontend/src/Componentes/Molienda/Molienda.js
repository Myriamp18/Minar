import React from 'react'
import { GiManualMeatGrinder } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { FaPercent } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import '../ReporteDiario/Diario.css'
import { FaFilePdf } from "react-icons/fa6";
import './Molienda.css'

function Molienda() {

    const navigate = useNavigate();

  const onMezclas= () =>{
      navigate('/mezclas')
  }
  const onPromedios= () =>{
      navigate('/promedios')
  }
  const onPdf= () =>{
    navigate('/pdfmolienda')
  
}

const handeleEXCEL = () =>{
  navigate('/excelmolienda')
}
  return (
    <div>
    <div className="molienda-container">
    <h1>Reporte Molienda:</h1>
    <div className='exportaciones'>
      <button className="btne btnmo-be" onClick={onPdf}>
        <span className="iconnnesex"><FaFilePdf /> </span>
       
        </button>
        <button className="btne btnmo-bo" onClick={handeleEXCEL}>
        <span className="iconnnesex"><SiMicrosoftexcel /> </span>
       
        </button>
        </div>
        <br></br>
    <div className="buttonmo-container">
      <button className="btnmo-large btnmo-pt"  onClick={onMezclas}>
        <span className="iconnnesmo"><GiManualMeatGrinder /></span>
        <span className="buttonmo-text">
        Mezclas Molienda
         
      </span>
  
  
      </button>
      <button className="btnmo-large btnmo-pp" onClick={onPromedios}>
      <span className="iconnnesmo"> <FaPercent /></span>
        <span className="buttonmo-text">
       Promedios
      </span>
      
      </button>
      
    </div>
    </div>
  </div>
  )
}

export default Molienda
