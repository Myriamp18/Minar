import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ModificarSeleccion() {
    const { id } = useParams()
    const [values, setValues] = useState({
        fecha: '',
        entrada: "",
        salida: "",
        pesp: "",
       


    })

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8081/updateseleccion/${id}`, values)

            .then(res => {
                console.log(res);
                // Optionally, you can navigate to a different page or update the UI
                navigate('/seleccion'); // Example: Navigate to the home page
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        axios.get(`http://localhost:8081/getrecorseleccion/${id}`)
            .then((res) => {
                
                    setValues({
                        ...values,
                        fecha: res.data[0].fecha,
                        entrada: res.data[0].entrada,
                        salida: res.data[0].salida,
                        pesp: res.data[0].pesp,
                       
                      
                    });
               
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="d-flex align-items-center flex-column mt-3" >
    <h1>Modificar Seleccion</h1>
    <div className="close-button" onClick={() => navigate('/seleccion')}>
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
             name='salida'
             value={values.salida}
             onChange={(e) => setValues({...values, salida: e.target.value})}/>
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

export default ModificarSeleccion
