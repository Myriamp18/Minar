import React, { useEffect, useState } from 'react';
import '../Silos/Silos.css'
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Mezclas() {

  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8081/mezclasmolienda')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, [])

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/deletemezclasmolienda/${id}`)
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

      <h1>Mezclas:</h1>
      <div className="close-button" onClick={() => navigate('/molienda')}>
          <FontAwesomeIcon icon={faTimes} />
          </div>
      <div className="text-center">
        <Link to="/createmezclasmolienda" className="btn btn-danger btn-lg font-weight-bold   text-lg" >
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
                        <th>Conc.Mesas</th>
                        <th>P.ESP</th>
                        <th>Medios</th>
                        <th>P.ESP</th>
                        <th>Conc.Jigs</th>
                        <th>P.ESP</th>
                        <th>Desensolvez</th>
                        <th>P.ESP</th>
                        <th>Mezcla Total</th>
                        <th>P.ESP</th>
                        <th>Otras Salidas</th>

                        
                      </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                      {data.map((d, i) => (
                        <tr key={i}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Link to={`/updatemezclasmolienda/${d.id}`} className='btn btn-warning'>
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
                          <td>{typeof d.concmesas === 'number' ? d.concmesas.toFixed(3) : 'N/A'}</td>
                          <td>{d.pecm}</td>
                          <td>{typeof d.concjigs === 'number' ? d.concjigs.toFixed(3) : 'N/A'}</td>
                          <td>{ d.pejig}</td>
                          <td>{typeof d.medios === 'number' ? d.medios.toFixed(3) : 'N/A'}</td>
                          <td>{ d.pem}</td>
                          <td>{typeof d.desenslovez === 'number' ? d.desenslovez.toFixed(3) : 'N/A'}</td>
                          <td>{ d.pedese}</td>
                          <td>{typeof d.mezclatotal === 'number' ? d.mezclatotal.toFixed(3) : 'N/A'}</td>
                          <td>{typeof d.pemt === 'number' ? d.pemt.toFixed(3) : 'N/A'}</td>
                          <td>{ d.otrassalidas}</td>


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

export default Mezclas
