import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FrmSilos.css'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'


function FrmSilos() {

  const [values, setValues] = useState({
    fecha: '',
    silo1: "",
    silo2: "",
    silo3: "",
    silo4: "",
    silo5: ""

  })

  const navigate = useNavigate()

  const handleSubmit =(e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/create', values)
    .then(res => {
      console.log(res);
      // Optionally, you can navigate to a different page or update the UI
      navigate('/Inicio'); // Example: Navigate to the home page
    })
    .catch(err => console.log(err));
};

    

    return(
     <div className="d-flex align-items-center flex-column mt-3">
      <h1>Insertar Silos</h1>
        <form className="w-50" onSubmit={handleSubmit} >
            <div class="mb-3 mt-3">
              <label form='fecha' class="form-label"> Fecha:</label>
              <input
                type="date"  
                class="form-control"
                id='date'
                placeholder='Insertar Cantidad'
                name='fecha'
                onChange={(e) => setValues({...values, fecha: e.target.value})}
              />
            </div>

            <div class="mb-3">
              <label form='text' class="form-label"> Silo 1:</label>
              <input
               type="text"  
               class="form-control"
               id='silo1'
               placeholder='Insertar Cantidad'  
               name='silo1'
               onChange={(e) => setValues({...values, silo1: e.target.value})}/>
            </div>


            <div class="mb-3">
              <label form='text' class="form-label"> Silo 2:</label>
              <input
               type="text"  
               class="form-control"
               id='silo2'
               placeholder='Insertar Cantidad'  
               name='silo2'
               onChange={(e) => setValues({...values, silo2: e.target.value})}/>
            </div>

            <div class="mb-3">
              <label form='text' class="form-label"> Silo 3:</label>
              <input
               type="text"  
               class="form-control"
               id='silo3'
               placeholder='Insertar Cantidad'  
               name='silo3'
               onChange={(e) => setValues({...values, silo3: e.target.value})}/>
            </div>

            <div class="mb-3">
              <label form='text' class="form-label"> Silo 4:</label>
              <input
               type="text"  
               class="form-control"
               id='silo4'
               placeholder='Insertar Cantidad'  
               name='silo4'
               onChange={(e) => setValues({...values, silo4: e.target.value})}/>
            </div>

            <div class="mb-3">
              <label form='text' class="form-label"> Silo 5:</label>
              <input
               type="text"  
               class="form-control"
               id='silo5'
               placeholder='Insertar Cantidad'  
               name='silo5'
               onChange={(e) => setValues({...values, silo5: e.target.value})}/>
            </div>

            <div className="btn-container">
            <button type="submit" className="BTN"  >GUARDAR</button>
            </div>


          </form>
        
       
        
         
        

    </div>
        
    )
}

export default FrmSilos