import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Silos/FrmSilos.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function FrmHorometroJigs() {
    const [values, setValues] = useState({
        fecha: '',
        turno: "1",
        inicio: "",
        final: "",
        hrs: "",
        inicioj2: "",
        finalj2: "",
        hrsj2: "",
       totalhrs:"",
       totalhrsj2:"",
    
    
    
      })
    
      const navigate = useNavigate()
    
      const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8081/createhjigs', values)
          .then(res => {
            console.log(res);
    
            // Optionally, you can navigate to a different page or update the UI
            navigate('/hjigs'); // Example: Navigate to the home page
          })
          .catch(err => console.log(err));
    
      };
      
  return (
    <div className="d-flex align-items-center flex-column mt-2">
    <h1>Insertar Horometro JIGS</h1>
    <div className="close-button" onClick={() => navigate('/hjigs')}>
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
        
       
      </div>
      <div className='silos'>
        <div class="mb-2">
          <label form='text' class="form-label"> Final J1:</label>
          <input
            type="text"
            class="form-control"
            id='final'
            placeholder='Insertar Cantidad'
            name='final'
            onChange={(e) => setValues({ ...values, final: e.target.value })} required/>
        </div>
        <div class="mb-2">
          <label form='text' class="form-label"> Final J2:</label>
          <input
            type="text"
            class="form-control"
            id='finalj2'
            placeholder='Insertar Horometro'
            name='finalj2'
            onChange={(e) => setValues({ ...values, finalj2: e.target.value })} required/>
        </div>
      </div>
      <div className='silos'>
        <div class="mb-2">
          <label form='text' class="form-label"> TotalHoras J1:</label>
          <input
            type="text"
            class="form-control"
            id='hrs'
            placeholder='Insertar Horas'
            name='hrs'
            onChange={(e) => setValues({ ...values, totalhrs: e.target.value })} />
        </div>
        <div class="mb-2">
          <label form='text' class="form-label"> TotalHoras J2:</label>
          <input
            type="text"
            class="form-control"
            id='hrsj2'
            placeholder='Insertar Horas'
            name='hrsj2'
            onChange={(e) => setValues({ ...values, totalhrsj2: e.target.value })} />
        </div>
      </div>
      
     
       
     
    
      <div className="btn-container">
        <button type="submit" className="BTN"  >GUARDAR</button>
      </div>


    </form>






  </div>
  )
}

export default FrmHorometroJigs
