import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['A', 'B', 'C', 'D', 'E'],
  datasets: [
    {
      label: 'Valores',
      data: [10, 20, 30, 40, 50],
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};


const Graficos = () => {
  return (
    <div>
    <h2>Gráfico de Barras</h2>
    <Bar data={data} options={options} />
  </div>
  );
};

export default Graficos;
