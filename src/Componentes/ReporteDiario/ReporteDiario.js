import React from 'react';
import FrmReporte from './FrmReporte';
import './ReporteDiario.css'

const ReporteDiario = () => {
  return (
    <>

    <h1>Reporte Diario:</h1>
   <center><FrmReporte/></center>
    <div className='row mt-3'>
    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
    <div className='table'>
    <table>
  <thead>
        <tr  >
          <th>ID</th>
          <th>Fecha</th>
          <th>Crivada Silvia</th>
          <th>Conc. M.1234</th>
          <th>Tric.T General</th>
          <th>Grano Moler</th>
          <th>Patio T.General</th>
          <th>Conc T.2</th>
          <th>Grano Moler</th>
          <th>Medios 5y6</th>
          <th>Medios Lavar</th>
          <th>G.produc JIGS#1</th>
          <th>Tepetate JIGS#1</th>
          <th>Conc. Mesa5</th>
          <th>Conc. Mesa6</th>
          <th>Conc. JIGSECU</th>
          <th>Grano Produc.JIGS1</th>
          <th>Conc. Mesa1y2</th>
          <th>Polvo CTS</th>
          <th></th>
         
        </tr>
      </thead>
      <tbody  className='table-group-divider'>
        <tr>
          <td>1</td>
          <td>15/01/2024</td>
          <td>5.8000</td>
          <td>5000</td>
          <td>5000</td>
          <td>5000</td>
          <td>5000</td>
          <td>5000</td>
          <td>5000</td>
          <td>5000</td> 
          <td>5000</td>
          <td>5000</td>
          <td>5000</td>
          <td>5000</td>
          <td>5000</td>
          <td>5000</td>
          <td>5000</td>
          <td>5000</td>
          <td>5000</td>
          <td>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className='btn btn-warning'>
            <i className='fa-solid fa-edit'></i>
            </button>
            &nbsp;
            <button className='btn btn-danger'>
              <i className='fa-solid fa-trash'></i>
            </button>
            </div>
           
          </td>
        </tr>
        <tr>
          <td>Dato 4</td>
          <td>Dato 5</td>
          <td>Dato 6</td>
        </tr>
        {/* Puedes agregar más filas según sea necesario */}
      </tbody>
    </table>
    </div>
    </div>
     </div>
    </>
  );
};

export default ReporteDiario;
