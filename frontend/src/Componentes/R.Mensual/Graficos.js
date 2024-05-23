import React, { useState } from 'react';
import './Graficas.css';

function Graficos() {
  const [data, setData] = useState([
    { tipo: 'alimento', valor: 30 },
    { tipo: 'grano', valor: 40 },
    { tipo: 'desensolve', valor: 25 },
  ]);

  // Define los colores para cada tipo de dato
  const colors = {
    alimento: '#007bff',
    grano: '#28a745',
    desensolve: '#dc3545',
  };

  return (
    <div className="chart">
      {data.map((item, index) => (
        <div
          key={index}
          className="bar"
          style={{
            height: `${item.valor * 3}px`,
            backgroundColor: colors[item.tipo],
          }}
        >
          {item.valor}
          <span className="label">{item.tipo}</span>
        </div>
      ))}
    </div>
  );
};

export default Graficos;







