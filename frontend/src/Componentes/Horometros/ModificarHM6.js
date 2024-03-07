import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ModificarHM6() {
    const { id } = useParams()
    const [values, setValues] = useState({
        fecha: '',
        turno: "1",
        inicio: "",
        final: "",
        hrs: "",
       totalhrs:"",
    
    
    
    
      })
      const navigate = useNavigate()

      const handleSubmit = (e) => {
          e.preventDefault()
          axios.put(`http://localhost:8081/updatehmesa6/${id}`, values)
  
              .then(res => {
                  console.log(res);
                  // Optionally, you can navigate to a different page or update the UI
                  navigate('/hmesa6'); // Example: Navigate to the home page
              })
              .catch(err => console.log(err));
      };
      useEffect(() => {
        axios.get(`http://localhost:8081/getrecordhmesa6/${id}`)
            .then((res) => {
                
                    setValues({
                        ...values,
                        fecha: res.data[0].fecha,
                        turno: res.data[0].turno,
                        inicio: res.data[0].inicio,
                        final: res.data[0].final,
                        hrs: res.data[0].hrs,
                        totalhrs: res.data[0].totalhrs,
                        
                       
                      
                    });
               
            })
            .catch(err => console.log(err));
    }, []);
  return (
    <div className="d-flex align-items-center flex-column mt-2">
    <h1>Modificar Horometro Mesa 6</h1>
    <div className="close-button" onClick={() => navigate('/hmesa6')}>
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
      <div className=''>
      <div class="mb-2">
          <label form='text' class="form-label"> Inicio Mesa 6:</label>
          <input
            type="text"
            class="form-control"
            id='final'
            placeholder='Insertar Cantidad'
            name='inicio'
            value={values.inicio}
            onChange={(e) => setValues({ ...values, inicio: e.target.value })} required/>
        </div>
        
      </div>
      <div className=''>
        <div class="mb-2">
          <label form='text' class="form-label"> Final Mesa 5:</label>
          <input
            type="text"
            class="form-control"
            id='final'
            placeholder='Insertar Cantidad'
            name='final'
            value={values.final}
            onChange={(e) => setValues({ ...values, final: e.target.value })} required/>
        </div>
       
      </div>
     
     
       
     
    
      <div className="btn-container">
        <button type="submit" className="BTN"  >MODIFICAR</button>
      </div>


    </form>






  </div>
  )
}

export default ModificarHM6
