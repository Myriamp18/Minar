import React, { useEffect, useState } from 'react';
import '../Silos/Silos.css'
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function Mesas() {
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        fetch('http://localhost:8081/reportediariomesas')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/deletediariomesas/${id}`)
            .then(res => {
                // Actualiza la lista de datos excluyendo el registro eliminado
                const updatedData = data.filter(item => item.id !== id);
                setData(updatedData);

                // Recalcula el saldo total con la lista actualizada
                calcularSaldoTotal(updatedData);
            })
            .catch(err => console.log(err));
    };
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
      };
    return (
        <>

            <h1>Mesas:</h1>
            <div className="close-button" onClick={() => navigate('/diario')}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className="text-center">
                <Link to="/createdmesas" className="btn btn-danger btn-lg font-weight-bold   text-lg" >
                    <FontAwesomeIcon icon={faPlus} />Insertar</Link>
            </div>

            <div className='row mt-3'>
                {data.length !== 0 ?
                    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
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
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr  >
                                                <th></th>
                                                <th>ID</th>
                                                <th>Fecha</th>
                                                <th>Turno</th>
                                                <th>Seleccion</th>
                                                <th>Alim1y2</th>
                                                <th>P.E</th>
                                                <th>Conc1y2</th>
                                                <th>P.E</th>
                                                <th>Medios1y2</th>
                                                <th>P.E</th>
                                                <th>Colas1y2</th>
                                                <th>P.E</th>

                                                <th>Alim3y4</th>
                                                <th>P.E</th>
                                                <th>Conc3y4</th>
                                                <th>P.E</th>
                                                <th>Medios3y4</th>
                                                <th>P.E</th>
                                                <th>Colas3y4</th>
                                                <th>P.E</th>

                                                <th>Alim5</th>
                                                <th>P.E</th>
                                                <th>Conc5</th>
                                                <th>P.E</th>
                                                <th>Medios5</th>
                                                <th>P.E</th>
                                                <th>Colas5</th>
                                                <th>P.E</th>

                                                <th>Alim6</th>
                                                <th>P.E</th>
                                                <th>Conc6</th>
                                                <th>P.E</th>
                                                <th>Medios6</th>
                                                <th>P.E</th>
                                                <th>Colas6</th>
                                                <th>P.E</th>




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
                                                                <Link to={`/updatemesas/${d.id}`} className='btn btn-warning'>
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
                                                        <td>{d.seleccion}</td>
                                                        <td>{typeof d.alimm12 === 'number' ? d.alimm12.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.peam12 === 'number' ? d.peam12.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.conm12 === 'number' ? d.conm12.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pecnm12 === 'number' ? d.pecnm12.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.mediom12 === 'number' ? d.mediom12.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pemm12 === 'number' ? d.pemm12.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.colasm12 === 'number' ? d.colasm12.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pecm12 === 'number' ? d.pecm12.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.alimm34 === 'number' ? d.alimm34.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.peam34 === 'number' ? d.peam34.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.conm34 === 'number' ? d.conm34.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pecnm34 === 'number' ? d.pecnm34.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.mediosm34 === 'number' ? d.mediosm34.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pemm34 === 'number' ? d.pemm34.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.colasm34 === 'number' ? d.colasm34.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pecm34 === 'number' ? d.pecm34.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.alimm5 === 'number' ? d.alimm5.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.peam5 === 'number' ? d.peam5.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.conm5 === 'number' ? d.conm5.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pecnm5 === 'number' ? d.pecnm5.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.mediosm5 === 'number' ? d.mediosm5.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pemm5 === 'number' ? d.pemm5.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.colasm5 === 'number' ? d.colasm5.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pecm5 === 'number' ? d.pecm5.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.alimm6 === 'number' ? d.alimm6.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.peam6 === 'number' ? d.peam6.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.conm6 === 'number' ? d.conm6.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pecnm6 === 'number' ? d.pecnm6.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.mediom6 === 'number' ? d.mediom6.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pemm6 === 'number' ? d.pemm6.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.colasm6 === 'number' ? d.colasm6.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pecm6 === 'number' ? d.pecm6.toFixed(2) : 'N/A'}</td>



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

export default Mesas
