import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ModificarPatioMLT() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
      fecha: '',
      entradas: '',
      salidas: '',
      pe: '',
  });
  const [error, setError] = useState(null); // Estado para manejar errores

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put(`http://localhost:8081/updatempmlt/${id}`, values)

        .then(res => {
            console.log(res);
            // Optionally, you can navigate to a different page or update the UI
            navigate('/mpmlt'); // Example: Navigate to the home page
        })
        .catch(err => console.log(err));
};
useEffect(() => {
  axios.get(`http://localhost:8081/getrecordmpmlt/${id}`)
      .then((res) => {
          const data = res.data[0];
          setValues({
              fecha: data.fecha,
              entradas: data.entradas,
              salidas: data.salidas,
              pe: data.pe,
          });
      })
      .catch(err => console.error(err));
}, [id]);
  return (
    <div className="d-flex align-items-center flex-column mt-3" >
    <h1>Modificar Patio MLT:</h1>
    <div className="close-button" onClick={() => navigate('/mpmlt')}>
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
             id='salidas'
             placeholder='Insertar Cantidad'  
             name='entradas'
             required
             value={values.entradas}
             onChange={(e) => setValues({...values, entradas: e.target.value})}/>
          </div>

          <div class="mb-3">
            <label form='text' class="form-label"> Salidas:</label>
            <input
             type="text"  
             class="form-control"
             id='salidas'
             placeholder='Insertar Cantidad'  
             name='salidas'
             required
             value={values.salidas}
             onChange={(e) => setValues({...values, salidas: e.target.value})}/>
          </div>

          <div class="mb-3">
            <label form='text' class="form-label"> P.ESP:</label>
            <input
             type="text"  
             class="form-control"
             id='pe'
             placeholder='Insertar Peso'  
             name='pe'
             required
             value={values.pe}
             onChange={(e) => setValues({...values, pe: e.target.value})}/>
          </div>

        

          
          <div className="btn-container">
          <button type="submit" className="BTN"  >MODIFICAR</button>
          </div>


        </form>
      
     
      
       
      

  </div>
  )
}

export default ModificarPatioMLT
