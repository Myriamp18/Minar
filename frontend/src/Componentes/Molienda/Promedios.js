import React, { useEffect, useState } from 'react';
import '../Silos/Silos.css'
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Promedios() {
    const [data, setData] = useState([]);
   const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8081/promedios')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, [])

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/deletepromedios/${id}`)
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

    <h1>Promedios:</h1>
    <div className="close-button" onClick={() => navigate('/molienda')}>
        <FontAwesomeIcon icon={faTimes} />
        </div>
    <div className="text-center">
      <Link to="/createpromedios" className="btn btn-danger btn-lg font-weight-bold   text-lg" >
        <FontAwesomeIcon icon={faPlus} />Insertar</Link>
    </div>

    <div className='row mt-3'>
      {data.length !== 0 ?
        <div className='col-11 col-lg-8 offset-0 offset-lg-2'>
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
                        <th>P.ESPmo1</th>
                        <th>Malla200mo1</th>
                        <th>Malla325mo1</th>
                        <th>Calciosmo1</th>
                        <th>Humedadmo1</th>
                        <th>P.ESPmo2</th>
                        <th>Malla200mo2</th>
                        <th>Malla325mo2</th>
                        <th>Calciosmo2</th>
                        <th>Humedadmo2</th>
                      
                    </tr>
                  </thead>
                  <tbody className='table-group-divider'>
                    {data.map((d, i) => (
                      <tr key={i}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Link to={`/updatepromedios/${d.id}`} className='btn btn-warning'>
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
                          <td>{typeof d.pemolino1 === 'number' ? d.pemolino1.toFixed(2) : 'N/A'}</td>
                          <td>{typeof d.malla200mo1  === 'number' ? d.malla200mo1.toFixed(2) : 'N/A'}</td>
                          <td>{typeof d.malla325mo1 === 'number' ? d.malla325mo1.toFixed(2) : 'N/A'}</td>
                          <td>{typeof d.calciosmo1 === 'number' ? d.calciosmo1.toFixed(2) : 'N/A'}</td>
                          <td>{typeof d.humedadmo1 === 'number' ? d.humedadmo1.toFixed(2) : 'N/A'}</td>
                          <td>{typeof d.pemolino2  === 'number' ? d.pemolino2.toFixed(2) : 'N/A'}</td>
                          <td>{typeof d.malla200mo2  === 'number' ? d.malla200mo2.toFixed(2) : 'N/A'}</td>
                          <td>{typeof d.malla325mo2 === 'number' ? d.malla325mo2.toFixed(2) : 'N/A'}</td>
                          <td>{typeof d.calciosmo2  === 'number' ? d.calciosmo2.toFixed(2) : 'N/A'}</td>
                          <td>{typeof d.humedadmo2  === 'number' ? d.humedadmo2.toFixed(2) : 'N/A'}</td>


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

export default Promedios
