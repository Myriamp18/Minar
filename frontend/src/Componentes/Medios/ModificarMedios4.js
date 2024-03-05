import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ModificarMedios4() {
    const { id } = useParams()
    const [values, setValues] = useState({
        fecha: '',
        entradas:"",
        salidas: "",
        pe: "",
        
       
    
      })
      
      const navigate = useNavigate()
      const [saldoAnterior, setSaldoAnterior] = useState(0);

    

      const handleSubmit = (e) => {
        e.preventDefault();

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(values.entradas) - parseFloat(values.salidas);

        // Actualiza el valor del saldo en el objeto de valores
        setValues({ ...values, saldo: nuevoSaldo });
        // Realiza la actualización con el nuevo saldo usando una solicitud PUT
        axios.put(`http://localhost:8081/updatemedios4/${id}`, { ...values, saldo: nuevoSaldo })
          .then(res => {
            console.log(res);
            navigate('/medios4');
          })
          .catch(err => console.log(err));
      };
      
      useEffect(() => {
        axios.get(`http://localhost:8081/getrecordmedios4/${id}`)
            .then((res) => {
                
                    setValues({
                        ...values,
                        fecha: res.data[0].fecha,
                        entradas: res.data[0].entradas,
                        salidas: res.data[0].salidas,
                        pe: res.data[0].pe,
                      
                    });
               
            })
            .catch(err => console.log(err));
    }, []);
  return (
    <div className="d-flex align-items-center flex-column mt-3" >
    <h1 >Modificar Medios 4.00:</h1>
    <div className="close-button" onClick={() => navigate('/medios4')}>
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
            <label form='text' class="form-label"> P.E:</label>
            <input
             type="text"  
             class="form-control"
             id='salidas'
             placeholder='Insertar P.E'  
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

export default ModificarMedios4
