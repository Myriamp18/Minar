import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

function ModificarCPMoler() {
    const { id } = useParams()
    const [values, setValues] = useState({
        fecha: '',
        entrada: "",
        salida: "",
        pesp: "",
      
       
    
      })
      const navigate = useNavigate()
      const [segundoSaldoAnterior, setSaldoAnterior] = useState(0);

      const obtenersegundoSaldoAnterior = () => {
        axios.get(`http://localhost:8081/updateobtenerSaldoAnterior/${id}`)
          .then((res) => {
            const segundoSaldoAnterior = res.data.segundoSaldoAnterior || 0;
            setSaldoAnterior(segundoSaldoAnterior);
          })
          .catch(err => console.log(err));
    };
    

      const handleSubmit = (e) => {
        e.preventDefault();
      
        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo =segundoSaldoAnterior + parseFloat(values.entrada) - parseFloat(values.salida);
      
        // Actualiza el valor del saldo en el objeto de valores
        setValues({ ...values, saldo: nuevoSaldo });
      
        // Realiza la actualización con el nuevo saldo usando una solicitud PUT
        axios.put(`http://localhost:8081/updateconcpmoler/${id}`, { ...values, saldo: nuevoSaldo })
          .then(res => {
            console.log(res);
            navigate('/Inicio');
          })
          .catch(err => console.log(err));
      };
      
      useEffect(() => {
        axios.get(`http://localhost:8081/getrecorconcpmoler/${id}`)
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
    <h1>Modificar Conc. P/Moler:</h1>
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
            <label form='text' class="form-label"> Entradas:</label>
            <input
             type="text"  
             class="form-control"
             id='entradas'
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
             placeholder='Insertar Cantidad'  
             name='salidas'
             value={values.salida}
             onChange={(e) => setValues({...values, salida: e.target.value})}/>
          </div>

          <div class="mb-3">
            <label form='text' class="form-label"> P.ESP:</label>
            <input
             type="text"  
             class="form-control"
             id='pesp'
             placeholder='Insertar Peso'  
             name='pesp'
             value={values.pesp}
             onChange={(e) => setValues({...values, pesp: e.target.value})}/>
          </div>

        

          
          <div className="btn-container">
          <button type="submit" className="BTN"  >GUARDAR</button>
          </div>


        </form>
      
     
      
       
      

  </div>
  )
}

export default ModificarCPMoler
