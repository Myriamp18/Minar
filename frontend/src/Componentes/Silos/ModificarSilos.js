
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ModificarSilos() {
    const { id } = useParams()
    const [values, setValues] = useState({
        fecha: '',
        silo1: "",
        pes1: "",
        silo2: "",
        pes2: "",
        silo3: "",
        pes3: "",
        silo4: "",
        pes4: "",
        silo5: "",
        pes4: "",


    })

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8081/update/${id}`, values)

            .then(res => {
                console.log(res);
                // Optionally, you can navigate to a different page or update the UI
                navigate('/silos'); // Example: Navigate to the home page
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        axios.get(`http://localhost:8081/getrecord/` + id)
            .then((res) => {

                setValues({
                    ...values,
                    fecha: res.data[0].fecha,
                    silo1: res.data[0].silo1,
                    pes1: res.data[0].pes1,
                    silo2: res.data[0].silo2,
                    pes2: res.data[0].pes2,
                    silo3: res.data[0].silo3,
                    pes3: res.data[0].pes3,
                    silo4: res.data[0].silo4,
                    pes4: res.data[0].pes4,
                    silo5: res.data[0].silo5,
                    pes5: res.data[0].pes5,
                });

            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="d-flex align-items-center flex-column mt-3">
            <h1>Modificar Silos</h1>
            <div className="close-button" onClick={() => navigate('/silos')}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
            <form className="w-50" onSubmit={handleSubmit} >
                <div class="mb-3 mt-3">
                    <label form='fecha' class="form-label"> Fecha:</label>
                    <input
                        type="date"
                        class="form-control"
                        id='date'
                        placeholder='Insertar Cantidad'
                        name='fecha'
                        value={values.fecha}
                        onChange={(e) => setValues({ ...values, fecha: e.target.value })}
                    />
                </div>
                <div className='silos'>
                    <div class="mb-3">
                        <label form='text' class="form-label"> Silo 1:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='silo1'
                            placeholder='Insertar Cantidad'
                            name='silo1'
                            value={values.silo1}
                            onChange={(e) => setValues({ ...values, silo1: e.target.value })} />
                    </div>
                    <div class="mb-3">
                        <label form='text' class="form-label"> P.ESP:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='pesilo1'
                            placeholder='Insertar P.ESP'
                            name='pes1'
                            value={values.pes1}
                            onChange={(e) => setValues({ ...values, pes1: e.target.value })} />
                    </div>
                </div>
                <div className='silos'>
                    <div class="mb-3">
                        <label form='text' class="form-label"> Silo 2:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='silo2'
                            placeholder='Insertar Cantidad'
                            name='silo2'
                            value={values.silo2}
                            onChange={(e) => setValues({ ...values, silo2: e.target.value })} />
                    </div>
                    <div class="mb-3">
                        <label form='text' class="form-label"> P.ESP:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='pesilo2'
                            placeholder='Insertar P.ESP'
                            name='pes2'
                            value={values.pes2}
                            onChange={(e) => setValues({ ...values, pes2: e.target.value })} />
                    </div>
                </div>
                <div className='silos'>
                    <div class="mb-3">
                        <label form='text' class="form-label"> Silo 3:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='silo3'
                            placeholder='Insertar Cantidad'
                            name='silo3'
                            value={values.silo3}
                            onChange={(e) => setValues({ ...values, silo3: e.target.value })} />
                    </div>
                    <div class="mb-3">
                        <label form='text' class="form-label"> P.ESP:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='pesilo3'
                            placeholder='Insertar P.ESP'
                            name='pes3'
                            value={values.pes3}
                            onChange={(e) => setValues({ ...values, pes3: e.target.value })} />
                    </div>
                </div>

                <div className='silos'>
                    <div class="mb-3">
                        <label form='text' class="form-label"> Silo 4:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='silo4'
                            placeholder='Insertar Cantidad'
                            name='silo4'
                            value={values.silo4}
                            onChange={(e) => setValues({ ...values, silo4: e.target.value })} />
                    </div>
                    <div class="mb-3">
                        <label form='text' class="form-label"> P.ESP:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='pesilo4'
                            placeholder='Insertar P.ESP'
                            name='pes4'
                            value={values.pes4}
                            onChange={(e) => setValues({ ...values, pes4: e.target.value })} />
                    </div>
                </div>
                <div className='silos'>
                    <div class="mb-3">
                        <label form='text' class="form-label"> Silo 5:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='silo5'
                            placeholder='Insertar Cantidad'
                            name='silo5'
                            value={values.silo5}
                            onChange={(e) => setValues({ ...values, silo5: e.target.value })} />
                    </div>
                    <div class="mb-3">
                        <label form='text' class="form-label"> P.ESP:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='pesilo5'
                            placeholder='Insertar P.ESP'
                            name='pes5'
                            value={values.pes5}
                            onChange={(e) => setValues({ ...values, pes5: e.target.value })} />
                    </div>
                </div>

                <div className="btn-container">
                    <button type="submit" className="BTN"  >MODIFICAR</button>
                </div>


            </form>






        </div>
    )
}

export default ModificarSilos
