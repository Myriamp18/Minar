import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

function ModificarGrano() {
    const [values, setValues] = useState({
        fecha: '',
        enrada: "",
        salidas: "",
        pesp: "",
        saldo: "",
       
    
      })

      const navigate = useNavigate()

      const handleSubmit = (e) => {
          e.preventDefault()
          axios.put(`http://localhost:8081/updategrano/${id}`, values)
  
              .then(res => {
                  console.log(res);
                  // Optionally, you can navigate to a different page or update the UI
                  navigate('/Inicio'); // Example: Navigate to the home page
              })
              .catch(err => console.log(err));
      };
  
      useEffect(() => {
          axios.get(`http://localhost:8081/updategrano/${id}`)
              .then((res) => {
                  
                      setValues({
                          ...values,
                          fecha: res.data[0].fecha,
                          entrada: res.data[0].entrada,
                          salidas: res.data[0].salidas,
                          pesp: res.data[0].pesp,
                          saldo: res.data[0].saldo
                        
                      });
                 
              })
              .catch(err => console.log(err));
      }, []);
      

  return (
    <div className="d-flex align-items-center flex-column mt-3" >
    <h1>Modificar Grano Bandas</h1>
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
            <label form='text' class="form-label"> Entradas:</label>
            <input
             type="text"  
             class="form-control"
             id='entradas'
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
             placeholder='Insertar Peso'  
             name='pesp'
             onChange={(e) => setValues({...values, pesp: e.target.value})}/>
          </div>

          <div class="mb-3">
            <label form='text' class="form-label"> Saldo:</label>
            <input
             type="text"  
             class="form-control"
             id='saldo'
             placeholder='Insertar Cantidad'  
             name='saldo'
             onChange={(e) => setValues({...values, saldo: e.target.value})}/>
          </div>

          
          <div className="btn-container">
          <button type="submit" className="BTN"  >GUARDAR</button>
          </div>


        </form>
      
     
      
       
      

  </div>
  )
}

export default ModificarGrano
