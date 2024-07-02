import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './Modals.css'

function Modal() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Aquí puedes agregar la lógica para verificar la contraseña
      // Por ejemplo, comparar con una contraseña predefinida
      if (password === 'minar2024') {
        alert('Contraseña correcta. Acceso permitido.');
        navigate ('/usuarios')
        // Aquí puedes agregar lógica para lo que sucede después de que se verifique la contraseña
      } else {
        alert('Contraseña incorrecta. Inténtalo de nuevo.');
        setPassword('');
      }
    };
  return (
    <div className=''>
    <h2>Autorización:</h2>
        <div className='modales'>
       
        <form onSubmit={handleSubmit}>
          <label type="password">Contraseña:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={handlePasswordChange} 
            required 
          />
          <button type="submit">Ingresar</button>
        </form>
        </div>
    </div>

  );
};

export default Modal;
