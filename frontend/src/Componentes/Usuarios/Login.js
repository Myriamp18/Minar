import React, { useState } from 'react';
import './Login.css';
import Usuario_M from '../../assest/minero.jpg'
import Contra_L from '../../assest/candado.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();
  const [nombreusuario, setNombreUsuario] = useState('')
  const [contra, setContra] = useState('')

  
  const onSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/login', { nombreusuario, contra })
      .then(res => {
        // Assuming the server responds with a property like 'success' or 'error'
        if (nombreusuario && contra) {
          console.log(res);
          navigate('/Inicio');
        } else {
          console.log("Login failed");
          // Handle login failure, show an error message, etc.
        }
      })
      .catch(err => console.log(err));
  }
  
  const onRegistro = () =>{
    navigate('/createusuario')
  }
  

  

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
                onChange={e => setNombreUsuario(e.target.value)}
                name='nombreusuario'

              />
            </div>
            <br />
            <div className="inputlogin">
              <img src={Contra_L} alt='contraseñalogin' />
              <input type="password"
                placeholder='Contraseña'
                
                onChange={e => setContra(e.target.value)}
                name='contra'

              />
            </div>
          </div>
          <br />

          <div className="forgot-password">
            <div className="submit-container">
              <button className="submits" onClick={onSubmit} >Iniciar Sesion</button>
              <button className="submits"  onClick={onRegistro}>Registarse</button>
            </div>
          </div>

        </form>



      </div>

    </div>
  );
};


export default Login;