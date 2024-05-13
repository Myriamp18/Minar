import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import './FrmReporte.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Modificarjigs() {
    const { id } = useParams()
    const [values, setValues] = useState({
        fecha: "",
        turno: "",
        alimj1: "",
        peaj1: "",
        granoj1: "",
        pegj1: "",
        colasj1: "",
        pecj1: "",
        desenj1: "",
        pedj1: "",
        alimj2: "",
        peaj2: "",
        granoj2: "",
        pegj2: "",
        colasj2: "",
        pecj2: "",
        desenj2: "",
        pedj2: "",
    })

    const navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8081/updatejigs/${id}`, values)

            .then(res => {
                console.log(res);
                // Optionally, you can navigate to a different page or update the UI
                navigate('/djigss'); // Example: Navigate to the home page
            })
            .catch(err => console.log(err));
    };
    useEffect(() => {
        axios.get(`http://localhost:8081/getrecorjigs/` + id)
            .then((res) => {

                setValues({
                    ...values,
                    fecha: res.data[0].fecha,
                    turno: res.data[0].turno,
                    alimj1: res.data[0].alimj1,
                    peaj1: res.data[0].peaj1,
                    granoj1: res.data[0].granoj1,
                    pegj1: res.data[0].peaj1,
                    colasj1: res.data[0].colasj1,
                    pecj1: res.data[0].pecj1,
                    desenj1: res.data[0].desenj1,
                    pedj1: res.data[0].pedj1,
                    alimj2: res.data[0].alimj2,
                    peaj2: res.data[0].peaj2,
                    granoj2: res.data[0].granoj2,
                    pegj2: res.data[0].pegj2,
                    colasj2: res.data[0].colasj2,
                    pecj2: res.data[0].pecj2,
                    desenj2: res.data[0].desenj2,
                    pedj2: res.data[0].pedj2,
                });

            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="d-flex align-items-center flex-column mt-3" >
            <h1>Modificar JIGG´S</h1>
            <div className="close-button" onClick={() => navigate('/djigss')}>
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
                  <center>  <label form='text'> JIGG´S1</label></center>


                        <div className="JIGS1">
                            <label form='text'> Alimentacion</label>

                            <input
                                type="tolvagen"
                                placeholder="Alim."
                                class="form-control"
                                name='alimj1'
                                required
                                value={values.alimj1}
                                onChange={(e) => setValues({ ...values, alimj1: e.target.value })} />

                        </div>

                        <div className="JIGS1">
                            <label form='text' > P.E:</label>
                            <input
                                placeholder="P.E"
                                class="form-control"
                                name='peaj1'
                                value={values.peaj1}
                                required
                                onChange={(e) => setValues({ ...values, peaj1: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> Grano:</label>
                            <input
                                placeholder="Grano"
                                class="form-control"
                                name=' granoj1l'
                                required
                                value={values.granoj1}
                                onChange={(e) => setValues({ ...values, granoj1: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text' > P.E:</label>
                            <input
                                placeholder="P.E"
                                class="form-control"
                                name='pegj1'
                                required
                                value={values.pegj1}
                                onChange={(e) => setValues({ ...values, pegj1: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text' > Desensolve:</label>
                            <input
                                placeholder="Desens"
                                class="form-control"
                                name=' desenj1'
                                value={values.desenj1}
                                required
                                onChange={(e) => setValues({ ...values, desenj1: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text' > P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name=' pedj1'
                                required
                                value={values.pedj1}
                                onChange={(e) => setValues({ ...values, pedj1: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text'> Colas:</label>
                            <input
                                class="form-control"
                                placeholder="Colas"
                                name='colasj1'
                                required
                                value={values.colasj1}
                                onChange={(e) => setValues({ ...values, colasj1: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                placeholder="P.E"
                                class="form-control"
                                name='pecj1'
                                required
                                value={values.pecj1}
                                onChange={(e) => setValues({ ...values, pecj1: e.target.value })} />
                        </div>
                    </div>





                    <div className="columna">
                    <center>  <label form='text'> JIGG´S2</label></center>
                        <div className="JIGS1">
                            <label form='text' > Alimentacion</label>

                            <input
                                type="tolvagen"
                                placeholder="Alim."
                                class="form-control"
                                required
                                name='alimj2'
                                value={values.alimj2}
                                onChange={(e) => setValues({ ...values, alimj2: e.target.value })} />

                        </div>

                        <div className="JIGS1">
                            <label form='text' > P.E:</label>
                            <input
                                placeholder="P.E"
                                class="form-control"
                                name='peaj2'
                                required
                                value={values.peaj2}
                                onChange={(e) => setValues({ ...values, peaj2: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> Grano:</label>
                            <input
                                placeholder="Grano"
                                class="form-control"
                                name=' granoj2'
                                required
                                value={values.granoj2}
                                onChange={(e) => setValues({ ...values, granoj2: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                placeholder="P.E"
                                class="form-control"
                                name='pegj2'
                                required
                                value={values.pegj2}
                                onChange={(e) => setValues({ ...values, pegj2: e.target.value })} />
                        </div>

                        <div className="JIGS1">
                            <label form='text' > Desensolve:</label>
                            <input
                                placeholder="Desens"
                                class="form-control"
                                name=' desenj2'
                                required
                                value={values.desenj2}
                                onChange={(e) => setValues({ ...values, desenj2: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text' > P.E:</label>
                            <input
                                class="form-control"
                                placeholder="P.E"
                                name=' pedj2'
                                value={values.pedj2}
                                required
                                onChange={(e) => setValues({ ...values, pedj2: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text'> Colas:</label>
                            <input
                                class="form-control"
                                placeholder="Colas"
                                name='colasj2'
                                required
                                value={values.colasj2}
                                onChange={(e) => setValues({ ...values, colasj2: e.target.value })} />
                        </div>
                        <div className="JIGS1">
                            <label form='text'> P.E:</label>
                            <input
                                placeholder="P.E"
                                class="form-control"
                                name='pecj2'
                                required
                                value={values.pecj2}
                                onChange={(e) => setValues({ ...values, pecj2: e.target.value })} />
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

export default Modificarjigs
