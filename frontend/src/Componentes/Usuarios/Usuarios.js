import React, { useEffect, useState } from 'react';
import '../Silos/Silos.css'
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';


function Usuarios() {
    const [data, setData] = useState([]);
    const navigate = useNavigate()
  
    useEffect(() => {
      fetch('http://localhost:8081/usuarios')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, [])
  
    const handleDelete = (id_usuarios ) => {
        axios.delete(`http://localhost:8081/deleteusuarios/${id_usuarios }`) // Realiza una solicitud DELETE al servidor para eliminar el registro con el ID proporcionado
          .then(res => {
            // Si la solicitud se completa con éxito, actualiza la lista de datos excluyendo el registro eliminado
            const updatedData = data.filter(item => item.id_usuarios  !== id_usuarios ); // Filtra los datos para excluir el registro eliminado
            setData(updatedData); // Actualiza el estado de los datos con la nueva lista excluyendo el registro eliminado
          })
          .catch(err => console.log(err)); // Maneja cualquier error que ocurra durante la solicitud DELETE
    };
  return (
    <>
       
    <h1>Usuarios:</h1>

    <div className="text-center">
      <Link to="/createusuario" className="btn btn-danger btn-lg font-weight-bold   text-lg" >
        <FontAwesomeIcon icon={faPlus} />Agregar Nuevo Usuario</Link>
    </div>
   
    <div className='row mt-3'>
      {data.length !== 0 ?
        <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
        <div className='table-container'>
          <div className='table-top-scroll'> {/* Nuevo contenedor */}
            <div className='table-responsive'>

              <table class="table table-bordered">
              <thead>
                <tr  >
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Telefono</th>
                  <th>Cargo</th>
                  <th>Nombre Usuario</th>
                  <th>Contra</th>
                  <th>Codif</th>
                  <th></th>

                </tr>
              </thead>
              <tbody className='table-group-divider'>
               {data.map((d, i) => (
                  <tr key={i}>
                    <td>{d.id_usuarios}</td>
                    <td>{d.nombrecompleto}</td>
                    <td>{d.telefono}</td>
                    <td>{d.cargo}</td>
                    <td>{d.nombreusuario}</td>
                    <td>{d.contra}</td>
                    <td>{d.codif}</td>
                   

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to={`/updateusuario/${d.id_usuarios}`} className='btn btn-warning'>
                          <i className='fa-solid fa-edit'></i>
                        </Link>
                        &nbsp;

                        <button className='btn btn-danger' onClick={() => handleDelete(d.id_usuarios)}>
                          <i className='fa-solid fa-trash'></i>
                        </button>
                      </div>

                    </td>
                  </tr>
                ))}

                {/* Puedes agregar más filas según sea necesario */}
              </tbody>
            </table>

          </div>
          </div>
          </div>
        </div>
        : <h2 className='aling-itemns-center'>Sin Datos</h2>
      }
    </div>
  </>
  )
}

export default Usuarios
