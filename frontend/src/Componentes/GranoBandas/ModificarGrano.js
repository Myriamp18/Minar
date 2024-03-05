import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


function ModificarGrano() {
   const { id } = useParams()
    const [values, setValues] = useState({
        fecha: '',
        entrada: "",
        salidas: "",
        pesp: "",
        
       
    
      })

      const navigate = useNavigate()

      const handleSubmit = (e) => {
          e.preventDefault()
          axios.put(`http://localhost:8081/updategranobandas/${id}`, values)
  
              .then(res => {
                  console.log(res);
                  // Optionally, you can navigate to a different page or update the UI
                  navigate('/granobandas'); // Example: Navigate to the home page
              })
              .catch(err => console.log(err));
      };
  
      useEffect(() => {
          axios.get(`http://localhost:8081/getrecordgranobandas/${id}`)
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
              placeholder='Insertar Cantidad'
              name='fecha'
              required
              value={values.fecha}
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
             value={values.entrada}
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
             value={values.salidas}
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
             required
             value={values.pesp}
             onChange={(e) => setValues({...values, pesp: e.target.value})}/>
          </div>

        

          
          <div className="btn-container">
          <button type="submit" className="BTN"  >MODIFICAR</button>
          </div>


        </form>
      
     
      
       
      

  </div>
  )
}

export default ModificarGrano
