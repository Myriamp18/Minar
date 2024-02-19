import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Silos/FrmSilos.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


function FrmMezclas() {
  const [values, setValues] = useState({
    fecha: '',
    turno: "1",
    concmesas: "",
    pecm: "",
    medios: "",
    pem: "",
    concjigs: "",
    pejig: "",
    desenslovez: "",
    pedese: "",
 
    pemt: "",



  })

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/createmezclasmolienda', values)
      .then(res => {
        console.log(res);

        // Optionally, you can navigate to a different page or update the UI
        navigate('/mezclas'); // Example: Navigate to the home page
      })
      .catch(err => console.log(err));

  };
  return (
    <div className="d-flex align-items-center flex-column mt-2">
      <h1>Insertar Mezclas</h1>
      <div className="close-button" onClick={() => navigate('/mezclas')}>
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
    />
</div>
<div className="molino">
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
        <div className='silos'>
          <div class="mb-3 ">
            <label form='text' class="form-label"> Con.Mesas:</label>
            <input
              type="text"
              class="form-control"
              id='concmesas'
              placeholder='Insertar Cantidad'
              name='concmesas'
              onChange={(e) => setValues({ ...values, concmesas: e.target.value })} />
          </div>
          <div class="mb-3">
            <label form='text' class="form-label"> P.ESP:</label>
            <input
              type="text"
              class="form-control"
              id='pecm'
              placeholder='Insertar P.ESP'
              name='pecm'
              onChange={(e) => setValues({ ...values, pecm: e.target.value })} />
          </div>
        </div>
        <div className='silos'>
          <div class="mb-3">
            <label form='text' class="form-label"> Medios:</label>
            <input
              type="text"
              class="form-control"
              id='medios'
              placeholder='Insertar Cantidad'
              name='medios'
              onChange={(e) => setValues({ ...values, medios: e.target.value })} />
          </div>
          <div class="mb-3">
            <label form='text' class="form-label"> P.ESP:</label>
            <input
              type="text"
              class="form-control"
              id='pem'
              placeholder='Insertar P.ESP'
              name='pem'
              onChange={(e) => setValues({ ...values, pem: e.target.value })} />
          </div>
        </div>
        <div className='silos'>
          <div class="mb-3">
            <label form='text' class="form-label"> Conc.Jigs:</label>
            <input
              type="text"
              class="form-control"
              id='concjigs'
              placeholder='Insertar Cantidad'
              name='concjigs'
              onChange={(e) => setValues({ ...values, concjigs: e.target.value })} />
          </div>
          <div class="mb-3">
            <label form='text' class="form-label"> P.ESP:</label>
            <input
              type="text"
              class="form-control"
              id='pejig'
              placeholder='Insertar P.ESP'
              name='pejig'
              onChange={(e) => setValues({ ...values, pejig: e.target.value })} />
          </div>
        </div>
        <div className='silos'>
          <div class="mb-3">
            <label form='text' class="form-label"> Desensolvez:</label>
            <input
              type="text"
              class="form-control"
              id='desenslovez'
              placeholder='Insertar Cantidad'
              name='desenslovez'
              onChange={(e) => setValues({ ...values, desenslovez: e.target.value })} />
          </div>
          <div class="mb-3">
            <label form='text' class="form-label"> P.ESP:</label>
            <input
              type="text"
              class="form-control"
              id='pedese'
              placeholder='Insertar P.ESP'
              name='pedese'
              onChange={(e) => setValues({ ...values, pedese: e.target.value })} />
          </div>
        </div>
        <div className='silos'>
       
          <div class="mb-3">
            <label form='text' class="form-label"> P.ESP:</label>
            <input
              type="text"
              class="form-control"
              id='pemt'
              placeholder='Insertar P.ESP'
              name='pemt'
              onChange={(e) => setValues({ ...values, pemt: e.target.value })} />
          </div>
        </div>
        <div className="btn-container">
          <button type="submit" className="BTN"  >GUARDAR</button>
        </div>


      </form>






    </div>
  )
}

export default FrmMezclas
