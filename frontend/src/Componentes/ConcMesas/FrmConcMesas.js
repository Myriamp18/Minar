import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

function FrmConcMesas() {
    const [values, setValues] = useState({
        fecha: '',
        salida: "",
        pesp: "",
        
       
    
      })
      
      const navigate = useNavigate()

      const [saldoAnterior, setSaldoAnterior] = useState(0);


    const handleSubmit = (e) => {
        e.preventDefault();

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(values.entrada) - parseFloat(values.salida);

        // Actualiza el valor del saldo en el objeto de valores
        setValues({ ...values, saldo: nuevoSaldo });

        // Realiza la inserción con el nuevo saldo
        axios.post('http://localhost:8081/createconcpmoler', { ...values, saldo: nuevoSaldo })
            .then(res => {
                console.log(res);
                navigate('/Inicio');
            })
            .catch(err => console.log(err));
    };
  return (
    <div>
      
    </div>
  )
}

export default FrmConcMesas
