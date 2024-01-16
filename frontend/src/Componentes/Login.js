import React, {  } from 'react';
import './Login.css';
import Usuario_M from '../assest/minero.jpg'
import Contra_L from '../assest/candado.jpg'
import { useNavigate } from 'react-router-dom';

const Login =() => {

  const navigate =useNavigate();

   const handlesesion = () =>{
    navigate('/Inicio')
   }

    return (
        <div className="login-section">
        <div className='container'>
        <div className="header">
        <div className="text">LOGIN</div>
                <div className="underline"></div>
                </div>
      <form >
      <div className="pop">
      <div className="input">
                        <img src={Usuario_M} alt='usuariologin'/>
                        <input type="usuario" size="sm" 
                         placeholder='Nombre de Usuario '
                         
                         />
                        </div>
        <br />
        <div className="input">
                        <img  src={Contra_L}alt='contraseñalogin'/>
                        <input type="password"
                         placeholder='Contraseña'
                         
                           />
                    </div>
                    </div>
        <br />
      
        <div className="forgot-password">
            <div className="submit-container">
                <button className="submits" onClick={handlesesion} >Iniciar Sesion</button>
                <button className="submits" >Registarse</button>
            </div>
            </div>
         
      </form>

      
     
    </div>

    </div>
  );
};
 

export default Login;