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

const Graficos = () => {
  const [data, setData] = useState(null);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para convertir las horas en minutos
  const calcularHoras = (horaString) => {
    const [horas, minutos] = horaString.split(':');
    const horasComoDecimal = parseInt(horas) + parseInt(minutos) / 100;
    return horasComoDecimal;
  };

  const calcularDiferencia = (horasTrabajadas) => {
    const horasObjetivo = 7.00;
    return horasObjetivo - horasTrabajadas;
  };

  const fetchData = async () => {
    if (!fechaInicio || !fechaFin) {
      setError('Por favor, seleccione ambas fechas.');
      return;
    }
  
    setLoading(true);
    try {
      // Primera solicitud
      const response1 = await axios.post('http://localhost:8081/MESASMES12H', {
        fechaInicio,
        fechaFin,
      });
      const fetchedData1 = response1.data;
      
      // Segunda solicitud
      const response2 = await axios.post('http://localhost:8081/MESASMES34H', {
        fechaInicio,
        fechaFin,
      });
      const fetchedData2 = response2.data;
      
      // Procesamiento de los datos
      setData({ data1: fetchedData1, data2: fetchedData2 });
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Ocurrió un error al obtener los datos. Por favor, inténtelo de nuevo más tarde.');
    }
    setLoading(false);
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
        <div>
          <button onClick={fetchData} disabled={loading} style={{ padding: '5px 10px', fontSize: '14px' }}>Buscar</button>
        </div>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Cargando...</p>}
      {data && (
        <div>
        <Bar
  data={{
    labels: ['Turno 1', 'Turno 2', 'Total'],
    datasets: [
      {
        label: 'Horas Trabajadas (MESA1Y2)',
        data: [
          calcularHoras(data.data1.TOTAHRS_TURNO_1),
          calcularHoras(data.data1.TOTAHRS_TURNO_2),
          calcularHoras(data.data1.TOTAHRS)
        ],
        backgroundColor: 'rgba(153, 102, 255, 0.8)', // Morado pastel
        borderColor: 'rgba(153, 102, 255, 1)', // Morado pastel
        borderWidth: 1,
      },
      {
        label: 'Horas Faltantes (MESA1Y2)',
        data: [
          calcularDiferencia(calcularHoras(data.data1.TOTAHRS_TURNO_1)),
          calcularDiferencia(calcularHoras(data.data1.TOTAHRS_TURNO_2)),
          calcularDiferencia(calcularHoras(data.data1.TOTAHRS))
        ],
        backgroundColor: 'rgba(135, 206, 250, 0.8)', // Azul pastel
        borderColor: 'rgba(135, 206, 250, 1)', // Azul pastel
        borderWidth: 1,
      },
      {
        label: 'Horas Trabajadas (MESA3Y4)',
        data: [
          calcularHoras(data.data2.TOTAHRS_TURNO_1),
          calcularHoras(data.data2.TOTAHRS_TURNO_2),
          calcularHoras(data.data2.TOTAHRS)
        ],
        backgroundColor: 'rgba(255, 165, 0, 0.8)', // Naranja pastel
        borderColor: 'rgba(255, 165, 0, 1)', // Naranja pastel
        borderWidth: 1,
      },
      {
        label: 'Horas Faltantes (MESA3Y4)',
        data: [
          calcularDiferencia(calcularHoras(data.data2.TOTAHRS_TURNO_1)),
          calcularDiferencia(calcularHoras(data.data2.TOTAHRS_TURNO_2)),
          calcularDiferencia(calcularHoras(data.data2.TOTAHRS))
        ],
        backgroundColor: 'rgba(255, 192, 203, 0.8)', // Rosa pastel
        borderColor: 'rgba(255, 192, 203, 1)', // Rosa pastel
        borderWidth: 1,
      },
    ],
  }}
  options={{
    scales: {
      y: {
        beginAtZero: true,
        max: 7.00,
      },
    },
  }}
/>
        </div>
      )}
    </div>
  );
};

export default Graficos;
