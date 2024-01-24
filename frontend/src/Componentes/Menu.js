import React, { useState } from 'react'
import './Menu.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Logo from '../assest/logo.png'
import Letras from '../assest/Letras.png'
import { Link } from 'react-router-dom';

function Menu() {

    const [navCollpase, setNavCollapse] = useState(false)
    const [smallNavCollpase, setSmallNavCollapse] = useState(false)


    return (

        <div className='arriba'>
            <nav className='nav'>
                <div className='logo'>
                    <i className='bi bi-justify largeDeviceIcon' onClick={() => setNavCollapse(!navCollpase)}></i>
                    <i className='bi bi-justify smallDeviceIcon' onClick={() => setSmallNavCollapse(!smallNavCollpase)}></i>
                    <img src={Logo} alt='logomenu' />
                    <img src={Letras} alt='logoletras' />

                </div>
                <ul>
                    <li>Ayuda</li>
                    <li>Cerrar Sesion</li>
                </ul>
            </nav>

            <div className='sidebar_content'>

                <div className={` ${smallNavCollpase ? "smallNav" : ""} sidebar-container ${navCollpase ? "navCollaps" : ""}`}>

                    <Link className='nav-option option3' style={{ textDecoration: 'none', color: 'white' }} to="/Inicio">
                        <i class="bi bi-house-door-fill"></i>
                        <label>Inicio</label>

                    </Link>

                    <Link className='nav-option option3' style={{ textDecoration: 'none', color: 'white' }} to="/diario">
                        <i class="bi bi-card-list"></i>
                        <label>Reporte Diario</label>


                    </Link>

                    <Link className='nav-option option3' style={{ textDecoration: 'none', color: 'white' }} to="/concpmoler">
                    <i class="bi bi-card-list"></i>
                        <label>Conc. P/Moler</label>


                    </Link>

                    <Link className='nav-option option3' style={{ textDecoration: 'none', color: 'white' }} to="/silos">
                        <i class="bi bi-card-list"></i>
                        <label>Silos</label>


                    </Link>
                    <Link className='nav-option option3' style={{ textDecoration: 'none', color: 'white' }} to="/seleccion">
                        <i class="bi bi-card-list"></i>
                        <label>Seleccion</label>


                    </Link>
                    <Link className='nav-option option3' style={{ textDecoration: 'none', color: 'white' }} to="/granobandas">
                        <i class="bi bi-card-list"></i>
                        <label>Grano Bandas</label>


                    </Link>
                </div>

            </div>



        </div>
    )
}

export default Menu