import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import './FrmReporte.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Modificargrano() {
    const { id } = useParams()
    const [values, setValues] = useState({
        fecha: "",
        turno: "1",
        alimgrano: "",
        peag: "",
        concgrano: "",
        pecng: "",
        colasgrano: "",
        pecg: "",
        tonpiedra: "",
        petp: "",
        tolvageneral: "",
        medio3y4: "",
        minale: "",
        minals: "",
        patiols: "",
        desensolve: "",
        colas: "",
        pemle: "",
        pemls: "",
        peple: "",
        pepls: "",
        psm34: "",
        pedese: "",
        pecolas: "",
        aminale: "",
        aminals: "",
        apatiole: "",
        apatiols: "",
        amedio34: "",
        adesensolve: "",
        acolas: "",
    })

    const navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8081/updategranoseleccion/${id}`, values)

            .then(res => {
                console.log(res);
                // Optionally, you can navigate to a different page or update the UI
                navigate('/dseleccion'); // Example: Navigate to the home page
            })
            .catch(err => console.log(err));
    };
    useEffect(() => {
        axios.get(`http://localhost:8081/getrecorgrano/` + id)
            .then((res) => {

                setValues({
                    ...values,
                    fecha: res.data[0].fecha,
                    turno: res.data[0].turno,
                    alimgrano: res.data[0].alimgrano,
                    peag: res.data[0].peag,
                    concgrano: res.data[0].concgrano,
                    pecng: res.data[0].pecng,
                    colasgrano: res.data[0].colasgrano,
                    pecg: res.data[0].pecg,
                    tonpiedra: res.data[0].tonpiedra,
                    petp: res.data[0].petp,
                    tolvageneral: res.data[0].tolvageneral,
                    medio3y4: res.data[0].medio3y4,
                    minale: res.data[0].minale,
                    minals: res.data[0].minals,
                    patiols: res.data[0].patiols,
                    desensolve: res.data[0].desensolve,
                    colas: res.data[0].colas,
                    pemle: res.data[0].pemle,
                    pemls: res.data[0].pemls,
                    peple: res.data[0].peple,
                    pepls: res.data[0].pepls,
                    psm34: res.data[0].psm34,
                    pedese: res.data[0].pedese,
                    pecolas: res.data[0].pecolas,
                    aminale: res.data[0].aminale,
                    aminals: res.data[0].aminals,
                    apatiole: res.data[0].apatiole,
                    apatiols: res.data[0].apatiols,
                    amedio34: res.data[0].amedio34,
                    adesensolve: res.data[0].adesensolve,
                    acolas: res.data[0].acolas,
                });

            })
            .catch(err => console.log(err));
    }, []);


    return (
        <div className="d-flex align-items-center flex-column mt-3" >
            <center><h1>Modificar Seleccion</h1></center>
            <div className="close-button" onClick={() => navigate('/dseleccion')}>
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
                            required
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
                        <center>  <label form='text'> Seleccion</label></center>


                        <div className="JIGS1">
                            <label form='text'> Alimentacion</label>

                            <input
                                class="form-control"
                                placeholder="Alim."
                                name=' alimgrano'
                                required
                                value={values.alimgrano}
                                onChange={(e) => setValues({ ...values, alimgrano: e.target.value })} />

                        </div>

                        <div className="JIGS1">
                            <label form='text' > P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name=' peag'
                                value={values.peag}
                                required
                                onChange={(e) => setValues({ ...values, peag: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> Concentrado:</label>
                            <input
                                class="form-control"
                                placeholder="Conc."
                                name=' concgrano'
                                required
                                value={values.concgrano}
                                onChange={(e) => setValues({ ...values, concgrano: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text' > P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='pecng'
                                required
                                value={values.pecng}
                                onChange={(e) => setValues({ ...values, pecng: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text' > Colas:</label>
                            <input
                                class="form-control"
                                placeholder="Colas"
                                name=' colasgrano'
                                required
                                value={values.colasgrano}
                                onChange={(e) => setValues({ ...values, colasgrano: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text' > P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='pecg'
                                required
                                value={values.pecg}
                                onChange={(e) => setValues({ ...values, pecg: e.target.value })} />
                        </div>

                    </div>





                    <div className="columna">
                        <center>  <label form='text'> Piedra</label></center>
                        <div className="JIGS1">
                            <label form='text' > TON</label>

                            <input
                                class="form-control"
                                placeholder="TON"
                                name=' tonpiedra'
                                required
                                value={values.tonpiedra}
                                onChange={(e) => setValues({ ...values, tonpiedra: e.target.value })} />

                        </div>

                        <div className="JIGS1">
                            <label form='text' > P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='  petp'
                                required
                                value={values.petp}
                                onChange={(e) => setValues({ ...values, petp: e.target.value })} />
                        </div>


                    </div>



                    <div className="columna">
                        <center>  <label form='text'> MINALE</label></center>
                        <div className="JIGS1">
                            <label form='text' > A:</label>

                            <input
                                class="form-control"
                                placeholder="A"
                                name='	aminale	'
                                required
                                value={values.aminale}
                                onChange={(e) => setValues({ ...values, aminale: e.target.value })} />

                        </div>

                        <div className="JIGS1">
                            <label form='text' > TON:</label>
                            <input
                                class="form-control"
                                placeholder="Mina LE"
                                name='	minale	'
                                required
                                value={values.minale}
                                onChange={(e) => setValues({ ...values, minale: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='pemle'
                                required
                                value={values.pemle}
                                onChange={(e) => setValues({ ...values, pemle: e.target.value })} />
                        </div>


                    </div>

                    <div className="columna">
                        <center>  <label form='text'> MINALS</label></center>
                        <div className="JIGS1">
                            <label form='text' > A:</label>

                            <input
                                class="form-control"
                                placeholder="A"
                                name='aminals'
                                required
                                value={values.aminals}
                                onChange={(e) => setValues({ ...values, aminals: e.target.value })} />

                        </div>

                        <div className="JIGS1">
                            <label form='text' > TON:</label>
                            <input
                                class="form-control"
                                placeholder="Mina LS"
                                name='minals'
                                required
                                value={values.minals}
                                onChange={(e) => setValues({ ...values, minals: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='pemls	'
                                required
                                value={values.pemls}
                                onChange={(e) => setValues({ ...values, pemls: e.target.value })} />
                        </div>


                    </div>

                    <div className="columna">
                        <center>  <label form='text'> PATIOLE</label></center>
                        <div className="JIGS1">
                            <label form='text' > A:</label>

                            <input
                                class="form-control"
                                placeholder="A"
                                name='apatiole	'
                                required
                                value={values.apatiole}
                                onChange={(e) => setValues({ ...values, apatiole: e.target.value })} />

                        </div>

                        <div className="JIGS1">
                            <label form='text' > TON:</label>
                            <input
                                class="form-control"
                                placeholder="Patio LE"
                                name='patiols	'
                                required
                                value={values.patiols}
                                onChange={(e) => setValues({ ...values, patiols: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='peple	'
                                required
                                value={values.peple}
                                onChange={(e) => setValues({ ...values, peple: e.target.value })} />
                        </div>


                    </div>

                    <div className="columna">
                        <center>  <label form='text'> PATIOLS</label></center>
                        <div className="JIGS1">
                            <label form='text' > A:</label>

                            <input
                                class="form-control"
                                placeholder="A"
                                name='apatiols'
                                required
                                value={values.apatiols}
                                onChange={(e) => setValues({ ...values, apatiols: e.target.value })} />

                        </div>

                        <div className="JIGS1">
                            <label form='text' > TON:</label>
                            <input
                                class="form-control"
                                placeholder="Patio LS"
                                name='tolvageneral	'
                                required
                                value={values.tolvageneral}
                                onChange={(e) => setValues({ ...values, tolvageneral: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='pepls	'
                                required
                                value={values.pepls}
                                onChange={(e) => setValues({ ...values, pepls: e.target.value })} />
                        </div>


                    </div>


                    <div className="columna">
                        <center>  <label form='text'> MEDIO3Y4</label></center>
                        <div className="JIGS1">
                            <label form='text' > A:</label>

                            <input
                                class="form-control"
                                placeholder="A"
                                required
                                name='amedio34'
                                value={values.amedio34}
                                onChange={(e) => setValues({ ...values, amedio34: e.target.value })} />

                        </div>

                        <div className="JIGS1">
                            <label form='text' > TON:</label>
                            <input
                                class="form-control"
                                placeholder="Medios 3 y 4"
                                name='medio3y4'
                                required
                                value={values.medio3y4}
                                onChange={(e) => setValues({ ...values, medio3y4: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='psm34	'
                                required
                                value={values.psm34}
                                onChange={(e) => setValues({ ...values, psm34: e.target.value })} />
                        </div>


                    </div>

                    <div className="columna">
                        <center>  <label form='text'> DESENSOLVE</label></center>
                        <div className="JIGS1">
                            <label form='text' > A:</label>

                            <input
                                class="form-control"
                                placeholder="A"
                                required
                                name='adesensolve'
                                value={values.adesensolve}
                                onChange={(e) => setValues({ ...values, adesensolve: e.target.value })} />

                        </div>

                        <div className="JIGS1">
                            <label form='text' > TON:</label>
                            <input
                                class="form-control"
                                placeholder="Desensolve"
                                name='desensolve'
                                required
                                value={values.desensolve}
                                onChange={(e) => setValues({ ...values, desensolve: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='pedese	'
                                required
                                value={values.pedese}
                                onChange={(e) => setValues({ ...values, pedese: e.target.value })} />
                        </div>


                    </div>

                    <div className="columna">
                        <center>  <label form='text'> COLAS</label></center>
                        <div className="JIGS1">
                            <label form='text' > A:</label>

                            <input
                                class="form-control"
                                placeholder="A"
                                name='acolas'
                                required
                                value={values.acolas}
                                onChange={(e) => setValues({ ...values, acolas: e.target.value })} />

                        </div>

                        <div className="JIGS1">
                            <label form='text' > TON:</label>
                            <input
                                class="form-control"
                                placeholder="Colas"
                                name='colas'
                                required
                                value={values.colas}
                                onChange={(e) => setValues({ ...values, colas: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name='pecolas'
                                required
                                value={values.pecolas}
                                onChange={(e) => setValues({ ...values, pecolas: e.target.value })} />
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

export default Modificargrano
