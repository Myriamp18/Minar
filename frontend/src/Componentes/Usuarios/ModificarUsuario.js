import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Nombre from '../../assest/programador.png'
import Telefono from '../../assest/telefono.png'
import Ingeniero from '../../assest/ingeniero.png'
import Usuario_M from '../../assest/minero.jpg'
import Contra_L from '../../assest/candado.jpg'

function ModificarUsuario() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        nombrecompleto: "",
        telefono: "",
        cargo: "",
        nombreusuario: "",
        contra: "",
        codif: ""

    })

    const [error, setError] = useState(null); // Estado para manejar errores

    const handleSubmit = (e) => {
      e.preventDefault()
      axios.put(`http://localhost:8081/updateusuarios/${id}`, values)

          .then(res => {
              console.log(res);
              // Optionally, you can navigate to a different page or update the UI
              navigate('/usuarios'); // Example: Navigate to the home page
          })
          .catch(err => console.log(err));
  };
  useEffect(() => {
    axios.get(`http://localhost:8081/getrecordusuarios/${id}`)
        .then((res) => {
            const data = res.data[0];
            setValues({
                nombrecompleto: data.nombrecompleto,
                telefono: data.telefono,
                cargo: data.cargo,
                nombreusuario: data.nombreusuario,
                contra: data.contra,
                codif: data.codif,
            });
        })
        .catch(err => console.error(err));
}, [id]);
  return (
    <div className="registrar-section">

    <div className='containerregistro'>
        <div className="headerregistro">
            <div className="textregistro">MODIFICAR</div>
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
                        value={values.nombrecompleto}
                        onChange={(e) => setValues({ ...values, nombrecompleto: e.target.value })}

                    />
                </div>
                <div className="inputregistro">
                    <img src={Telefono} alt='telefono' />
                    <input type="text" size="sm"
                        placeholder='Numero Telefonico '
                        name='telefono'
                        required
                        value={values.telefono}
                        onChange={(e) => setValues({ ...values, telefono: e.target.value })}

                    />
                </div>

                <div className="inputregistro">
                    <img src={Ingeniero} alt='ingeniero' />
                    <input type="text" size="sm"
                        placeholder='Cargo '
                        name='cargo'
                        required
                        value={values.cargo}
                        onChange={(e) => setValues({ ...values, cargo: e.target.value })}

                    />
                </div>
                <div className="inputregistro">
                    <img src={Usuario_M} alt='usuariologin' />
                    <input type="text" size="sm"
                        placeholder='Nombre de Usuario '
                        name='nombreusuario'
                        required
                        value={values.nombreusuario}
                        onChange={(e) => setValues({ ...values, nombreusuario: e.target.value })}

                    />
                </div>
                <div className="inputregistro">
                    <img src={Contra_L} alt='contraseñalogin' />
                    <input type="password"
                        placeholder='Contraseña'
                        name='contra'
                        required
                        value={values.contra}
                        onChange={(e) => setValues({ ...values, contra: e.target.value })}

                    />
                </div>
                <div className="inputregistro">
                    <img src={Contra_L} alt='contraseñalogin' />
                    <input type="password"
                        placeholder='Codif'
                        name='contra'
                        required
                        value={values.codif}
                        onChange={(e) => setValues({ ...values, codif: e.target.value })}

                    />
                </div>
            </div>
            <br />

            <div className="forgot-registrar">
                <div className="submit-registrar">
                    <button className="registrarse" onClick={handleSubmit} >MODIFICAR</button>

                </div>
            </div>

        </form>



    </div>

</div>
  )
}

export default ModificarUsuario
