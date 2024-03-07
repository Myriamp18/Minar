import React, { useEffect, useState } from 'react';
import '../Silos/Silos.css'
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function HorometroM34() {
    const [data, setData] = useState([]);
    const navigate = useNavigate()
  
    useEffect(() => {
      fetch('http://localhost:8081/hmesa34')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, [])
  
    const handleDelete = (id) => {
      axios.delete(`http://localhost:8081/deletehmesa34/${id}`)
        .then(res => {
          // Actualiza la lista de datos excluyendo el registro eliminado
          const updatedData = data.filter(item => item.id !== id);
          setData(updatedData);
  
          // Recalcula el saldo total con la lista actualizada
          calcularSaldoTotal(updatedData);
        })
        .catch(err => console.log(err));
    };
    

  return (
    <>

    <h1>Horomero Mesas 3y4:</h1>
    <div className="close-button" onClick={() => navigate('/horometros')}>
        <FontAwesomeIcon icon={faTimes} />
        </div>
    <div className="text-center">
      <Link to="/createhmesa34" className="btn btn-danger btn-lg font-weight-bold   text-lg" >
        <FontAwesomeIcon icon={faPlus} />Insertar</Link>
    </div>

    <div className='row mt-3'>
      {data.length !== 0 ?
        <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
          <div className='table-container'>
            <div className='table-top-scroll'> {/* Nuevo contenedor */}
              <div className='table-responsive'>
                <table className="table table-bordered">
                  <thead>
                    <tr  >
                    <th></th>

                      <th>ID</th>
                      <th>Fecha</th>
                      <th>Turno</th>
                      <th>Inicio</th>
                      <th>Final</th>
                      <th>Horas</th>
                      <th>TotalHoras</th>
                     


                      
                    </tr>
                  </thead>
                  <tbody className='table-group-divider'>
                    {data.map((d, i) => (
                      <tr key={i}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Link to={`/updatehmesa34/${d.id}`} className='btn btn-warning'>
                              <i className='fa-solid fa-edit'></i>
                            </Link>
                            &nbsp;

                            <button className='btn btn-danger' onClick={() => handleDelete(d.id)}>
                              <i className='fa-solid fa-trash'></i>
                            </button>
                          </div>

                        </td>
                        <td>{d.id}</td>
                        <td>{d.fecha}</td>
                        <td>{d.turno}</td>
                        <td>{d.inicio}</td>
                        <td>{d.final}</td>
                        <td>{d.hrs}</td>
                        <td>{d.totalhrs}</td>
                       


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

export default HorometroM34
