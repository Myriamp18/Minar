
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Silos from './Silos';
import './Inicio.css'; // Importar el archivo CSS

function Inicio() {
    const [datosDeSilos, setDatosDeSilos] = useState([]);
    const fechaActual = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato 'YYYY-MM-DD'
    const [fechaHoraActual, setFechaHoraActual] = useState('');
    const [mineralpatio, setMineralEnPatio] = useState([]);
    const [mineralpatiomlt, setMineralEnPatiomlt] = useState([]);


    useEffect(() => {
        // Realizar la solicitud HTTP para obtener los datos de los silos por fecha actual
        axios.get(`http://localhost:8081/getsilosinicio/${fechaActual}`)
            .then(response => {
                setDatosDeSilos(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos de los silos:', error);
            });
    }, []);

    useEffect(() => {
        const intervalo = setInterval(() => {
            const fecha = new Date();
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',

            };
            const fechaHora = fecha.toLocaleString('es-ES', options);
            setFechaHoraActual(fechaHora);
        }, 1000);

        return () => clearInterval(intervalo);
    }, []);
    useEffect(() => {
        axios.get(`http://localhost:8081/getmpleinicio/${fechaActual}`)

            .then(response => {
                setMineralEnPatio(response.data);
            })
            .catch(error => {
                console.error('Error al obtener el mineral en patio:', error);
            });
    }, []);
    useEffect(() => {
        axios.get(`http://localhost:8081/getmpltinicio/${fechaActual}`)

            .then(response => {
                setMineralEnPatiomlt(response.data);
            })
            .catch(error => {
                console.error('Error al obtener el mineral en patio:', error);
            });
    }, []);
    return (
        <div className="App">
            <h1 className='h1'>MINERALES Y ARCILLAS, S.A DE C.V</h1>
            <p className="fecha-hora"> {fechaHoraActual}</p>

            <div className="contenedor-silos">
                {datosDeSilos.map((silo, index) => (
                    <>

                        <Silos key={`${silo.id}-${index}`} nombre={silo.silo1} cantidad={silo.silo1} texto="Silo 1" />
                        <Silos key={`${silo.id}-${index}`} nombre={silo.silo2} cantidad={silo.silo2} texto="Silo 2" />
                        <Silos key={`${silo.id}-${index}`} nombre={silo.silo3} cantidad={silo.silo3} texto="Silo 3" />
                        <Silos key={`${silo.id}-${index}`} nombre={silo.silo4} cantidad={silo.silo4} texto="Silo 4" />
                        <Silos key={`${silo.id}-${index}`} nombre={silo.silo5} cantidad={silo.silo5} texto="Silo 5" />
                    </>
                ))}
            </div>

            <div className='mineral-patio'>
                <p>Patio MLE:</p>
                <ul>
                    {mineralpatio.map((saldo,index) => (
                        <li key={index}>{saldo.saldo}</li>
                    ))}
                </ul>
                <p>Patio MLT:</p>
                <ul>
                    {mineralpatiomlt.map((mlt,index) => (
                        <li key={index}>{mlt.saldo}</li>
                    ))}
                </ul>

            </div>
        </div>
    )
}

export default Inicio;
