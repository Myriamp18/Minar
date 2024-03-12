import React, { useEffect, useState } from 'react';
import '../Silos/Silos.css'
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Horno() {
    const [data, setData] = useState([]);
    const navigate = useNavigate()
  
    useEffect(() => {
      fetch('http://localhost:8081/horno')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, [])
  
    const handleDelete = (id) => {
      axios.delete(`http://localhost:8081/deletehorno/${id}`)
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

    <h1>Molienda Barita:</h1>
    <div className="close-button" onClick={() => navigate('/horometros')}>
        <FontAwesomeIcon icon={faTimes} />
        </div>
    <div className="text-center">
      <Link to="/createhorno" className="btn btn-danger btn-lg font-weight-bold   text-lg" >
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
                      <th>Quebradora</th>
                      <th>Horno.R</th>
                      <th>ELV.Molinos</th>
                      <th>Colector.P</th>
                      <th>ELV.Ensacadora</th>
                      <th>Ensacadora.No1</th>
                      <th>ELV.Silos</th>
                      <th>Gusano.F1</th>
                      <th>Gusano.F5</th>
                      <th>Quebradora.P</th>
                      <th>Observaciones</th>
                      
                    </tr>
                  </thead>
                  <tbody className='table-group-divider'>
                    {data.map((d, i) => (
                      <tr key={i}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Link to={`/updatehorno/${d.id}`} className='btn btn-warning'>
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
                        <td>{d.quebradora}</td>
                        <td>{d.hrotatorio}</td>
                        <td>{d.elvmolinos}</td>
                        <td>{d.colectoresp}</td>
                        <td>{d.ensacadora}</td>
                        <td>{d.ensacadora1}</td>
                        <td>{d.elvsilos}</td>
                        <td>{d.gusanof1}</td>
                        <td>{d.gusanof5}</td>
                        <td>{d.quebradorapr}</td>
                        <td>{d.notas}</td>


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

export default Horno
