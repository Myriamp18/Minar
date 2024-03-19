import React, { useEffect, useState } from 'react';
import '../Silos/Silos.css'
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function Piedra() {
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:8081/reportediariograno')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/deletediariograno/${id}`)
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

            <h1>Seleccion:</h1>
            <div className="close-button" onClick={() => navigate('/diario')}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className="text-center">
                <Link to="/createdseleccion" className="btn btn-danger btn-lg font-weight-bold   text-lg" >
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
                                                <th>AlimGr</th>
                                                <th>P.E</th>
                                                <th>ConcGr</th>
                                                <th>P.E</th>
                                                <th>ColasGr</th>
                                                <th>P.E</th>
                                                <th>TONPIEDRA</th>
                                                <th>P.E</th>
                                                <th>A</th>
                                                <th>MinaLE</th>
                                                <th>P.E</th>
                                                <th>A</th>
                                                <th>MinaLS</th>
                                                <th>P.E</th>
                                                <th>A</th>
                                                <th>PatioLE</th>
                                                <th>P.E</th>
                                                <th>A</th>
                                                <th>PatioLS</th>
                                                <th>P.E</th>
                                                <th>A</th>
                                                <th>Med3y4</th>
                                                <th>P.E</th>
                                                <th>A</th>
                                                <th>Desensolve</th>
                                                <th>P.E</th>
                                                <th>A</th>
                                                <th>Colas</th>
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
                                                                <Link to={`/updategranoseleccion/${d.id}`} className='btn btn-warning'>
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
                                                        <td>{typeof d.alimgrano === 'number' ? d.alimgrano.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.peag === 'number' ? d.peag.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.concgrano === 'number' ? d.concgrano.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pecng === 'number' ? d.pecng.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.colasgrano === 'number' ? d.colasgrano.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pecg === 'number' ? d.pecg.toFixed(2) : 'N/A'}</td>
                                                        <td>{typeof d.tonpiedra === 'number' ? d.tonpiedra.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.petp === 'number' ? d.petp.toFixed(2) : 'N/A'}</td>
                                                        <td>{d.aminale}</td>
                                                        <td>{typeof d.minale === 'number' ? d.minale.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pemle === 'number' ? d.pemle.toFixed(2) : 'N/A'}</td>
                                                        <td>{d.aminals}</td>
                                                        <td>{typeof d.minals === 'number' ? d.minals.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pemls === 'number' ? d.pemls.toFixed(2) : 'N/A'}</td>
                                                        <td>{d.apatiole}</td>
                                                        <td>{typeof d.patiols === 'number' ? d.patiols.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.peple === 'number' ? d.peple.toFixed(2) : 'N/A'}</td>
                                                        <td>{d.apatiols}</td>
                                                        <td>{typeof d.tolvageneral === 'number' ? d.tolvageneral.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pepls === 'number' ? d.pepls.toFixed(2) : 'N/A'}</td>
                                                        <td>{d.amedio34}</td>
                                                        <td>{typeof d.medio3y4 === 'number' ? d.medio3y4.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.psm34 === 'number' ? d.psm34.toFixed(2) : 'N/A'}</td>
                                                        <td>{d.adesensolve}</td>
                                                        <td>{typeof d.desensolve === 'number' ? d.desensolve.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pedese === 'number' ? d.pedese.toFixed(2) : 'N/A'}</td>
                                                        <td>{d.acolas}</td>
                                                        <td>{typeof d.colas === 'number' ? d.colas.toFixed(3) : 'N/A'}</td>
                                                        <td>{typeof d.pecolas === 'number' ? d.pecolas.toFixed(2) : 'N/A'}</td>



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

export default Piedra
