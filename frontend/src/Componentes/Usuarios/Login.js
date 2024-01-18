import React, { useState } from 'react';
import './Login.css';
import Usuario_M from '../../assest/minero.jpg'
import Contra_L from '../../assest/candado.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();
  const [nombre, setNombre] = useState('')
  const [contra, setContra] = useState('')

  
  const onSubmit = (event) => {
   event.preventDefault();
   axios.post('http://localhost:8081/login', {nombre, contra})
   .then(res => console.log(res))
   .catch(err => console.log(err));
  }
  const onRegistro = () =>{
    navigate('/createusuario')
  }
  

  

  return (
    
    <div className="login-section">
      <div className='container'>
        <div className="header">
          <div className="text">LOGIN</div>
          <div className="underline"></div>
        </div>
        <form onClick={onSubmit}>
          <div className="pop">
            <div className="input">
              <img src={Usuario_M} alt='usuariologin' />
              <input type="usuario" size="sm"
                placeholder='Nombre de Usuario '
                onChange={e => setNombre(e.target.value)}
                name='nombreusuario'

              />
            </div>
            <br />
            <div className="input">
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
              <button className="submits"  >Iniciar Sesion</button>
              <button className="submits"  onClick={onRegistro}>Registarse</button>
            </div>
          </div>

        </form>



      </div>

    </div>
  );
};


export default Login;