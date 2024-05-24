import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Barchar from './Barchar';

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

  const fetchData = async () => {
    if (!fechaInicio || !fechaFin) {
      setError('Por favor, seleccione ambas fechas.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8081/MESASMES12H', {
        fechaInicio,
        fechaFin,
      });
      const fetchedData = response.data;
      setData(fetchedData);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Ocurrió un error al obtener los datos. Por favor, inténtelo de nuevo más tarde.');
    }
    setLoading(false);
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1>Grafico Horas/Prduccion</h1>

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
                  label: 'Horas Trabajadas',
                  data: [calcularHoras(data.TOTAHRS_TURNO_1), calcularHoras(data.TOTAHRS_TURNO_2), calcularHoras(data.TOTAHRS)],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
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
