import React, { useState } from 'react'
import './Menu.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Logo from '../assest/logo.png'
import Letras from '../assest/Letras.png'

function Menu() {

    const [navCollpase, setNavCollapse]= useState(false)
    const [smallNavCollpase, setSmallNavCollapse]= useState(false)
    
    
    return(

        <div className='arriba'>
            <nav className='nav'>
            <div className='logo'>
            <i className='bi bi-justify largeDeviceIcon' onClick={() => setNavCollapse(!navCollpase)}></i>
            <i className='bi bi-justify smallDeviceIcon' onClick={() => setSmallNavCollapse(!smallNavCollpase)}></i>
            <img src={Logo} alt='logomenu'/>
            <img src={Letras} alt='logoletras'/>

            </div>
            <ul>
                <li>Ayuda</li>
                <li>Cerrar Sesion</li>
            </ul>
            </nav>
            <div className='sidebar_content'>
            <div className={` ${smallNavCollpase ? "smallNav" : ""} sidebar-container ${navCollpase ? "navCollaps" : ""}`}>
                <div className='nav-option option1'>
                    <i className='reporte diario'></i>
                    <h3>Reporte Diario</h3>

                </div>

                <div className='nav-option option2'>
                    <i className='opcion2'></i>
                    <h3>Opcion2</h3>

                </div>

                <div className='nav-option option3'>
                    <i className='opcion3'></i>
                    <h3>Opcion3</h3>

                </div>
            </div>

        </div>
        </div>
    )
}

export default Menu