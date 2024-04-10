// Silos.js

import React from 'react';
import './Inicio.css';

function Silos({ nombre, cantidad, texto }) {
  const porcentajeLlenado = Math.min(Math.max((cantidad / 200) * 100, 0), 100); // Calcular el porcentaje de llenado
  
  // Calcular la rotación y el clip-path
  const rotation = (porcentajeLlenado / 100) * 360;
  const clipPath = `inset(0 0 0 calc(100% - ${porcentajeLlenado}%))`;

  return (
    <div className="silo">
      <h3>{nombre}</h3>
      <div className="rueda">
        <div
          className="porcentaje-fill"
          style={{ transform: `rotate(${rotation}deg)`, clipPath: clipPath }}
        ></div>
        <div className="porcentaje">
          <div className="texto-porcentaje">{isNaN(porcentajeLlenado) ? '0%' : Math.round(porcentajeLlenado) + '%'}</div>
        </div>
      </div>
      <h3>{texto}</h3>
    </div>
  );
}

export default Silos;


