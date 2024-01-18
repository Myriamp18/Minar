import React, { useState }  from 'react'
import './InsertarUsuarios.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'


function InsertarUsuario() {

    const [values, setValues] = useState({
        nombrecompleto: "",
        telefono: "",
        cargo: "",
        nombreusuario: "",
        contra: ""
    
      })

      const navigate = useNavigate()

      const handleSubmit =(e) => {
        e.preventDefault()
        axios.post('http://localhost:8081/createusuarios', values)
        .then(res => {
          console.log(res);
          // Optionally, you can navigate to a different page or update the UI
          navigate('/'); // Example: Navigate to the home page
        })
        .catch(err => console.log(err));
    };
    return (

        <div className="registrar-section">
            <div className='containers'>
                <div className="headerst">
                    <div className="textst">REGISTRARSE</div>
                    <div className="underlinest"></div>
                </div>
                <form >
                    <div className="pop">
                        <div className="input">

                            <input type="text" size="sm"
                                placeholder='Nombre de Completo '
                                name='nombrecompleto'
                                onChange={(e) => setValues({...values, nombrecompleto: e.target.value})}

                            />
                        </div>
                       
                        <div className="input">

                            <input type="text" size="sm"
                                placeholder='Numero Telefonico '
                                name='telefono'
                                onChange={(e) => setValues({...values, telefono: e.target.value})}

                            />
                        </div>
                        
                        <div className="input">

                            <input type="text" size="sm"
                                placeholder='Cargo '
                                name='cargo'
                                onChange={(e) => setValues({...values, cargo: e.target.value})}

                            />
                        </div>
                        <div className="input">

                            <input type="text" size="sm"
                                placeholder='Nombre de Usuario '
                                name='nombreusuario'
                                onChange={(e) => setValues({...values, nombreusuario: e.target.value})}

                            />
                        </div>
                        
                        <div className="input">

                            <input type="password"
                                placeholder='Contraseña'
                                name='contra'
                                onChange={(e) => setValues({...values, contra: e.target.value})}

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
