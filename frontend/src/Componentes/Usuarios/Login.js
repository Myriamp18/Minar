import React, { useState, useEffect } from 'react';
import './Login.css';
import Usuario_M from '../../assest/minero.jpg';
import Contra_L from '../../assest/candado.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [nombreusuario, setNombreUsuario] = useState('');
  const [contra, setContra] = useState('');
  const [error, setError] = useState('');

  

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!nombreusuario || !contra) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/login', {
        nombreusuario: nombreusuario,
        contra: contra,
      });

      const data = response.data;
      console.log('Respuesta del servidor:', data);
      if (data.success) {
        console.log('Inicio de sesión exitoso:', data.message);

        // Establecer el estado de inicio de sesión y guardar en localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('nombreusuario', nombreusuario);

        // Redirigir al usuario a la página de inicio después del inicio de sesión
        navigate('/Inicio');
      } else {
        setError(data.message || 'Error al iniciar sesión. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };
  
  return (
    <div className="login-section">
      <div className='containerlogin'>
        <div className="headerlogin">
          <div className="textlogin">LOGIN</div>
          <div className="underlinelogin"></div>
        </div>
        <form>
          <div className="pop">
            <div className="inputlogin">
              <img src={Usuario_M} alt='usuariologin' />
              <input type="usuario" size="sm"
                placeholder='Nombre de Usuario '
                required
                value={nombreusuario}
                onChange={e => setNombreUsuario(e.target.value)}
                name='nombreusuario'
              />
            </div>
            <br />
            <div className="inputlogin">
              <img src={Contra_L} alt='contraseñalogin' />
              <input type="password"
                required
                placeholder='Contraseña'
                value={contra}
                onChange={e => setContra(e.target.value)}
                name='contra'
              />
            </div>
          </div>
          <br />
          {error && <div className="error">{error}</div>}
          <div className="forgot-password">
            <div className="submit-container">
              <button className="submits" onClick={onSubmit}>Iniciar Sesion</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
