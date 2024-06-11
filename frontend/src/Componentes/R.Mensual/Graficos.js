import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, registerables } from 'chart.js';


ChartJS.register(...registerables, ChartDataLabels);






const Graficos = () => {
  const [data, setData] = useState(null);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const horasObjetivoDiarias = 7.00;

  const calcularHoras = (horaString) => {
    if (!horaString) {
      console.error('Invalid horaString:', horaString);
      return 0;
    }
    
    const [horas, minutos] = horaString.split(':');
    const horasComoDecimal = parseInt(horas) + parseInt(minutos) / 60;
    return horasComoDecimal;
  };

  const calcularPorcentaje = (horasTrabajadas, objetivo) => {
    const porcentaje = (horasTrabajadas / objetivo) * 100;
    return porcentaje.toFixed(2);
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
      const response1 = await axios.post('http://localhost:8081/MESASMES12H', {
        fechaInicio,
        fechaFin,
      });
      const fetchedData1 = response1.data;

      const response2 = await axios.post('http://localhost:8081/MESASMES34H', {
        fechaInicio,
        fechaFin,
      });
      const fetchedData2 = response2.data;

      const response3 = await axios.post('http://localhost:8081/MESASMES5H', {
        fechaInicio,
        fechaFin,
      });
      const fetchedData3 = response3.data;

      const response4 = await axios.post('http://localhost:8081/MESASMES6H', {
        fechaInicio,
        fechaFin,
      });
      const fetchedData4 = response4.data;

      setData({ data1: fetchedData1, data2: fetchedData2, data3: fetchedData3, data4: fetchedData4 });
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Ocurrió un error al obtener los datos. Por favor, inténtelo de nuevo más tarde.');
    }
    setLoading(false);
  };

  const prepareChartData = (data) => {
    if (!data || !data.data1 || !data.data2 || !data.data3 || !data.data4) {
      console.error('Invalid data:', data);
      return {};
    }

    const chartData = {
      labels: ['Turno 1', 'Turno 2', 'Total'],
      datasets: [],
    };

    const horasTrabajadas12 = [
      calcularHoras(data.data1.TOTAHRS_TURNO_1),
      calcularHoras(data.data1.TOTAHRS_TURNO_2),
      calcularHoras(data.data1.TOTAHRS)
    ];

    chartData.datasets.push({
      label: 'Horas Trabajadas (MESA1Y2)',
      data: horasTrabajadas12,
      backgroundColor: 'rgba(153, 102, 255, 0.8)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
      datalabels: {
        color: 'black',
        anchor: 'end',
        align: 'end',
        formatter: (value, context) => {
          const objetivo = context.dataIndex === 2 ? calcularObjetivoHoras(fechaInicio, fechaFin, horasObjetivoDiarias) : 7;
          const porcentaje = calcularPorcentaje(value, objetivo);
          return `${value.toFixed(3)} hrs\n(${porcentaje}%)`;
        }
      }
    });

    const horasTrabajadas34 = [
      calcularHoras(data.data2.TOTAHRS_TURNO_1),
      calcularHoras(data.data2.TOTAHRS_TURNO_2),
      calcularHoras(data.data2.TOTAHRS)
    ];

    chartData.datasets.push({
      label: 'Horas Trabajadas (MESA3Y4)',
      data: horasTrabajadas34,
      backgroundColor: 'rgba(255, 165, 0, 0.8)',
      borderColor: 'rgba(255, 165, 0, 1)',
      borderWidth: 1,
      datalabels: {
        color: 'black',
        anchor: 'end',
        align: 'end',
        formatter: (value, context) => {
          const objetivo = context.dataIndex === 2 ? calcularObjetivoHoras(fechaInicio, fechaFin, horasObjetivoDiarias) : 8;
          const porcentaje = calcularPorcentaje(value, objetivo);
          return `${value.toFixed(3)} hrs\n(${porcentaje}%)`;
        }
      }
    });

    const horasTrabajadas5 = [
      calcularHoras(data.data3.TOTAHRS_TURNO_1),
      calcularHoras(data.data3.TOTAHRS_TURNO_2),
      calcularHoras(data.data3.TOTAHRS)
    ];

    chartData.datasets.push({
      label: 'Horas Trabajadas (MESA5)',
      data: horasTrabajadas5,
      backgroundColor: 'rgba(75, 192, 192, 0.8)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      datalabels: {
        color: 'black',
        anchor: 'end',
        align: 'end',
        formatter: (value, context) => {
          const objetivo = context.dataIndex === 2 ? calcularObjetivoHoras(fechaInicio, fechaFin, horasObjetivoDiarias) : 8;
          const porcentaje = calcularPorcentaje(value, objetivo);
          return `${value.toFixed(3)} hrs\n(${porcentaje}%)`;
        }
      }
    });

    const horasTrabajadas6 = [
      calcularHoras(data.data4.TOTAHRS_TURNO_1),
      calcularHoras(data.data4.TOTAHRS_TURNO_2),
      calcularHoras(data.data4.TOTAHRS)
    ];

    chartData.datasets.push({
      label: 'Horas Trabajadas (MESA6)',
      data: horasTrabajadas6,
      backgroundColor: 'rgba(0, 128, 0, 0.8)',
      borderColor: 'rgba(0, 128, 0, 1)',
      borderWidth: 1,
      datalabels: {
        color: 'BLACK',
        anchor: 'end',
        align: 'end',
        formatter: (value, context) => {
          const objetivo = context.dataIndex === 2 ? calcularObjetivoHoras(fechaInicio, fechaFin, horasObjetivoDiarias) : 8;
          const porcentaje = calcularPorcentaje(value, objetivo);
          return `${value.toFixed(3)} hrs\n(${porcentaje}%)`;
        }
      }
    });

    return chartData;
  };

  const options = {
    plugins: {
      datalabels: {
        color: 'BLACK',
        anchor: 'end',
        align: 'end',
        formatter: (value, context) => {
          const objetivo = context.dataIndex === 2 ? calcularObjetivoHoras(fechaInicio, fechaFin, horasObjetivoDiarias) : 8;
          const porcentaje = calcularPorcentaje(value, objetivo);
          return `${value.toFixed(3)} hrs\n(${porcentaje}%)`;
        }
      }
    }
  }


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
       <Bar data={prepareChartData(data)} options={options} />
      )}

      <Link to="/gmolinos">
        <button>Ver Horas de Molinos</button>
      </Link>
    </div>
  );
};

export default Graficos;
