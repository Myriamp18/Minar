import React, { useState, useEffect } from 'react'
import {

    FaBars,
    FaHome
}
    from "react-icons/fa"

import { MdLibraryBooks } from "react-icons/md";
import { SlBookOpen } from "react-icons/sl";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { GiNotebook } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from 'react-router-dom'
import Logo from '../assest/logo.png'
import { useNavigate } from 'react-router-dom';
import { IoSettings } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiFillSignal } from "react-icons/ai";
function Menu({ children }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    // Función para cerrar sesión

    const menuItem = [
        {
            path: "/Inicio",
            name: "Inicio",
            icon: <FaHome />
        },
        {
            path: "/diario",
            name: "Reporte Planta",
            icon: <GiNotebook />
        },
        {
            path: "/molienda",
            name: "Reporte Molienda",
            icon: <HiClipboardDocumentList />
        },
        {
            path: "/existencia",
            name: "Reporte Existencia",
            icon: <SlBookOpen />
        },
        {
            path: "/horometros",
            name: "Horometros",
            icon: <MdLibraryBooks />
        },
        {
            path: "/reportem",
            name: "Informe Mensual",
            icon:<HiOutlineDocumentReport />
          
        },
        {
            path: "/graficos",
            name: "Graficos",
            icon:<AiFillSignal />
          
        },
        {
            path: "/modal",
            name: "Usuarios",
            icon: <FaUserCircle />
        },
        {
            path: "/close",
            name: "Configuracion",
            icon: <IoSettings />
          
        },
      



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
            <div style={{ width: isOpen ? "300px" : "50px" }} className='menu'>
                <div className='top_section'>
                    <img style={{ display: isOpen ? "block" : "none" }} src={Logo} alt='logomenu' />
                    <h1 style={{ display: isOpen ? "block" : "none" }} className='logo'>MINAR</h1>
                    <div style={{ marginLeft: isOpen ? "20px" : "0px" }} className='bars'>
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className='icon'>{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className='link_text'>{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>

            <main className='main'> {children}</main>




        </div>
    )
}

export default Menu
