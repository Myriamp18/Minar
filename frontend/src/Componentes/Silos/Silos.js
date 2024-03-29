import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Silos.css'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Silos = () => {

  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/silos')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, [])

  const handleDelete = (id_silos) => {
    axios.delete(`http://localhost:8081/delete/${id_silos}`) // Realiza una solicitud DELETE al servidor para eliminar el registro con el ID proporcionado
      .then(res => {
        // Si la solicitud se completa con éxito, actualiza la lista de datos excluyendo el registro eliminado
        const updatedData = data.filter(item => item.id_silos !== id_silos); // Filtra los datos para excluir el registro eliminado
        setData(updatedData); // Actualiza el estado de los datos con la nueva lista excluyendo el registro eliminado
      })
      .catch(err => console.log(err)); // Maneja cualquier error que ocurra durante la solicitud DELETE
};

const handleSearch = (event) => {
  setSearchTerm(event.target.value.toLowerCase());
};

  return (
    <div className='justify-content flex-end '>

      <h1>Minerales Silos:</h1>
      <div className="close-button" onClick={() => navigate('/pt')}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <div className="text-center">
        <Link to="/create" className="btn btn-danger btn-lg font-weight-bold   text-lg" >
          <FontAwesomeIcon icon={faPlus} />Insertar</Link>
      </div>
      <div className='row mt-3 '>
        {data.length !== 0 ?
          <div className='col-12 col-lg-8 offset-0 offset-lg-2 '>
             <div className='table-container'> 
            <div className='table-top-scroll'> {/* Nuevo contenedor */}
              <div className='table-responsive'>
              <div className="input-group">
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Buscar...'
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                </div>
                <table class="table table-bordered">
                  <thead>
                    <tr  >
                      <th></th>
                      <th>ID</th>
                      <th>Fecha</th>
                      <th>Silo 1</th>
                      <th>P.ESP</th>
                      <th>Silo 2</th>
                      <th>P.ESP</th>
                      <th>Silo 3</th>
                      <th>P.ESP</th>
                      <th>Silo 4</th>
                      <th>P.ESP</th>
                      <th>Silo 5</th>
                      <th>P.ESP</th>
                      
                    </tr>
                  </thead>
                  <tbody className='table-group-divider'>
                    {data
                      .filter(d => {
                        // Filtra los datos según el término de búsqueda en cualquier columna
                        return Object.values(d).some(value =>
                          value.toString().toLowerCase().includes(searchTerm)
                        );
                      })
                      .map((d, i) => (
                      <tr key={i}>
                         <td>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Link to={`/update/${d.id_silos}`} className='btn btn-warning'>
                              <i className='fa-solid fa-edit'></i>
                            </Link>
                            &nbsp;

                            <button className='btn btn-danger' onClick={() => handleDelete(d.id_silos)}>
                              <i className='fa-solid fa-trash'></i>
                            </button>
                          </div>

                        </td>
                        <td>{d.id_silos}</td>
                        <td>{d.fecha}</td>
                        <td>{typeof d.silo1 === 'number' ? d.silo1.toFixed(3) : 'N/A'}</td>
                        <td>{typeof d.pes1 === 'number' ? d.pes1.toFixed(2) : 'N/A'}</td>
                        <td>{typeof d.silo2 === 'number' ? d.silo2.toFixed(3) : 'N/A'}</td>
                        <td>{typeof d.pes2 === 'number' ? d.pes2.toFixed(2) : 'N/A'}</td>
                        <td>{typeof d.silo3 === 'number' ? d.silo3.toFixed(3) : 'N/A'}</td>
                        <td>{typeof d.pes3 === 'number' ? d.pes3.toFixed(2) : 'N/A'}</td>
                        <td>{typeof d.silo4 === 'number' ? d.silo4.toFixed(3) : 'N/A'}</td>
                        <td>{typeof d.pes4 === 'number' ? d.pes4.toFixed(2) : 'N/A'}</td>
                        <td>{typeof d.silo5 === 'number' ? d.silo5.toFixed(3) : 'N/A'}</td>
                        <td>{typeof d.pes5 === 'number' ? d.pes5.toFixed(2) : 'N/A'}</td>


                       
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
        
    </div>
      );
};

      export default Silos;
