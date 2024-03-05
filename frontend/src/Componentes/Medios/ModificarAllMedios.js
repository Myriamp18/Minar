import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ModificarAllMedios() {

    const { id } = useParams()
    const [values, setValues] = useState({
        fecha: '',
        entradasm46:"",
        salidasm46: "",
        pe46: "",
        
       
    
      })
      
      const navigate = useNavigate()
      const [saldoAnterior, setSaldoAnterior] = useState(0);

    

      const handleSubmit = (e) => {
        e.preventDefault();

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(values.entradasm46) - parseFloat(values.salidasm46);

        // Actualiza el valor del saldo en el objeto de valores
        setValues({ ...values, saldo: nuevoSaldo });
        // Realiza la actualización con el nuevo saldo usando una solicitud PUT
        axios.put(`http://localhost:8081/updatemedios46/${id}`, { ...values, saldo: nuevoSaldo })
          .then(res => {
            console.log(res);
            navigate('/medios46');
          })
          .catch(err => console.log(err));
      };
      
      useEffect(() => {
        axios.get(`http://localhost:8081/getrecordmedios46/${id}`)
            .then((res) => {
                
                    setValues({
                        ...values,
                        fecha: res.data[0].fecha,
                        entradasm46: res.data[0].entradasm46,
                        salidasm46: res.data[0].salidasm46,
                        pe46: res.data[0].pe46,
                      
                    });
               
            })
            .catch(err => console.log(err));
    }, []);
  return (
    <div className="d-flex align-items-center flex-column mt-3" >
    <h1 >Modificar Medios 4.06:</h1>
    <div className="close-button" onClick={() => navigate('/medios46')}>
            <FontAwesomeIcon icon={faTimes} />
            </div>
      <form className="w-50" onSubmit={handleSubmit} >
          <div class="mb-3 mt-3">
            <label form='fecha' class="form-label"> Fecha:</label>
            <input
              type="date"  
              required
              class="form-control"
              id='date'
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
             placeholder='Insertar Cantidad'  
             name='entradas'
             required
             value={values.entradasm46}
             onChange={(e) => setValues({...values, entradasm46: e.target.value})}/>
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
             value={values.salidasm46}
             onChange={(e) => setValues({...values, salidasm46: e.target.value})}/>
          </div>
          
          <div class="mb-3">
            <label form='text' class="form-label"> P.E:</label>
            <input
             type="text"  
             class="form-control"
             id='salidas'
             placeholder='Insertar P.E'  
             name='pe'
             required
             value={values.pe46}
             onChange={(e) => setValues({...values, pe46: e.target.value})}/>
          </div>
          
          <div className="btn-container">
          <button type="submit" className="BTN"  >MODIFICAR</button>
          </div>


        </form>
      
     
      
       
      

  </div>
  )
}

export default ModificarAllMedios
