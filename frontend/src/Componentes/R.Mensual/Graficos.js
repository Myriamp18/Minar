import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, registerables } from 'chart.js';
import './Graficas.css';

ChartJS.register(...registerables, ChartDataLabels);

const Graficos = () => {
  const [data, setData] = useState(null);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const horasObjetivoDiarias = 7.00;
  const horasObjetivoTotalesDiarias = 14.00;

  const calcularHoras = (horaString) => {
    if (!horaString) {
      return 0;
    }
    const [horas, minutos] = horaString.split(':');
    return parseInt(horas) + parseInt(minutos) / 60;
  };

  const calcularPorcentajeHorasTrabajadas = (horasTrabajadas, objetivoDiario, diferenciaDias, esTotal = false) => {
    const objetivoTotal = (esTotal ? horasObjetivoTotalesDiarias : objetivoDiario) * diferenciaDias;
    const porcentaje = (horasTrabajadas / objetivoTotal) * 100;
    return Math.min(porcentaje, 100).toFixed(2); // Cap at 100%
  };

  const fetchData = async () => {
    if (!fechaInicio || !fechaFin) {
      setError('Por favor, seleccione ambas fechas.');
      return;
    }

    setLoading(true);
    try {
      const responses = await Promise.all([
        axios.post('http://localhost:8081/MESASMES12H', { fechaInicio, fechaFin }),
        axios.post('http://localhost:8081/MESASMES34H', { fechaInicio, fechaFin }),
        axios.post('http://localhost:8081/MESASMES5H', { fechaInicio, fechaFin }),
        axios.post('http://localhost:8081/MESASMES6H', { fechaInicio, fechaFin }),
      ]);

      setData({
        data1: responses[0].data,
        data2: responses[1].data,
        data3: responses[2].data,
        data4: responses[3].data,
      });
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Ocurrió un error al obtener los datos. Por favor, inténtelo de nuevo más tarde.');
    }
    setLoading(false);
  };

  const calcularDias = (fechaInicio, fechaFin) => {
    const diffTime = Math.abs(new Date(fechaFin) - new Date(fechaInicio));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const prepareChartData = (data) => {
    if (!data) {
      return {};
    }

    const chartData = {
      labels: ['Turno 1', 'Turno 2', 'Total'],
      datasets: [],
    };

    const datasets = [
      { label: 'Horas Trabajadas (MESA1Y2)', data: data.data1, color: 'rgba(153, 102, 255, 0.8)' },
      { label: 'Horas Trabajadas (MESA3Y4)', data: data.data2, color: 'rgba(255, 165, 0, 0.8)' },
      { label: 'Horas Trabajadas (MESA5)', data: data.data3, color: 'rgba(75, 192, 192, 0.8)' },
      { label: 'Horas Trabajadas (MESA6)', data: data.data4, color: 'rgba(0, 128, 0, 0.8)' },
    ];

    datasets.forEach((dataset) => {
      const horasTrabajadas = [
        calcularHoras(dataset.data.TOTAHRS_TURNO_1),
        calcularHoras(dataset.data.TOTAHRS_TURNO_2),
        calcularHoras(dataset.data.TOTAHRS),
      ];

      chartData.datasets.push({
        label: dataset.label,
        data: horasTrabajadas,
        backgroundColor: dataset.color,
        borderColor: dataset.color.replace('0.8', '1'),
        borderWidth: 1,
        datalabels: {
          color: 'black',
          anchor: 'end',
          align: 'end',
          formatter: (value, context) => {
            const dias = calcularDias(fechaInicio, fechaFin);
            const esTotal = context.dataIndex === 2; // Check if it is the total column
            const porcentaje = calcularPorcentajeHorasTrabajadas(value, horasObjetivoDiarias, dias, esTotal);
            return `${value.toFixed(3)} hrs\n(${porcentaje}%)`;
          },
        },
      });
    });

    return chartData;
  };

  const options = {
    plugins: {
      datalabels: {
        color: 'black',
        anchor: 'end',
        align: 'end',
        formatter: (value, context) => {
          const dias = calcularDias(fechaInicio, fechaFin);
          const esTotal = context.dataIndex === 2; // Check if it is the total column
          const porcentaje = calcularPorcentajeHorasTrabajadas(value, horasObjetivoDiarias, dias, esTotal);
          return `${value.toFixed(3)} hrs\n(${porcentaje}%)`;
        },
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1>Grafico Horas/Produccion Mesas</h1>

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
        <Bar data={prepareChartData(data)} options={options} />
      )}

      <Link to="/gmolinos">
        <button class="custom-button">Ver Horas de Molinos</button>
      </Link>

      <Link to="/gjigschino">
        <button class="custom-button">Ver Horas Jigs Chino</button>
      </Link>
    </div>
  );
};

export default Graficos;