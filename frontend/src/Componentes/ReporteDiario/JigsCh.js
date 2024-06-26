import React, { useEffect, useState } from 'react';
import '../Silos/Silos.css'
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function JigsCh() {
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:8081/reportediariojch')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/deletediariojigsch/${id}`)
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

            <h1>JIG´SS Chinos:</h1>
            <div className="close-button" onClick={() => navigate('/diario')}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className="text-center">
                <Link to="/createdjigsch" className="btn btn-danger btn-lg font-weight-bold   text-lg" >
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
                                                <th>Horas</th>
                                                <th>AlimJCH</th>
                                                <th>P.E</th>
                                                <th>GranoJCH</th>
                                                <th>P.E</th>
                                                <th>DesenJCH</th>
                                                <th>P.E</th>
                                                <th>ColasJCH</th>
                                                <th>P.E</th>
                                                <th>Horas</th>
                                                <th>AlimJSEC</th>
                                                <th>P.E</th>
                                                <th>Conc.JSEC</th>
                                                <th>P.E</th>
                                                <th>ColasJSEC</th>
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
                                                                <Link to={`/updatejigsch/${d.id}`} className='btn btn-warning'>
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
                                                        <td>{d.horasjch}</td>
                                                        <td>{typeof d.alimjch === 'number' ? d.alimjch.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.peajch === 'number' ? d.peajch.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.granojch === 'number' ? d.granojch.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pegjch === 'number' ? d.pegjch.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.desenjch === 'number' ? d.desenjch.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pedjch === 'number' ? d.pedjch.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.colasjch === 'number' ? d.colasjch.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pecjch === 'number' ? d.pecjch.toFixed(2) : 'N/A'}</td>
                                                        <td>{d.horasec}</td>
                                                        <td>{typeof d.alimjsec === 'number' ? d.alimjsec.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.peajsec === 'number' ? d.peajsec.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.concjsec === 'number' ? d.concjsec.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pecojsec === 'number' ? d.pecojsec.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.colasjsec === 'number' ? d.colasjsec.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pecjsec === 'number' ? d.pecjsec.toFixed(2) : 'N/A'}</td>



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

export default JigsCh
