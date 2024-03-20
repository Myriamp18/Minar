import React, { useEffect, useState } from 'react';
import '../Silos/Silos.css'
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';




function Usuarios() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8081/usuarios')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id_usuarios) => {
    axios.delete(`http://localhost:8081/deleteusuarios/${id_usuarios}`)
      .then(res => {
        const updatedData = data.filter(item => item.id_usuarios !== id_usuarios);
        setData(updatedData);
      })
      .catch(err => console.log(err));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <>
      <h1>Usuarios:</h1>

      <div className="text-center">
        <Link to="/createusuario" className="btn btn-danger btn-lg font-weight-bold text-lg">
          <FontAwesomeIcon icon={faPlus} />Agregar Nuevo Usuario
        </Link>
      </div>

      <div className='row mt-3'>
        <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
          <div className='table-container'>
            <div className='table-top-scroll'>
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
                <table className="table table-bordered">
                  <thead>
                    <tr>
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
                    {data
                      .filter(d => {
                        // Filtra los datos según el término de búsqueda en cualquier columna
                        return Object.values(d).some(value =>
                          value.toString().toLowerCase().includes(searchTerm)
                        );
                      })
                      .map((d, i) => (
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
                              <Link to={`/updateusuarios/${d.id_usuarios}`} className='btn btn-warning'>
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Usuarios;
