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

  const calcularObjetivoHoras = () => {
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
    const chartData = {
      labels: ['Turno 1', 'Turno 2', 'Total'],
      datasets: [],
    };

    const horasObjetivoTotal = calcularObjetivoHoras();

    const horasTrabajadas12 = [
      calcularHoras(data.data1.TOTAHRS_TURNO_1),
      calcularHoras(data.data1.TOTAHRS_TURNO_2),
      calcularHoras(data.data1.TOTAHRS)
    ];

    const horasTrabajadas34 = [
      calcularHoras(data.data2.TOTAHRS_TURNO_1),
      calcularHoras(data.data2.TOTAHRS_TURNO_2),
      calcularHoras(data.data2.TOTAHRS)
    ];
    const horasTrabajadas5 = [
      calcularHoras(data.data2.TOTAHRS_TURNO_1),
      calcularHoras(data.data2.TOTAHRS_TURNO_2),
      calcularHoras(data.data2.TOTAHRS)
    ];

    const horasTrabajadas6 = [
      calcularHoras(data.data2.TOTAHRS_TURNO_1),
      calcularHoras(data.data2.TOTAHRS_TURNO_2),
      calcularHoras(data.data2.TOTAHRS)
    ];

    chartData.datasets.push({
      label: 'Horas Trabajadas (MESA1Y2)',
      data: horasTrabajadas12,
      backgroundColor: 'rgba(153, 102, 255, 0.8)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    });

    const horasFaltantes12 = [
      calcularDiferencia(horasTrabajadas12[0], horasObjetivoDiarias),
      calcularDiferencia(horasTrabajadas12[1], horasObjetivoDiarias),
      calcularDiferencia(horasTrabajadas12[2], horasObjetivoTotal)
    ];
    if (horasFaltantes12.some(horas => horas > 0)) {
      chartData.datasets.push({
        label: 'Horas Faltantes (MESA1Y2)',
        data: horasFaltantes12,
        backgroundColor: 'rgba(135, 206, 250, 0.8)',
        borderColor: 'rgba(135, 206, 250, 1)',
        borderWidth: 1,
      });
    }

    chartData.datasets.push({
      label: 'Horas Trabajadas (MESA3Y4)',
      data: horasTrabajadas34,
      backgroundColor: 'rgba(255, 165, 0, 0.8)',
      borderColor: 'rgba(255, 165, 0, 1)',
      borderWidth: 1,
    });

    const horasFaltantes34 = [
      calcularDiferencia(horasTrabajadas34[0], horasObjetivoDiarias),
      calcularDiferencia(horasTrabajadas34[1], horasObjetivoDiarias),
      calcularDiferencia(horasTrabajadas34[2], horasObjetivoTotal)
    ];
    if (horasFaltantes34.some(horas => horas > 0)) {
      chartData.datasets.push({
        label: 'Horas Faltantes (MESA3Y4)',
        data: horasFaltantes34,
        backgroundColor: 'rgba(255, 215, 0, 0.8)',
        borderColor: 'rgba(255, 215, 0, 1)',
        borderWidth: 1,
      });
    }


    chartData.datasets.push({
      label: 'Horas Trabajadas (MESA5)',
      data: horasTrabajadas34,
      backgroundColor: 'rgba(255, 165, 0, 0.8)',
      borderColor: 'rgba(255, 165, 0, 1)',
      borderWidth: 1,
    });

    const horasFaltantes5 = [
      calcularDiferencia(horasTrabajadas5[0], horasObjetivoDiarias),
      calcularDiferencia(horasTrabajadas5[1], horasObjetivoDiarias),
      calcularDiferencia(horasTrabajadas5[2], horasObjetivoTotal)
    ];
    if (horasFaltantes5.some(horas => horas > 0)) {
      chartData.datasets.push({
        label: 'Horas Faltantes (MESA5)',
        data: horasFaltantes34,
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        borderColor: 'rgba(255, 0, 0, 1)',
        borderWidth: 1,
      });
    }



    chartData.datasets.push({
      label: 'Horas Trabajadas (MESA6)',
      data: horasTrabajadas34,
      backgroundColor: 'rgba(0, 128, 0, 0.8)', // Verde oscuro
      borderColor: 'rgba(0, 128, 0, 1)', // Verde oscuro

      borderWidth: 1,
    });

    const horasFaltantes6 = [
      calcularDiferencia(horasTrabajadas6[0], horasObjetivoDiarias),
      calcularDiferencia(horasTrabajadas6[1], horasObjetivoDiarias),
      calcularDiferencia(horasTrabajadas6[2], horasObjetivoTotal)
    ];
    if (horasFaltantes6.some(horas => horas > 0)) {
      chartData.datasets.push({
        label: 'Horas Faltantes (MESA6)',
        data: horasFaltantes34,
        backgroundColor: 'rgba(255, 69, 0, 0.8)', // Naranja rojizo
        borderColor: 'rgba(255, 69, 0, 1)', // Naranja rojizo
        borderWidth: 1,
      });
    }

    return chartData;
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
        <Bar
          data={prepareChartData(data)}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                max: calcularObjetivoHoras(),
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Graficos;
