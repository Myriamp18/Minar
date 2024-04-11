import React, { useState } from 'react';
import './olvcontra.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom'
import Contra_L from '../../assest/candado.jpg';
function OlvContra() {
    const navigate=useNavigate();
    const [codif, setCodif] = useState('');
    const [retrievedPassword, setRetrievedPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleVerificationCodeChange = (e) => {
        setCodif(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8081/getrecordusuarioscontra/${codif}`);
            console.log('Respuesta del servidor:', response);
            const data = await response.json();
            console.log('Datos recibidos:', data);

            if (response.ok) {
                if (data && data.length > 0 && data[0].contra) {
                    console.log('Contraseña recuperada:', data[0].contra);
                    setRetrievedPassword(data[0].contra);
                    setErrorMessage('');
                } else {
                    console.log('No se encontró ninguna contraseña en los datos recibidos');
                    setRetrievedPassword('');
                    setErrorMessage('No se encontró ninguna contraseña para el código proporcionado.');
                }
            } else {
                const error = data && data.message ? data.message : 'Error al verificar el código.';
                setErrorMessage(error);
                setRetrievedPassword('');
            }
        } catch (error) {
            console.error('Error al verificar el código:', error);
            setErrorMessage('Ocurrió un error al verificar el código. Por favor, inténtalo de nuevo.');
            setRetrievedPassword('');
        }
    };


    const handleBackToLogin = () => {
        navigate('/')
    };

    return (
        <div className='reccontra'>
        <div className="password-recovery-container"> {/* Clase CSS para contenedor principal */}
            <div className="textlogincontra">Recuperar Contraseña</div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="verificationCode">Código de verificación:</label>
                <div className="inputloginrec">
                <img src={Contra_L} alt='contraseñalogin' />
                <input
                    type="text"
                    id="verificationCode"
                    value={codif}
                    placeholder='Inserte su Codif'
                    onChange={handleVerificationCodeChange}
                    required
                />
                </div>
                <button type="submit">Verificar</button>
            </form>
            {retrievedPassword && (
                <div className="password-retrieved"> {/* Clase CSS para contenedor de contraseña */}
                    <p>La contraseña es: {retrievedPassword}</p>
                </div>
            )}
            {!retrievedPassword && (
                <div className="error-message"> {/* Clase CSS para contenedor de mensaje de error */}
                    <p>{errorMessage}</p>
                </div>
            )}
            <button onClick={handleBackToLogin} className="back-to-login-button">
                <FontAwesomeIcon icon={faArrowLeft}/> Volver a login
            </button>

        </div>
        </div>
    );
}


export default OlvContra;
