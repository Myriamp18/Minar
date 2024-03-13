import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './FrmReporte.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function FrmMesas() {
    const [values, setValues] = useState({
        fecha: "",
        turno: "1",
        seleccion:"2",
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
        axios.post('http://localhost:8081/createrreportemesas', values)
            .then(res => {
                console.log(res);

                // Optionally, you can navigate to a different page or update the UI
                navigate('/dmesas'); // Example: Navigate to the home page
            })
            .catch(err => console.log(err));

    };
  return (
    <div className="d-flex align-items-center flex-column mt-3" >
    <center><h1>Modificar Mesas</h1></center>
    <div className="close-button" onClick={() => navigate('/dmesas')}>
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
                    required
                    placeholder='Insertar Cantidad'
                    name='fecha'
                    value={values.fecha}
                    onChange={(e) => setValues({ ...values, fecha: e.target.value })}
                />
            </div>
            <div className="JIGS1">
                <label>Seleccion:</label>
                <select
                    id="seleccion"
                    name="seleccion"
                    class="form-control"
                    required
                    value={values.seleccion}
                    onChange={(e) => setValues({ ...values, seleccion: e.target.value })} >
                    <option value="1">si</option>
                    <option value="2">no</option>
                   

                </select>

            </div>

            <div className="JIGS1">
                <label>Turno:</label>
                <select
                    id="seleccion"
                    name="seleccion"
                    class="form-control"
                    required
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
                        required
                        value={values.alimm12}
                        onChange={(e) => setValues({ ...values, alimm12: e.target.value })} />

                </div>

                <div className="JIGS1">
                    <label form='text' > P.E:</label>
                    <input
                        class="form-control"
                        placeholder="P.E"
                        name=' peam12'
                        required
                        value={values.peam12}
                        onChange={(e) => setValues({ ...values, peam12: e.target.value })} />
                </div>

                <div className="JIGS1">
                    <label form='text'> Concentrado:</label>
                    <input
                        class="form-control"
                        placeholder="Conc."
                        name=' conm12'
                        required
                        value={values.conm12}
                        onChange={(e) => setValues({ ...values, conm12: e.target.value })} />
                </div>

                <div className="JIGS1">
                    <label form='text' > P.E:</label>
                    <input
                        class="form-control"
                        placeholder="P.E"
                        required
                        name='  pecnm12'
                        value={values.pecnm12}
                        onChange={(e) => setValues({ ...values, pecnm12: e.target.value })} />
                </div>

                <div className="JIGS1">
                    <label form='text' > Medios:</label>
                    <input
                        class="form-control"
                        placeholder="Medios"
                        required
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
                        required
                        value={values.pemm12}
                        onChange={(e) => setValues({ ...values, pemm12: e.target.value })} />
                </div>
                <div className="JIGS1">
                    <label form='text'> Colas:</label>
                    <input
                        class="form-control"
                        placeholder="Colas"
                        name=' colasm12'
                        required
                        value={values.colasm12}
                        onChange={(e) => setValues({ ...values, colasm12: e.target.value })} />
                </div>
                <div className="JIGS1">
                    <label form='text'> P.E:</label>
                    <input
                        class="form-control"
                        placeholder="P.E"
                        name='pecm12'
                        required
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
                        required
                        value={values.alimm34}
                        onChange={(e) => setValues({ ...values, alimm34: e.target.value })} />

                </div>

                <div className="JIGS1">
                    <label form='text' > P.E:</label>
                    <input
                        class="form-control"
                        placeholder="P.E"
                        name='peam34'
                        required
                        value={values.peam34}
                        onChange={(e) => setValues({ ...values, peam34: e.target.value })} />
                </div>

                <div className="JIGS1">
                    <label form='text'> Concentrado:</label>
                    <input
                        class="form-control"
                        placeholder="Conc."
                        name='conm34'
                        required
                        value={values.conm34}
                        onChange={(e) => setValues({ ...values, conm34: e.target.value })} />
                </div>

                <div className="JIGS1">
                    <label form='text'> P.E:</label>
                    <input
                        class="form-control"
                        placeholder="P.E"
                        name='pecnm34'
                        required
                        value={values.pecnm34}
                        onChange={(e) => setValues({ ...values, pecnm34: e.target.value })} />
                </div>

                <div className="JIGS1">
                    <label form='text' >Medios:</label>
                    <input
                        class="form-control"
                        placeholder="Medios"
                        name=' mediosm34'
                        required
                        value={values.mediosm34}
                        onChange={(e) => setValues({ ...values, mediosm34: e.target.value })} />
                </div>
                <div className="JIGS1">
                    <label form='text' > P.E:</label>
                    <input
                        class="form-control"
                        placeholder="P.E"
                        name='pemm34'
                        required
                        value={values.pemm34}
                        onChange={(e) => setValues({ ...values, pemm34: e.target.value })} />
                </div>
                <div className="JIGS1">
                    <label form='text'> Colas:</label>
                    <input
                        class="form-control"
                        placeholder="Colas"
                        name=' colasm34'
                        required
                        value={values.colasm34}
                        onChange={(e) => setValues({ ...values, colasm34: e.target.value })} />
                </div>
                <div className="JIGS1">
                    <label form='text'> P.E:</label>
                    <input
                        class="form-control"
                        placeholder="P.E"
                        name=' pecm34'
                        required
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
                        required
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
                        required
                        value={values.peam5}
                        onChange={(e) => setValues({ ...values, peam5: e.target.value })} />
                </div>

                <div className="JIGS1">
                    <label form='text'> Concentrado:</label>
                    <input
                        class="form-control"
                        placeholder="Conc."
                        name=' conm5'
                        required
                        value={values.conm5}
                        onChange={(e) => setValues({ ...values, conm5: e.target.value })} />
                </div>

                <div className="JIGS1">
                    <label form='text'> P.E:</label>
                    <input
                        class="form-control"
                        placeholder="P.E"
                        name='pecnm5'
                        required
                        value={values.pecnm5}
                        onChange={(e) => setValues({ ...values, pecnm5: e.target.value })} />
                </div>

                <div className="JIGS1">
                    <label form='text' >Medios:</label>
                    <input
                        class="form-control"
                        placeholder="Medios"
                        name='mediosm5'
                        required
                        value={values.mediosm5}
                        onChange={(e) => setValues({ ...values, mediosm5: e.target.value })} />
                </div>
                <div className="JIGS1">
                    <label form='text' > P.E:</label>
                    <input
                        class="form-control"
                        placeholder="P.E"
                        name='pemm5'
                        required
                        value={values.pemm5}
                        onChange={(e) => setValues({ ...values, pemm5: e.target.value })} />
                </div>
                <div className="JIGS1">
                    <label form='text'> Colas:</label>
                    <input
                        class="form-control"
                        placeholder="Colas"
                        name=' colasm5'
                        required
                        value={values.colasm5}
                        onChange={(e) => setValues({ ...values, colasm5: e.target.value })} />
                </div>
                <div className="JIGS1">
                    <label form='text'> P.E:</label>
                    <input
                        class="form-control"
                        placeholder="P.E"
                        required
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
                        required
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
                        required
                        value={values.peam6}
                        onChange={(e) => setValues({ ...values, peam6: e.target.value })} />
                </div>

                <div className="JIGS1">
                    <label form='text'> Concentrado:</label>
                    <input
                        class="form-control"
                        placeholder="Conc."
                        name=' conm6'
                        required
                        value={values.conm6}
                        onChange={(e) => setValues({ ...values, conm6: e.target.value })} />
                </div>

                <div className="JIGS1">
                    <label form='text'> P.E:</label>
                    <input
                        class="form-control"
                        placeholder="P.E"
                        required
                        name='pecnm6'
                        value={values.pecnm6}
                        onChange={(e) => setValues({ ...values, pecnm6: e.target.value })} />
                </div>

                <div className="JIGS1">
                    <label form='text' >Medios:</label>
                    <input
                        class="form-control"
                        placeholder="Medios"
                        required
                        name='mediom6'
                        value={values.mediom6}
                        onChange={(e) => setValues({ ...values, mediom6: e.target.value })} />
                </div>
                <div className="JIGS1">
                    <label form='text' > P.E:</label>
                    <input
                        class="form-control"
                        placeholder="P.E"
                        required
                        name='pemm6'
                        value={values.pemm6}
                        onChange={(e) => setValues({ ...values, pemm6: e.target.value })} />
                </div>
                <div className="JIGS1">
                    <label form='text'> Colas:</label>
                    <input
                        class="form-control"
                        placeholder="Colas"
                        required
                        name=' colasm6'
                        value={values.colasm6}
                        onChange={(e) => setValues({ ...values, colasm6: e.target.value })} />
                </div>
                <div className="JIGS1">
                    <label form='text'> P.E:</label>
                    <input
                        class="form-control"
                        placeholder="P.E"
                        required
                        name=' pecm6'
                        value={values.pecm6}
                        onChange={(e) => setValues({ ...values, pecm6: e.target.value })} />
                </div>

            </div>






        </div>


        <div className="btn-container">
            <button type="submit" className="BTN"  >GUARDAR</button>
        </div>


    </form>






</div>
  )
}

export default FrmMesas
