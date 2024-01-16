import React from 'react';
import FrmSilos from './FrmSilos';
import '../ReporteDiario/ReporteDiario.css'

const Silos = () => {
  return (
    <>

    <h1>Minerales Silos:</h1>
   <center><FrmSilos/></center>
    <div className='row mt-3'>
    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
    <div className='table'>
    <table>
  <thead>
        <tr  >
          <th>ID</th>
          <th>Fecha</th>
          <th>Silo 1</th>
          <th>Silo 2</th>
          <th>Silo 3</th>
          <th>Silo 4</th>
          <th>Silo 5</th>
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

export default Silos;
