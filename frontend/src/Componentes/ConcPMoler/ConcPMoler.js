import React, { useEffect, useState } from 'react';
import '../Silos/Silos.css'
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'


function ConcPMoler() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/concpmoler')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, [])

  const handleDelete = (id) =>{
    axios.delete('http://localhost:8081/deleteconcpmoler/'+id)
    .then(res => window.location.reload())
    .catch(err => console.log(err))
  }
  return (
    <>
   
    <h1>Conc. P/Moler:</h1>

    <div className="text-center">
      <Link to="/createconcpmoler" className="btn btn-danger btn-lg font-weight-bold   text-lg" >
        <FontAwesomeIcon icon={faPlus} />Insertar</Link>
    </div>
    <div className='row mt-3'>
      {data.length !== 0 ?
        <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
          <div className="table-responsive">

            <table class="table">
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
                    <td>{d.entrada.toFixed(3)}</td>
                    <td>{d.salida.toFixed(3)}</td>
                    <td>{d.pesp.toFixed(2)}</td>
                    <td>{d.saldo.toFixed(3)}</td>
                  

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to={`/updateconcpmoler/${d.id}`} className='btn btn-warning'>
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
        : <h2 className='aling-itemns-center'>Sin Datos</h2>
      }
    </div>
  </>
  )
}

export default ConcPMoler
