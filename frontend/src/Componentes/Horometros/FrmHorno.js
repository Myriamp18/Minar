import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Silos/FrmSilos.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function FrmHorno() {
    const [values, setValues] = useState({
        fecha: '',
        turno: "1",
        quebradora: "",
        hrotatorio: "",
        elvmolinos: "",
        colectoresp: "",
        ensacadora: "",
        ensacadora1: "",
        elvsilos: "",
        gusanof1: "",
        gusanof5: "",
        quebradorapr: "",
        notas: "",

    })

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        // Realiza la inserción con el nuevo saldo
        axios.post('http://localhost:8081/createhorno', values)
            .then(res => {
                console.log(res);
                navigate('/horno');
            })
            .catch(err => {
                console.error('Error inserting data:', err);
            });
    };
    return (
        <div className="d-flex align-items-center flex-column mt-2">
            <h1>Insertar Molienda Barita</h1>
            <div className="close-button" onClick={() => navigate('/horno')}>
                <FontAwesomeIcon icon={faTimes} />
            </div>

            <form className="w-50" onSubmit={handleSubmit} >
                <div className='nnn'>

                    <div className="date">

                        <label form='fecha' > Fecha:</label>
                        <input
                            type="date"
                            class="form-control"
                            id='date'
                            placeholder='Insertar Cantidad'
                            name='fecha'
                            value={values.fecha}
                            onChange={(e) => setValues({ ...values, fecha: e.target.value })}
                            required
                        />
                    </div>
                    <div className="molino">
                        <label>Turno:</label>
                        <select
                            id="seleccion"
                            name="seleccion"
                            class="form-control"
                            value={values.turno}
                            required
                            onChange={(e) => setValues({ ...values, turno: e.target.value })} >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>

                        </select>

                    </div>

                </div>

                <div className='silos'>
                    <div class="mb-2">
                        <label form='text' class="form-label"> Quebradora:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='final'
                            placeholder='Insertar Horas'
                            name='final'
                            onChange={(e) => setValues({ ...values, quebradora: e.target.value })} required />
                    </div>
                    <div class="mb-2">
                        <label form='text' class="form-label"> Horno Rotatorio:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='finalj2'
                            placeholder='Insertar Horas'
                            name='finalj2'
                            onChange={(e) => setValues({ ...values, hrotatorio: e.target.value })} required />
                    </div>
                </div>

                <div className='silos'>
                    <div class="mb-2">
                        <label form='text' class="form-label"> ELV. CANJ MOLINOS 1-2:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='final'
                            placeholder='Insertar Horas'
                            name='final'
                            onChange={(e) => setValues({ ...values, elvmolinos: e.target.value })} required />
                    </div>
                    <div class="mb-2">
                        <label form='text' class="form-label">Colectores Polvo:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='finalj2'
                            placeholder='Insertar Horas'
                            name='finalj2'
                            onChange={(e) => setValues({ ...values, colectoresp: e.target.value })} required />
                    </div>

                </div>
                <div className='silos'>
                    <div class="mb-2">
                        <label form='text' class="form-label"> ELV. CANJ Ensacadora No.:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='final'
                            placeholder='Insertar Horas'
                            name='final'
                            onChange={(e) => setValues({ ...values, ensacadora: e.target.value })} required />
                    </div>
                    <div class="mb-2">
                        <label form='text' class="form-label">Ensacadora No.1:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='final'
                            placeholder='Insertar Horas'
                            name='final'
                            onChange={(e) => setValues({ ...values, ensacadora1: e.target.value })} required />
                    </div>
                </div>
                <div className='silos'>
                    <div class="mb-2">
                        <label form='text' class="form-label"> ELV. CANJ Silos:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='final'
                            placeholder='Insertar Horas'
                            name='final'
                            onChange={(e) => setValues({ ...values, elvsilos: e.target.value })} required />
                    </div>
                    <div class="mb-2">
                        <label form='text' class="form-label">Gusano Fino silo 1:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='final'
                            placeholder='Insertar Horas'
                            name='final'
                            onChange={(e) => setValues({ ...values, gusanof1: e.target.value })} required />
                    </div>
                </div>
                <div className='silos'>
                    <div class="mb-2">
                        <label form='text' class="form-label"> Gusano Fino Silo 5:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='final'
                            placeholder='Insertar Horas'
                            name='final'
                            onChange={(e) => setValues({ ...values, gusanof5: e.target.value })} required />
                    </div>
                    <div class="mb-2">
                        <label form='text' class="form-label">Quebradora Primaria:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='final'
                            placeholder='Insertar Horas'
                            name='final'
                            onChange={(e) => setValues({ ...values, quebradorapr: e.target.value })} required />
                    </div>
                </div>
                <label form='text'> Observaciones:</label>

                <textarea
                    placeholder="Inserte los medios a lavar a mesas y a jigss ."
                    className="form-control"
                    name='descripcion'
                    style={{ height: '50px', width: '100%', whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflowWrap: 'break-word' }}

                    onChange={(e) => setValues({ ...values, notas: e.target.value })}
                />

                <div className="btn-container">
                    <button type="submit" className="BTN"  >GUARDAR</button>
                </div>


            </form>






        </div>
    )
}

export default FrmHorno
