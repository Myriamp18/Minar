import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ModificarMezclas() {
  const { id } = useParams()
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
    axios.put(`http://localhost:8081/updatemezclasmolienda/${id}`, values)

      .then(res => {
        console.log(res);
        // Optionally, you can navigate to a different page or update the UI
        navigate('/mezclas'); // Example: Navigate to the home page
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    axios.get(`http://localhost:8081/getrecordmezclasmolienda/` + id)
      .then((res) => {

        setValues({
          ...values,
          fecha: res.data[0].fecha,
          concmesas: res.data[0].concmesas,
          pecm: res.data[0].pecm,
          medios: res.data[0].medios,
          pem: res.data[0].pem,
          concjigs: res.data[0].concjigs,
          pejig: res.data[0].pejig,
          desenslovez: res.data[0].desenslovez,
          pedese: res.data[0].pedese,
          pemt: res.data[0].pemt,
        });

      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div className="d-flex align-items-center flex-column mt-2">
      <h1>Modificar Mezclas</h1>
      <div className="close-button" onClick={() => navigate('/mezclas')}>
        <FontAwesomeIcon icon={faTimes} />
      </div>

      <form className="w-50" onSubmit={handleSubmit} >
      <div className='nnn'>
        <div class="molino">
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
              value={values.concmesas}
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
              value={values.pecm}
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
              value={values.medios}
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
              value={values.pem}
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
              value={values.concjigs}
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
              value={values.pejig}
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
              value={values.desenslovez}
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
              value={values.pedese}
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
              value={values.pemt}
              onChange={(e) => setValues({ ...values, pemt: e.target.value })} />
          </div>
        </div>
        <div className="btn-container">
          <button type="submit" className="BTN"  >MODIFICAR</button>
        </div>


      </form>






    </div>
  )
}

export default ModificarMezclas
