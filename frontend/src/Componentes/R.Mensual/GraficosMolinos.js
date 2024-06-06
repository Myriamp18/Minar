import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GraficosMolinos() {
    const [data, setData] = useState(null);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const horasObjetivoDiarias = 7.00;
  
    // Función para convertir las horas en minutos
    const calcularHoras = (horaString) => {
      const [horas, minutos] = horaString.split(':');
      const horasComoDecimal = parseInt(horas) + parseInt(minutos) / 100;
      return horasComoDecimal;
    };
  
    
    const calcularDiferencia = (horasTrabajadas, objetivo) => {
      return objetivo - horasTrabajadas;
    };
  
   const calcularObjetivoHoras = (fechaInicio, fechaFin, horasObjetivoDiarias) => {
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    const diferenciaDias = (fechaFinDate - fechaInicioDate) / (1000 * 60 * 60 * 24) + 1;
    return horasObjetivoDiarias * diferenciaDias;
  };
  
    const fetchData = async () => {
      if (!fechaInicio || !fechaFin) {
        setError('Por favor, seleccione ambas fechas.');
        return;
      }
  
      setLoading(true);
      try {
        const response1 = await axios.post('http://localhost:8081/MOLINOSMH', {
          fechaInicio,
          fechaFin,
        });
        const fetchedData1 = response1.data;
        setData({ data1: fetchedData1 });
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Ocurrió un error al obtener los datos. Por favor, inténtelo de nuevo más tarde.');
      }
      setLoading(false);
    };


    const chartData = {
        labels: ['Turno 1', 'Turno 2', 'Total'],
        datasets: [
            {
                label: 'Producción M1',
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.6)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: [data.PRODM1_TURNO_1, data.PRODM1_TURNO_2, data.PRODM1_TOTAL],
            },
            {
                label: 'Producción M2',
                backgroundColor: 'rgba(153,102,255,0.4)',
                borderColor: 'rgba(153,102,255,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(153,102,255,0.6)',
                hoverBorderColor: 'rgba(153,102,255,1)',
                data: [data.PRODM2_TURNO_1, data.PRODM2_TURNO_2, data.PRODM2_TOTAL],
            },
        ],
    };
      
  return (
    <div style={{ width: '80%', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1>Grafico Horas/Produccion</h1>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>
            Fecha de Inicio:
            <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
          </label>
          <label style={{ marginRight: '10px' }}>
            Fecha de Fin:
            <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
          </label>
        </div>
        <button onClick={fetchData} disabled={loading} style={{ padding: '5px 10px', fontSize: '14px' }}>Buscar</button>
        <div>
          
        </div>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Cargando...</p>}
      {data && (
       <Bar data={chartData(data)} options={options} />
      )}
    </div>
  );
};


export default GraficosMolinos
