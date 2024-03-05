import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import './FrmReporte.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Modificarjigsch() {
    const { id } = useParams()
    const [values, setValues] = useState({
        fecha: "",
        turno: "",
        alimjch: "",
        peajch: "",
        granojch: "",
        pegjch: "",
        desenjch: "",
        pedjch: "",
        colasjch: "",
        pecjch: "",
        horasec: "",
        alimjsec: "",
        peajsec: "",
        concjsec: "",
        pecojsec: "",
        colasjsec: "",
        pecjsec: "",
    })

    const navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8081/updatejigsch/${id}`, values)

            .then(res => {
                console.log(res);
                // Optionally, you can navigate to a different page or update the UI
                navigate('/diario'); // Example: Navigate to the home page
            })
            .catch(err => console.log(err));
    };
    useEffect(() => {
        axios.get(`http://localhost:8081/getrecorjigsch/` + id)
            .then((res) => {

                setValues({
                    ...values,
                    fecha: res.data[0].fecha,
                    turno: res.data[0].turno,
                    alimjch: res.data[0].alimjch,
                    peajch: res.data[0].peajch,
                    granojch: res.data[0].granojch,
                    pegjch: res.data[0].pegjch,
                    desenjch: res.data[0].desenjch,
                    pedjch: res.data[0].pedjch,
                    colasjch: res.data[0].colasjch,
                    pecjch: res.data[0].pecjch,
                    horasec: res.data[0].horasec,
                    alimjsec: res.data[0].alimjsec,
                    peajsec: res.data[0].peajsec,
                    concjsec: res.data[0].concjsec,
                    pecojsec: res.data[0].pecojsec,
                    colasjsec: res.data[0].colasjsec,
                    pecjsec: res.data[0].pecjsec,
                });

            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="d-flex align-items-center flex-column mt-3" >
            <h1>Modificar JIGG´S Chinos</h1>
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
                            required
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
                            required
                            onChange={(e) => setValues({ ...values, turno: e.target.value })} >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>

                        </select>

                    </div>
                </div>


                <div className="columns">
                    <div className="columna">
                        <center>  <label form='text'> JIGG´S Primario</label></center>

                        <label form='text'> Alimentacion:</label>
                        <div className="JIGS1">
                            <input
                                class="form-control"
                                placeholder="Alim."
                                name=' alimjch'
                                required
                                value={values.alimjch}
                                onChange={(e) => setValues({ ...values, alimjch: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name=' peajch'
                                required
                                value={values.peajch}
                                onChange={(e) => setValues({ ...values, peajch: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> Grano:</label>
                            <input
                                class="form-control"
                                placeholder="Grano"
                                name='granojch'
                                required
                                value={values.granojch}
                                onChange={(e) => setValues({ ...values, granojch: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name=' pegjch'
                                required
                                value={values.pegjch}
                                onChange={(e) => setValues({ ...values, pegjch: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> Desensolve:</label>
                            <input
                                class="form-control"
                                placeholder="Desens."
                                name=' desenjch'
                                required
                                value={values.desenjch}
                                onChange={(e) => setValues({ ...values, desenjch: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                required
                                name=' pedjch'
                                value={values.pedjch}
                                onChange={(e) => setValues({ ...values, pedjch: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> Colas:</label>
                            <input
                                class="form-control"
                                placeholder="Colas"
                                name='colasjch'
                                required
                                value={values.colasjch}
                                onChange={(e) => setValues({ ...values, colasjch: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='pecjch'
                                required
                                value={values.pecjch}
                                onChange={(e) => setValues({ ...values, pecjch: e.target.value })} />
                        </div>
                    </div>





                    <div className="columna">
                        <center>  <label form='text'> JIGG´S Secundario</label></center>

                        <label form='text'> Horas:</label>
                        <div className="JIGS1">
                            <input
                           
                            class="form-control"
                            placeholder="Horas"
                            name='horasec'
                            required
                            value={values.horasec}
                            onChange={(e) => setValues({ ...values, horasec: e.target.value })} />
                        </div>
                        <div className="JIGS1">

                            <label form='text'> Alimentacion:</label>
                            <input
                                class="form-control"
                                placeholder="Alim."
                                name='alimjsec'
                                required
                                value={values.alimjsec}
                                onChange={(e) => setValues({ ...values, alimjsec: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='peajsec'
                                required
                                value={values.peajsec}
                                onChange={(e) => setValues({ ...values, peajsec: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> Concentrado:</label>
                            <input
                                class="form-control"
                                placeholder="Conc."
                                name=' concjsec'
                                required
                                value={values.concjsec}
                                onChange={(e) => setValues({ ...values, concjsec: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='pecojsec'
                                required
                                value={values.pecojsec}
                                onChange={(e) => setValues({ ...values, pecojsec: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> Colas:</label>
                            <input
                                class="form-control"
                                placeholder="Colas"
                                required
                                name='colasjsec'
                                value={values.colasjsec}
                                onChange={(e) => setValues({ ...values, colasjsec: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='pecjsec'
                                required
                                value={values.pecjsec}
                                onChange={(e) => setValues({ ...values, pecjsec: e.target.value })} />
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

export default Modificarjigsch
