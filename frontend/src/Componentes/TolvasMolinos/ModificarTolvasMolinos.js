import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ModificarTolvasMolinos() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        fecha: '',
        tolvamolinos: '',
        petm: '',
        mezclasmoler: '',
        pememo:''
    });
    const [error, setError] = useState(null); // Estado para manejar errores

    const handleSubmit = (e) => {
      e.preventDefault()
      axios.put(`http://localhost:8081/updatetolvas/${id}`, values)

          .then(res => {
              console.log(res);
              // Optionally, you can navigate to a different page or update the UI
              navigate('/tolvas'); // Example: Navigate to the home page
          })
          .catch(err => console.log(err));
  };
  useEffect(() => {
    axios.get(`http://localhost:8081/getrecordtolvas/${id}`)
        .then((res) => {
            const data = res.data[0];
            setValues({
                fecha: data.fecha,
                tolvamolinos: data.tolvamolinos,
                petm: data.petm,
                mezclasmoler: data.mezclasmoler,
                pememo: data.pememo
            });
        })
        .catch(err => console.error(err));
}, [id]);
  return (
    <div className="d-flex align-items-center flex-column mt-3" >
    <h1>Modificar Tolvas Molinos:</h1>
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
              placeholder='Insertar Cantidad'
              name='fecha'
              value={values.fecha}
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
             value={values.tolvamolinos}
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
             value={values.petm}
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
             value={values.mezclasmoler}
             onChange={(e) => setValues({...values, mezclasmoler: e.target.value})}/>
          </div>

          <div class="mb-3">
            <label form='text' class="form-label"> P.ESP:</label>
            <input
             type="text"  
             class="form-control"
             id='salidas'
             placeholder='Insertar Cantidad'  
             name='pememo'
             required
             value={values.pememo}
             onChange={(e) => setValues({...values, pememo: e.target.value})}/>
          </div>

          
        

          
          <div className="btn-container">
          <button type="submit" className="BTN"  >MODIFICAR</button>
          </div>


        </form>
      
     
      
       
      

  </div>
  )
}

export default ModificarTolvasMolinos
