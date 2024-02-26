import React, { useEffect, useState } from 'react';
import '../Silos/Silos.css'
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom'

function MezclasMLT() {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8081/mmlt')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, [])

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/deletemmlt/${id}`)
      .then(res => {
        // Actualiza la lista de datos excluyendo el registro eliminado
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
  
       
      })
      .catch(err => console.log(err));
  };
  return (
    <>
   
    <h1>Mezclas MLT:</h1>
 
    <div className="text-center">
      <Link to="/createmmlt" className="btn btn-danger btn-lg font-weight-bold   text-lg" >
        <FontAwesomeIcon icon={faPlus} />Insertar</Link>
    </div>
    <div className="close-button" onClick={() => navigate('/mineral')}>
            <FontAwesomeIcon icon={faTimes} />
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
                  <th>Fecha</th>
                  <th>Entrada</th>
                  <th>Salida</th>
                  <th>P.ESP</th>
                  <th>Saldo</th>
                  <th></th>
 
                </tr>
              </thead>
              <tbody className='table-group-divider'>
               {data.map((d, i) => (
                  <tr key={i}>
                    <td>{d.id}</td>
                    <td>{d.fecha}</td>
                    <td>{typeof d.entradas === 'number' ? d.entradas.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.salidas === 'number' ? d.salidas.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pe === 'number' ? d.pe.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.saldo === 'number' ? d.saldo.toFixed(3) : 'N/A'}</td>
 
                  
 
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to={`/updatemmlt/${d.id}`} className='btn btn-warning'>
                          <i className='fa-solid fa-edit'></i>
                        </Link>
                        &nbsp;
 
                        <button className='btn btn-danger' onClick={() => handleDelete(d.id)}>
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

export default MezclasMLT
