import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function FrmMedios3() {
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

        // Realiza la inserción con el nuevo saldo
        axios.post('http://localhost:8081/createmedios3', { ...values, saldo: nuevoSaldo })
            .then(res => {
                console.log(res);
                navigate('/medios3');
            })
            .catch(err => console.log(err));
    };
  return (
    <div className="d-flex align-items-center flex-column mt-3" >
    <h1 >Insertar Medios 3.98:</h1>
    <div className="close-button" onClick={() => navigate('/medios3')}>
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
              onChange={(e) => setValues({...values, fecha: e.target.value})}
            />
          </div>

        
        
        
          
          
          <div className="btn-container">
          <button type="submit" className="BTN"  >GUARDAR</button>
          </div>


        </form>
      
     
      
        </div>
      

  )
}

export default FrmMedios3
