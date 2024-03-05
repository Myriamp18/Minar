import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function FrmBandas() {
    const [values, setValues] = useState({
        fecha: '',
        entrada: "",
        salidas: "",
        pesp: "",
        
       
    
      })

      const navigate = useNavigate()

  const handleSubmit =(e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/creategranobandas', values)
    .then(res => {
      console.log(res);
      // Optionally, you can navigate to a different page or update the UI
      navigate('/granobandas'); // Example: Navigate to the home page
    })
    .catch(err => console.log(err));
};
  
   
  return (

    <div className="d-flex align-items-center flex-column mt-3" >
    <h1>Insertar Grano Bandas</h1>
    <div className="close-button" onClick={() => navigate('/granobandas')}>
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
            <label form='text' class="form-label"> Entradas:</label>
            <input
             type="text"  
             class="form-control"
             id='entradas'
             required
             placeholder='Insertar Cantidad'  
             name='entradas'
             onChange={(e) => setValues({...values, entrada: e.target.value})}/>
          </div>


          <div class="mb-3">
            <label form='text' class="form-label"> Salidas:</label>
            <input
             type="text"  
             class="form-control"
             id='salidas'
             required
             placeholder='Insertar Cantidad'  
             name='salidas'
             onChange={(e) => setValues({...values, salidas: e.target.value})}/>
          </div>

          <div class="mb-3">
            <label form='text' class="form-label"> P.ESP:</label>
            <input
             type="text"  
             class="form-control"
             id='pesp'
             required
             placeholder='Insertar Peso'  
             name='pesp'
             onChange={(e) => setValues({...values, pesp: e.target.value})}/>
          </div>

         

          
          <div className="btn-container">
          <button type="submit" className="BTN"  >GUARDAR</button>
          </div>


        </form>
      
     
      
       
      

  </div>
  )
}

export default FrmBandas
