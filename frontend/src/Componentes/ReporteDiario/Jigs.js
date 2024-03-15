import React, { useEffect, useState } from 'react';
import '../Silos/Silos.css'
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Jigs() {
    const [data, setData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:8081/reportediario')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/deletediariojigs/${id}`)
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

            <h1>JIG´SS:</h1>
            <div className="close-button" onClick={() => navigate('/diario')}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className="text-center">
                <Link to="/createdjigss" className="btn btn-danger btn-lg font-weight-bold   text-lg" >
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
                                                <th>AlimJ1</th>
                                                <th>P.E</th>
                                                <th>GranoJ1</th>
                                                <th>P.E</th>
                                                <th>DesenJ1</th>
                                                <th>P.E</th>
                                                <th>ColasJ1</th>
                                                <th>P.E</th>
                                                <th>AlimJ2</th>
                                                <th>P.E</th>
                                                <th>GranoJ2</th>
                                                <th>P.E</th>
                                                <th>DesenJ2</th>
                                                <th>P.E</th>
                                                <th>ColasJ2</th>
                                                <th>P.E</th>


                                            </tr>
                                        </thead>
                                        <tbody className='table-group-divider'>
                                            {data.map((d, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <Link to={`/updatejigs/${d.id}`} className='btn btn-warning'>
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
                                                    <td>{typeof d.alimj1 === 'number' ? d.alimj1.toFixed(3) : 'N/A'}</td>
                                                    <td>{typeof d.peaj1 === 'number' ? d.peaj1.toFixed(2) : 'N/A'}</td>
                                                    <td>{typeof d.granoj1 === 'number' ? d.granoj1.toFixed(3) : 'N/A'}</td>
                                                    <td>{typeof d.pegj1 === 'number' ? d.pegj1.toFixed(2) : 'N/A'}</td>
                                                    <td>{typeof d.desenj1 === 'number' ? d.desenj1.toFixed(3) : 'N/A'}</td>
                                                    <td>{typeof d.pedj1 === 'number' ? d.pedj1.toFixed(2) : 'N/A'}</td>
                                                    <td>{typeof d.colasj1 === 'number' ? d.colasj1.toFixed(3) : 'N/A'}</td>
                                                    <td>{typeof d.pecj1 === 'number' ? d.pecj1.toFixed(2) : 'N/A'}</td>
                                                    <td>{typeof d.alimj2 === 'number' ? d.alimj2.toFixed(3) : 'N/A'}</td>
                                                    <td>{typeof d.peaj2 === 'number' ? d.peaj2.toFixed(2) : 'N/A'}</td>
                                                    <td>{typeof d.granoj2 === 'number' ? d.granoj2.toFixed(3) : 'N/A'}</td>
                                                    <td>{typeof d.pegj2 === 'number' ? d.pegj2.toFixed(2) : 'N/A'}</td>
                                                    <td>{typeof d.desenj2 === 'number' ? d.desenj2.toFixed(3) : 'N/A'}</td>
                                                    <td>{typeof d.pedj2 === 'number' ? d.pedj2.toFixed(2) : 'N/A'}</td>
                                                    <td>{typeof d.colasj2 === 'number' ? d.colasj2.toFixed(3) : 'N/A'}</td>
                                                    <td>{typeof d.pecj2 === 'number' ? d.pecj2.toFixed(2) : 'N/A'}</td>
                                                  




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

export default Jigs
