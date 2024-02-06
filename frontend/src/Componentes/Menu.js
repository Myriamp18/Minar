import React,{useState, useEffect} from 'react'
import {
    FaTh,
    FaBars,
    FaHome
}
from "react-icons/fa"
import { GiNotebook } from "react-icons/gi";
import { GiManualMeatGrinder } from "react-icons/gi";
import { BsMinecartLoaded } from "react-icons/bs";
import { GiMineralPearls } from "react-icons/gi";
import { FaRoad } from "react-icons/fa";
import { NavLink } from 'react-router-dom'
import Logo from '../assest/logo.png'

function Menu({children}) {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem=[
        {
            path:"/Inicio",
            name:"Inicio",
            icon:<FaHome />
        },
        {
            path:"/createreportediario",
            name:"Reporte Diario",
            icon:<GiNotebook />
        },
        {
            path:"/pdfdiario",
            name:"Reporte de Existencia",
            icon:<GiNotebook />
        },
        {
            path:"/diario",
            name:"Reporte Produccion",
            icon:<GiNotebook />
        },
        {
            path:"/diario",
            name:"Molienda",
            icon:<GiNotebook />
        },
        {
            path:"/concpmoler",
            name:"Conc. P/Moler",
            icon:<GiManualMeatGrinder />
        },
        {
            path:"/silos",
            name:"Silos",
            icon:<BsMinecartLoaded />
        },
        {
            path:"/seleccion",
            name:"Seleccion",
            icon:<GiMineralPearls />
        },
        {
            path:"/granobandas",
            name:"Grano Bandas",
            icon:<FaRoad />
        }
    ]
    useEffect(() => {
        const handleResize = () => {
          setIsOpen(window.innerWidth >= 757);
        };
    
        // Agregar un listener de evento para escuchar cambios en el tamaño de la ventana
        window.addEventListener('resize', handleResize);
    
        // Inicializar el estado basándose en el tamaño de la ventana actual
        handleResize();
    
        // Limpiar el listener de evento cuando el componente se desmonta
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
  return (
    <div className='containermenu'>
    <div style={{width: isOpen ? "250px":"50px"}} className='menu'>
        <div className='top_section'>
        <img style={{display: isOpen ? "block": "none"}}  src={Logo} alt='logomenu' />
            <h1 style={{display: isOpen ? "block": "none"}} className='logo'>MINAR</h1>
            <div style={{marginLeft: isOpen ? "20px": "0px"}} className='bars'>
                <FaBars onClick={toggle}/>
            </div>
        </div>
        {
            menuItem.map((item, index) => (
                <NavLink to={item.path} key={index} className="link" activeclassName="active">
                    <div className='icon'>{item.icon}</div>
                    <div   style={{display: isOpen ? "block": "none"}} className='link_text'>{item.name}</div>
                </NavLink>
            ))
        }
    </div>

       <main> {children}</main>
    

   
      
    </div>
  )
}

export default Menu
