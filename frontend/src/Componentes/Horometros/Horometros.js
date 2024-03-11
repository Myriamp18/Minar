import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GiManualMeatGrinder } from "react-icons/gi";
import { GiGasStove } from "react-icons/gi";
import { GiRailRoad } from "react-icons/gi";
import { FaHourglassHalf } from "react-icons/fa";
import { IoMdClock } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa6";
import './Horometro.css'


function Horometros() {
    const navigate = useNavigate();

  const onHjigs= () =>{
      navigate('/hjigs')
  }
  const onH12= () =>{
   navigate('/hmesa12')
}
  const onH34= () =>{
      navigate('/hmesa34')
  }
  const onH5= () =>{
    navigate('/hmesa5')
}
const onH6= () =>{
  navigate('/hmesa6')
}
const onHMolinos= () =>{ 
  navigate('/hmolinos')
}
const onHcriva= () =>{ 
   navigate('/crivas')
 }
 const onHhorno= () =>{ 
   navigate('/hhorno')
 }
 
 const handelePDF = () =>{
    navigate('/pdfexistencia')
  }
      
  return (
  
      
       
      <div className='horometros'><h1>Horometros:</h1>
        <div className="h-container">
      
               
        <div className="buttonh-container">
          <button className="btnh-large btnh-pt"  onClick={onHjigs}>
            <span className="iconnnesh"><FaHourglassHalf /></span>
            <span className="buttonh-text">
            Horometros Jigg´s
             
          </span>
          <span className="buttonh-textss">
           Pendiente
             
          </span>
      
          </button>
          <button className="btnh-large btnh-pp" onClick={onH12}>
          <span className="iconnnesh"><IoMdClock /></span>
            <span className="buttonh-text">
             Horometro Mesa 1y2
          </span>
          <span className="buttonh-textss">
           Pendiente
             
          </span>
          </button>
          <button className="btnh-large btnh-mp" onClick={onH34}>
          <span className="iconnnesh"><FaHourglassHalf /></span>
            <span className="buttonh-text">
             Horometros Mesa 3y4
          </span>
          <span className="buttonh-textss">
           Pendiente
             
          </span>
          </button>
          <button className="btnh-large btnh-bs" onClick={onH5}>
          <span className="iconnnesh"><IoMdClock /></span>
          <span className="buttonh-text">
             Horometro Mesa 5
          </span>
          <span className="buttonh-textss">
           Pendiente
             
          </span>
           
          </button>
          <button className="btnh-large btnh-bs" onClick={onH6}>
          <span className="iconnnesh"><FaHourglassHalf /></span>
          <span className="buttonh-text">
             Horometro Mesa 6
          </span>
          <span className="buttonh-textss">
           Pendiente
             
          </span>
           
          </button>
      
          <button className="btnh-large btnh-bs" onClick={onHMolinos}>
          <span className="iconnnesh"><GiManualMeatGrinder /> </span>
          <span className="buttonh-text">
             Molinos
          </span>
          <span className="buttonh-textss">
           Pendiente
             
          </span>
           
          </button>
      
          <button className="btnh-large btnh-bs" onClick={onHcriva}>
          <span className="iconnnesh"><GiRailRoad /> </span>
          <span className="buttonh-text">
             Crivada Vibratoria
          </span>
          <span className="buttonh-textss">
           Pendiente
             
          </span>
           
          </button>
      
          <button className="btnh-large btnh-bs" onClick={onHhorno}>
          <span className="iconnnesh"><GiGasStove /> </span>
          <span className="buttonh-text">
             Horno Rotatorio
          </span>
          <span className="buttonh-textss">
           Pendiente
             
          </span>
           
          </button>
          <button className="btnmo btnmo-bs" onClick={handelePDF}>
        <span className="iconnnespdf"><FaFilePdf /> </span>
       
        </button>
          
        </div>
        </div>
      </div>
  )
}

export default Horometros
