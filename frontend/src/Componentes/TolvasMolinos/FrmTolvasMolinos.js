import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function FrmTolvasMolinos() {
    const [values, setValues] = useState({
        fecha: '',
        tolvamolinos:'',
        petm: "",
        mezclasmoler: "",
        pememo:""
        
        
       
    
      })
      const navigate = useNavigate()

      const [saldoAnterior, setSaldoAnterior] = useState(0);


    const handleSubmit = (e) => {
        e.preventDefault();

      

        // Realiza la inserción con el nuevo saldo
        axios.post('http://localhost:8081/createtolvas',values)
        .then(res => {
            console.log(res);
            navigate('/tolvas');
        })
        .catch(err => {
            console.error('Error inserting data:', err);
        });
};
  return (
    <div className="d-flex align-items-center flex-column mt-3" >
    <h1 >Tolvas de Molinos:</h1>
    <div className="close-button" onClick={() => navigate('/tolvas')}>
        <FontAwesomeIcon icon={faTimes} />
        </div>
      <form className="w-50" onSubmit={handleSubmit} >
          <div class="mb-3 mt-3">
            <label form='fecha' class="form-label"> Fecha:</label>
            <input
              type="date"  
              class="form-control"
              id='date'
              required
              placeholder='Insertar Cantidad'
              name='fecha'
              onChange={(e) => setValues({...values, fecha: e.target.value})}
            />
          </div>

          <div class="mb-3">
            <label form='text' class="form-label"> Tolvas de Molinos:</label>
            <input
             type="text"  
             class="form-control"
             id='salidas'
             required
             placeholder='Insertar Cantidad'  
             name='tolvamolinos'
             onChange={(e) => setValues({...values, tolvamolinos: e.target.value})}/>
          </div>
         


          <div class="mb-3">
            <label form='text' class="form-label"> P.ESP:</label>
            <input
             type="text"  
             class="form-control"
             id='salidas'
             required
             placeholder='Insertar Cantidad'  
             name='petm'
             onChange={(e) => setValues({...values, petm: e.target.value})}/>
          </div>

          <div class="mb-3">
            <label form='text' class="form-label"> Mezclas para Moler:</label>
            <input
             type="text"  
             class="form-control"
             id='pe'
             required
             placeholder='Insertar Peso'  
             name='mezclasmoler'
             onChange={(e) => setValues({...values, mezclasmoler: e.target.value})}/>
          </div>

          <div class="mb-3">
            <label form='text' class="form-label"> P.ESP:</label>
            <input
             type="text"  
             class="form-control"
             id='salidas'
             required
             placeholder='Insertar Cantidad'  
             name='pememo'
             onChange={(e) => setValues({...values, pememo: e.target.value})}/>
          </div>

          
          <div className="btn-container">
          <button type="submit" className="BTN"  >GUARDAR</button>
          </div>


        </form>
      
     
      
       
      

  </div>
  )
}

export default FrmTolvasMolinos
