import React, { useEffect, useState } from 'react';
import '../Silos/Silos.css'
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Medios4() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
  
  useEffect(() => {
    fetch('http://localhost:8081/medios4')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, [])
  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/deletemedios4/${id}`)
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
   
    <h1>Medios Conc 4.00:</h1>
    <div className="close-button" onClick={() => navigate('/medios')}>
            <FontAwesomeIcon icon={faTimes} />
            </div>
    <div className="text-center">
      <Link to="/createmedios4" className="btn btn-danger btn-lg font-weight-bold   text-lg" >
        <FontAwesomeIcon icon={faPlus} />Insertar</Link>
    </div>
    <div className='row mt-3'>
      {data.length !== 0 ?
        <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
          <div>
          <div className='table-container'> 
            <div className='table-top-scroll'> {/* Nuevo contenedor */}
              <div className='table-responsive'>
            <table className="table table-bordered">
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
                    <td>{d.entradas.toFixed(3)}</td>
                    <td>{d.salidas.toFixed(3)}</td>
                    <td>{d.pe.toFixed(2)}</td>
                    <td>{d.saldo.toFixed(3)}</td>

                  

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to={`/updatemedios4/${d.id}`} className='btn btn-warning'>
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
        </div>
        : <h2 className='aling-itemns-center'>Sin Datos</h2>
      }
    </div>
    </>
  )
}

export default Medios4


