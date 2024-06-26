import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Silos/FrmSilos.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function FrmHMolinos() {
    const [values, setValues] = useState({
        fecha: '',
        turno: "1",
        inicio: "",
        final: "",
        hrs: "",
        totalhrs:"",
        iniciom2: "",
        finalm2: "",
        hrsm2: "",
        totalhrsm2:"",
    
    
    
      })
    
      const navigate = useNavigate()
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Realiza la inserción con el nuevo saldo
        axios.post('http://localhost:8081/createhmolinos',values )
        .then(res => {
            console.log(res);
            navigate('/Horomolinos');
        })
        .catch(err => {
            console.error('Error inserting data:', err);
        });
    };
  return (
    <div className="d-flex align-items-center flex-column mt-2">
    <h1>Insertar Horometro Molinos</h1>
    <div className="close-button" onClick={() => navigate('/Horomolinos')}>
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
          <label form='text' class="form-label"> Final Mo.1:</label>
          <input
            type="text"
            class="form-control"
            id='final'
            placeholder='Insertar Horometro'
            name='final'
            onChange={(e) => setValues({ ...values, final: e.target.value })} required/>
        </div>
        <div class="mb-2">
          <label form='text' class="form-label"> Final Mo.2:</label>
          <input
            type="text"
            class="form-control"
            id='finalj2'
            placeholder='Insertar Horometro'
            name='finalj2'
            onChange={(e) => setValues({ ...values, finalm2: e.target.value })} required/>
        </div>
      </div>
     
     
       
     
    
      <div className="btn-container">
        <button type="submit" className="BTN"  >GUARDAR</button>
      </div>


    </form>






  </div>
  )
}

export default FrmHMolinos
