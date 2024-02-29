import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ModificarNotas() {
  const { id } = useParams()
    const [values, setValues] = useState({
        fecha: '',
        comentario: "",
       
       
    
    
      })
      const navigate = useNavigate()

      const handleSubmit = (e) => {
          e.preventDefault()
          axios.put(`http://localhost:8081/updatenotas/${id}`, values)
  
              .then(res => {
                  console.log(res);
                  // Optionally, you can navigate to a different page or update the UI
                  navigate('/notas'); // Example: Navigate to the home page
              })
              .catch(err => console.log(err));
      };
  
      useEffect(() => {
          axios.get(`http://localhost:8081/getrecordnotas/` + id)
              .then((res) => {
  
                  setValues({
                      ...values,
                      fecha: res.data[0].fecha,
                      comentario : res.data[0].comentario,
                    
                  });
  
              })
              .catch(err => console.log(err));
      }, []);
  return (
    <div className="d-flex align-items-center flex-column mt-3" >
    <h1>Modificar Nota</h1>
    <div className="close-button" onClick={() => navigate('/notas')}>
      <FontAwesomeIcon icon={faTimes} />
    </div>
    <form className="w-50" onSubmit={handleSubmit} >



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
        />
      </div>





      <label form='text'> Nota:</label>

      <textarea
        placeholder="Inserte los medios a lavar a mesas y a jigss ."
        className="form-control"
        name='descripcion'
        style={{ height: '200px', width: '100%', whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflowWrap: 'break-word' }}
        value={values.comentario}
        onChange={(e) => setValues({ ...values, comentario: e.target.value })}
      />




      <div className="btnmolino-container">
        <button type="submit" className="BTNmolino"  >GUARDAR</button>
      </div>


    </form>






  </div>
  )
}

export default ModificarNotas
