import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import './FrmReporte.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Modificarmesas() {
    const { id } = useParams()
    const [values, setValues] = useState({
        fecha: "",
        turno: "",
        //////Mesas///
        alimm12: "",
        peam12: "",
        conm12: "",
        pecnm12: "",
        mediom12: "",
        pemm12: "",
        colasm12: "",
        pecm12: "",
        ////34////
        alimm34: "",
        peam34: "",
        conm34: "",
        pecnm34: "",
        mediosm34: "",
        pemm34: "",
        colasm34: "",
        pecm34: "",
        ////5/////
        alimm5: "",
        peam5: "",
        conm5: "",
        pecnm5: "",
        mediosm5: "",
        pemm5: "",
        colasm5: "",
        pecm5: "",
        ////6////
        alimm6: "",
        peam6: "",
        conm6: "",
        pecnm6: "",
        mediom6: "",
        pemm6: "",
        colasm6: "",
        pecm6: "",
    })

    const navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8081/updatemesas/${id}`, values)

            .then(res => {
                console.log(res);
                // Optionally, you can navigate to a different page or update the UI
                navigate('/diario'); // Example: Navigate to the home page
            })
            .catch(err => console.log(err));
    };
    useEffect(() => {
        axios.get(`http://localhost:8081/getrecormesas/` + id)
            .then((res) => {

                setValues({
                    ...values,
                    fecha: res.data[0].fecha,
                    turno: res.data[0].turno,
                    //////Mesas///
                    alimm12: res.data[0].alimm12,
                    peam12: res.data[0].peam12,
                    conm12: res.data[0].conm12,
                    pecnm12: res.data[0].pecnm12,
                    mediom12: res.data[0].mediom12,
                    pemm12: res.data[0].pemm12,
                    colasm12: res.data[0].colasm12,
                    pecm12: res.data[0].pecm12,
                    ////34////
                    alimm34: res.data[0].alimm34,
                    peam34: res.data[0].peam34,
                    conm34: res.data[0].conm34,
                    pecnm34: res.data[0].pecm34,
                    mediosm34: res.data[0].mediosm34,
                    pemm34: res.data[0].pemm34,
                    colasm34: res.data[0].colasm34,
                    pecm34: res.data[0].pecm34,
                    ////5/////
                    alimm5: res.data[0].alimm5,
                    peam5: res.data[0].peam5,
                    conm5: res.data[0].conm5,
                    pecnm5: res.data[0].pecnm5,
                    mediosm5: res.data[0].mediosm5,
                    pemm5: res.data[0].pemm5,
                    colasm5: res.data[0].colasm5,
                    pecm5: res.data[0].pecm5,
                    ////6////
                    alimm6: res.data[0].alimm6,
                    peam6: res.data[0].peam6,
                    conm6: res.data[0].conm6,
                    pecnm6: res.data[0].pecnm6,
                    mediom6: res.data[0].mediom6,
                    pemm6: res.data[0].pemm6,
                    colasm6: res.data[0].colasm6,
                    pecm6: res.data[0].pecm6,
                });

            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div className="d-flex align-items-center flex-column mt-3" >
            <center><h1>Modificar Mesas</h1></center>
            <div className="close-button" onClick={() => navigate('/diario')}>
            <FontAwesomeIcon icon={faTimes} />
            </div>
            <form className="w-50" onSubmit={handleSubmit} >

                <div className='mmm'>

                    <div className="JIGS1">

                        <label form='fecha' > Fecha:</label>
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

                    <div className="JIGS1">
                        <label>Turno:</label>
                        <select
                            id="seleccion"
                            name="seleccion"
                            class="form-control"
                            value={values.turno}
                            onChange={(e) => setValues({ ...values, turno: e.target.value })} >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>

                        </select>

                    </div>
                </div>
                <div className="columns">
                    <div className="columna">
                        <center>  <label form='text'> Mesa1y2</label></center>


                        <div className="JIGS1">
                            <label form='text'> Alimentacion</label>

                            <input
                                class="form-control"
                                placeholder="Alim."
                                name=' alimm12'
                                value={values.alimm12}
                                onChange={(e) => setValues({ ...values, alimm12: e.target.value })} />

                        </div>

                        <div className="JIGS1">
                            <label form='text' > P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name=' peam12'
                                value={values.peam12}
                                onChange={(e) => setValues({ ...values, peam12: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> Concentrado:</label>
                            <input
                                class="form-control"
                                placeholder="Conc."
                                name=' conm12'
                                value={values.conm12}
                                onChange={(e) => setValues({ ...values, conm12: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text' > P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='  pecnm12'
                                value={values.pecnm12}
                                onChange={(e) => setValues({ ...values, pecnm12: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text' > Medios:</label>
                            <input
                                class="form-control"
                                placeholder="Medios"
                                name='mediom12'
                                value={values.mediom12}
                                onChange={(e) => setValues({ ...values, mediom12: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text' > P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='pemm12'
                                value={values.pemm12}
                                onChange={(e) => setValues({ ...values, pemm12: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text'> Colas:</label>
                            <input
                                class="form-control"
                                placeholder="Colas"
                                name=' colasm12'
                                value={values.colasm12}
                                onChange={(e) => setValues({ ...values, colasm12: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='pecm12'
                                value={values.pecm12}
                                onChange={(e) => setValues({ ...values, pecm12: e.target.value })} />
                        </div>
                    </div>





                    <div className="columna">
                        <center>  <label form='text'> Mesa3y4</label></center>
                        <div className="JIGS1">
                            <label form='text' > Alimentacion</label>

                            <input
                                class="form-control"
                                placeholder="Alim."
                                name=' alimm34'
                                value={values.alimm34}
                                onChange={(e) => setValues({ ...values, alimm34: e.target.value })} />

                        </div>

                        <div className="JIGS1">
                            <label form='text' > P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='peam34'
                                value={values.peam34}
                                onChange={(e) => setValues({ ...values, peam34: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> Concentrado:</label>
                            <input
                                class="form-control"
                                placeholder="Conc."
                                name='conm34'
                                value={values.conm34}
                                onChange={(e) => setValues({ ...values, conm34: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='pecnm34'
                                value={values.pecnm34}
                                onChange={(e) => setValues({ ...values, pecnm34: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text' >Medios:</label>
                            <input
                                class="form-control"
                                placeholder="Medios"
                                name=' mediosm34'
                                value={values.mediosm34}
                                onChange={(e) => setValues({ ...values, mediosm34: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text' > P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='pemm34'
                                value={values.pemm34}
                                onChange={(e) => setValues({ ...values, pemm34: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text'> Colas:</label>
                            <input
                                class="form-control"
                                placeholder="Colas"
                                name=' colasm34'
                                value={values.colasm34}
                                onChange={(e) => setValues({ ...values, colasm34: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name=' pecm34'
                                value={values.pecm34}
                                onChange={(e) => setValues({ ...values, pecm34: e.target.value })} />
                        </div>

                    </div>



                    <div className="columna">
                        <center>  <label form='text'> Mesa 5</label></center>
                        <div className="JIGS1">
                            <label form='text' > Alimentacion</label>

                            <input
                                class="form-control"
                                placeholder="Alim."
                                name=' alimm5'
                                value={values.alimm5}
                                onChange={(e) => setValues({ ...values, alimm5: e.target.value })} />

                        </div>

                        <div className="JIGS1">
                            <label form='text' > P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='peam5'
                                value={values.peam5}
                                onChange={(e) => setValues({ ...values, peam5: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> Concentrado:</label>
                            <input
                                class="form-control"
                                placeholder="Conc."
                                name=' conm5'
                                value={values.conm5}
                                onChange={(e) => setValues({ ...values, conm5: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='pecnm5'
                                value={values.pecnm5}
                                onChange={(e) => setValues({ ...values, pecnm5: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text' >Medios:</label>
                            <input
                                class="form-control"
                                placeholder="Medios"
                                name='mediosm5'
                                value={values.mediosm5}
                                onChange={(e) => setValues({ ...values, mediosm5: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text' > P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='pemm5'
                                value={values.pemm5}
                                onChange={(e) => setValues({ ...values, pemm5: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text'> Colas:</label>
                            <input
                                class="form-control"
                                placeholder="Colas"
                                name=' colasm5'
                                value={values.colasm5}
                                onChange={(e) => setValues({ ...values, colasm5: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name=' pecm5'
                                value={values.pecm5}
                                onChange={(e) => setValues({ ...values, pecm5: e.target.value })} />
                        </div>

                    </div>

                    <div className="columna">
                        <center>  <label form='text'> Mesa 6</label></center>
                        <div className="JIGS1">
                            <label form='text' > Alimentacion</label>

                            <input
                                class="form-control"
                                placeholder="Alim."
                                name=' alimm6'
                                value={values.alimm6}
                                onChange={(e) => setValues({ ...values, alimm6: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text' > P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='peam6'
                                value={values.peam6}
                                onChange={(e) => setValues({ ...values, peam6: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> Concentrado:</label>
                            <input
                                class="form-control"
                                placeholder="Conc."
                                name=' conm6'
                                value={values.conm6}
                                onChange={(e) => setValues({ ...values, conm6: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='pecnm6'
                                value={values.pecnm6}
                                onChange={(e) => setValues({ ...values, pecnm6: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text' >Medios:</label>
                            <input
                                class="form-control"
                                placeholder="Medios"
                                name='mediom6'
                                value={values.mediom6}
                                onChange={(e) => setValues({ ...values, mediom6: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text' > P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='pemm6'
                                value={values.pemm6}
                                onChange={(e) => setValues({ ...values, pemm6: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text'> Colas:</label>
                            <input
                                class="form-control"
                                placeholder="Colas"
                                name=' colasm6'
                                value={values.colasm6}
                                onChange={(e) => setValues({ ...values, colasm6: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name=' pecm6'
                                value={values.pecm6}
                                onChange={(e) => setValues({ ...values, pecm6: e.target.value })} />
                        </div>

                    </div>






                </div>


                <div className="btn-container">
                    <button type="submit" className="BTN"  >MODIFICAR</button>
                </div>


            </form>






        </div>
    )
}

export default Modificarmesas
