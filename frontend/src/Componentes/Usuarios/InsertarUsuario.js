import React, { useState } from 'react'
import './InsertarUsuarios.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Nombre from '../../assest/programador.png'
import Telefono from '../../assest/telefono.png'
import Ingeniero from '../../assest/ingeniero.png'
import Usuario_M from '../../assest/minero.jpg'
import Contra_L from '../../assest/candado.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function InsertarUsuario() {

    const [values, setValues] = useState({
        nombrecompleto: "",
        telefono: "",
        cargo: "",
        nombreusuario: "",
        contra: "",
        codif: ""

    })

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validateInputs()) {
            alert('Por favor, complete todos los campos.'); // Muestra un mensaje de error
            return;
        }
        axios.post('http://localhost:8081/createusuarios', values)
            .then(res => {
                console.log(res);
                // Optionally, you can navigate to a different page or update the UI
                navigate('/usuarios'); // Example: Navigate to the home page
            })
            .catch(err => console.log(err));
    };

    const validateInputs = () => {
        // Verifica si algún campo está vacío
        for (let value of Object.values(values)) {
            if (value.trim() === '') {
                return false;
            }
        }
        return true;
    };

    return (

        <div className="registrar-section">

            <div className='containerregistro'>
                <div className="headerregistro">
                    <div className="textregistro">REGISTRARSE</div>
                    <div className="close-button" onClick={() => navigate('/usuarios')}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <div className="underlineregistro"></div>
                </div>
                <form >
                    <div className="pop">
                        <div className="inputregistro">
                            <img src={Nombre} alt='programador' />
                            <input type="text" size="sm"
                                placeholder='Nombre Completo '
                                name='nombrecompleto'
                                required
                                onChange={(e) => setValues({ ...values, nombrecompleto: e.target.value })}

                            />
                        </div>
                        <div className="inputregistro">
                            <img src={Telefono} alt='telefono' />
                            <input type="text" size="sm"
                                placeholder='Numero Telefonico '
                                name='telefono'
                                required
                                onChange={(e) => setValues({ ...values, telefono: e.target.value })}

                            />
                        </div>

                        <div className="inputregistro">
                            <img src={Ingeniero} alt='ingeniero' />
                            <input type="text" size="sm"
                                placeholder='Cargo '
                                name='cargo'
                                required
                                onChange={(e) => setValues({ ...values, cargo: e.target.value })}

                            />
                        </div>
                        <div className="inputregistro">
                            <img src={Usuario_M} alt='usuariologin' />
                            <input type="text" size="sm"
                                placeholder='Nombre de Usuario '
                                name='nombreusuario'
                                required
                                onChange={(e) => setValues({ ...values, nombreusuario: e.target.value })}

                            />
                        </div>
                        <div className="inputregistro">
                            <img src={Contra_L} alt='contraseñalogin' />
                            <input type="password"
                                placeholder='Contraseña'
                                name='contra'
                                required
                                onChange={(e) => setValues({ ...values, contra: e.target.value })}

                            />
                        </div>
                        <div className="inputregistro">
                            <img src={Contra_L} alt='contraseñalogin' />
                            <input type="password"
                                placeholder='Codif'
                                name='contra'
                                required
                                onChange={(e) => setValues({ ...values, codif: e.target.value })}

                            />
                        </div>
                    </div>
                    <br />

                    <div className="forgot-registrar">
                        <div className="submit-registrar">
                            <button className="registrarse" onClick={handleSubmit} >Registrar</button>

                        </div>
                    </div>

                </form>



            </div>

        </div>
    )
}

export default InsertarUsuario
