import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ModificarPMolinos() {
    const { id } = useParams()
    const [values, setValues] = useState({
        fecha: '',
        turno: "",
        hrsm1: "",
        prodm1: "",
        hrsm2: "",
        prodm2:"",
    
    
    
      })
      const navigate = useNavigate()

      const handleSubmit = (e) => {
          e.preventDefault()
          axios.put(`http://localhost:8081/updatehrsmolinos/${id}`, values)
  
              .then(res => {
                  console.log(res);
                  // Optionally, you can navigate to a different page or update the UI
                  navigate('/molinos'); // Example: Navigate to the home page
              })
              .catch(err => console.log(err));
      };
      useEffect(() => {
        axios.get(`http://localhost:8081/getrecordhrsmolinos/${id}`)
            .then((res) => {
                
                    setValues({
                        ...values,
                        fecha: res.data[0].fecha,
                        turno: res.data[0].turno,
                        hrsm1: res.data[0].hrsm1,
                        prodm1: res.data[0].prodm1,
                        hrsm2: res.data[0].hrsm2,
                        prodm2: res.data[0].prodm2,
                       
                       
                      
                    });
               
            })
            .catch(err => console.log(err));
    }, []);
  return (
    <div className="d-flex align-items-center flex-column mt-2">
    <h1>Modificar Horas Molinos</h1>
    <div className="close-button" onClick={() => navigate('/molinos')}>
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
          <label form='text' class="form-label"> Horas Mo.1:</label>
          <input
            type="text"
            class="form-control"
            id='final'
            placeholder='Insertar Cantidad'
            name='final'
            value={values.hrsm1}
            onChange={(e) => setValues({ ...values, hrsm1: e.target.value })} required/>
        </div>

        <div class="mb-2">
          <label form='text' class="form-label"> Horas Mo.2:</label>
          <input
            type="text"
            class="form-control"
            id='final'
            placeholder='Insertar Cantidad'
            name='final'
            value={values.hrsm2}
            onChange={(e) => setValues({ ...values, hrsm2: e.target.value })} required/>
        </div>
      </div>
     
      
     
       
     
    
      <div className="btn-container">
        <button type="submit" className="BTN"  >MODIFICAR</button>
      </div>


    </form>






  </div>
  )
}

export default ModificarPMolinos
