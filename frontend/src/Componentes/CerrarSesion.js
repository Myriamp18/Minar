import React, { useState, useEffect } from 'react';
import './Modal.css'; // Estilos CSS para el modal
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Usuario_M from '../assest/casco.png';

function CerrarSesion() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const nombreusuario = localStorage.getItem('nombreusuario');
    
    if (nombreusuario) {
      axios.get(`http://localhost:8081/getusuarios/${nombreusuario}`)
      .then(response => {
        console.log('Datos recibidos:', response.data);
    
        // Verifica la estructura de los datos en la consola
        console.log('Propiedades de los datos:', Object.keys(response.data[0]));
    
        // Verifica si las propiedades específicas están presentes en el primer objeto del array
        console.log('¿nombrecompleto está presente?', 'nombrecompleto' in response.data[0]);
        console.log('¿telefono está presente?', 'telefono' in response.data[0]);
        console.log('¿cargo está presente?', 'cargo' in response.data[0]);
    
        // Establece los datos del usuario (primero, extrae el primer objeto del array)
        setUserData(response.data[0]);
      })
      .catch(error => {
        console.error('Error al obtener los datos del usuario:', error);
      });
    } else {
      console.error('El nombre de usuario en localStorage es null.');
    }
  }, []); 


  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('nombreusuario');
    navigate('/');
  };

  return (
    <div className="container">

      {userData ? (
        <div>
            <img src={ Usuario_M} alt="Avatar" className="avatar" /> {/* Imagen del usuario o imagen por defecto */}
          <h2 className="nombrecompleto">Nombre Completo: {userData.nombrecompleto}</h2>
          <p className="telefono">Telefono: {userData.telefono}</p>
          <p className="cargo">Puesto: {userData.cargo}</p>
          <button className="button" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
    </div>
  );
}


export default CerrarSesion;
