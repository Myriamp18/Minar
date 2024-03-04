import React from 'react';
import './Inicio.css'

function Silos({ nombre, cantidad, texto }) {
    const porcentajeLlenado = (cantidad / 200) * 100;
  
    return (
      <div className="silo">
        <h3 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '1.2rem', color: '#fff' }}>{nombre}</h3>
        <div className="rueda">
          <div className="porcentaje-fill" style={{ transform: `rotate(${porcentajeLlenado * 3.6}deg)` }}></div>
          <div className="porcentaje">
          <div className="texto-porcentaje">{isNaN(porcentajeLlenado) ? '0%' : Math.round(porcentajeLlenado) + '%'}
        </div>
        </div>
        </div>
        <h3 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '1.2rem', color: '#fff' }}>{texto}</h3>
      </div>
    );
  }
  
  


export default Silos;
