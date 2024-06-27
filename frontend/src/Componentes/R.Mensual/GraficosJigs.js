import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Link } from 'react-router-dom';

ChartJS.register(...registerables, ChartDataLabels);


function GraficosJigs() {

    const [data, setData] = useState(null);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const horasObjetivoDiarias = 8; // Modificado según tu ejemplo

  const calcularHoras = (horaString) => {
    if (horaString === null) {
      return 0;
    }
    const horaTexto = horaString.toString(); // Convertir a cadena de texto
    const [horas, minutos] = horaTexto.split(':');
    const horasComoDecimal = parseInt(horas) + parseFloat(minutos) / 60; // Convertir minutos a fracción de horas
    return horasComoDecimal;
  };

  const calcularPorcentajeHorasTrabajadas = (horasTrabajadas, objetivoDiario, diferenciaDias) => {
    const objetivoTotal = objetivoDiario * diferenciaDias;
    const porcentaje = (horasTrabajadas / objetivoTotal) * 100;
    return porcentaje.toFixed(2); // Redondear a dos decimales
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!fechaInicio || !fechaFin) {
        setError('Por favor, seleccione ambas fechas.');
        return;
      }

      setLoading(true);
      try {
        const response1 = await axios.post('http://localhost:8081/jigssech', {
          fechaInicio,
          fechaFin,
        });
        const fetchedData1 = response1.data;
        console.log('Data fetched:', fetchedData1); // Depuración: mostrar los datos en la consola
        setData(fetchedData1);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Ocurrió un error al obtener los datos. Por favor, inténtelo de nuevo más tarde.');
      }
      setLoading(false);
    };

    fetchData();
  }, [fechaInicio, fechaFin]);

  const calcularDias = (fechaInicio, fechaFin) => {
    const start = new Date(fechaInicio);
    const end = new Date(fechaFin);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const dias = calcularDias(fechaInicio, fechaFin);

  const options = {
    plugins: {
      datalabels: {
        color: 'BLACK',
        anchor: 'end',
        align: 'start',
        formatter: (value, context) => {
          const porcentaje = calcularPorcentajeHorasTrabajadas(
            value,
            horasObjetivoDiarias,
            dias
          );
          return `${value.toFixed(3)} hrs\n(${porcentaje}%)`;
        },
      },
    },
  };

  const chartData = {
    labels: ['Turno 1', 'Turno 2', 'Total'],
    datasets: [
      {
        label: 'JIGS SECUNDARIO',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: data
          ? [
              calcularHoras(data.HORASSEC_TURNO_1),
              calcularHoras(data.HORASSEC_TURNO_2),
              calcularHoras(data.HORASSEC_TOTAL),
            ]
          : [0, 0, 0],
      },
      {
        label: 'JIGS PRIMARIO',
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(153,102,255,0.6)',
        hoverBorderColor: 'rgba(153,102,255,1)',
        data: data
          ? [
              calcularHoras(data.HORASPRIM_TURNO_1),
              calcularHoras(data.HORASPRIM_TURNO_2),
              calcularHoras(data.HORASPRIM_TOTAL),
            ]
          : [0, 0, 0],
      },
    ],
  };

  console.log('datos:', data);

  return (
    <div style={{ width: '80%', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
    <h1>Gráfico de Producción de Jigs Chinos</h1>

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
    </div>

    {error && <p style={{ color: 'red' }}>{error}</p>}
    {loading && <p>Cargando...</p>}
    {data && <Bar data={chartData} options={options} />}


    <Link to="/graficos">
        <button class="custom-button">Ver Horas de Mesas</button>
      </Link>

      <Link to="/gmolinos">
        <button class="custom-button">Ver Horas Molinos</button>
      </Link>
  </div>
  )
}

export default GraficosJigs
