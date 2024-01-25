import React, { useEffect, useState } from 'react';
import '../Silos/Silos.css'
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'

const ReporteDiario = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/reportediario')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, [])

  return (
    <>
    <h1>Reporte Diario:</h1>
    <div className="text-center">
        <Link to="/createreportediario" className="btn btn-danger btn-lg font-weight-bold   text-lg" >
          <FontAwesomeIcon icon={faPlus} />Insertar</Link>
      </div>
      <div className='row mt-3'>
        {data.length !== 0 ?
          <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
            <div className="table-responsive">
    <table>
  <thead>
        <tr  >
          <th>ID</th>
          <th>Fecha</th>
          <th>C.S</th>
          <th>C.M.1234</th>
          <th>T.T.G</th>
          <th>G.M</th>
          <th>P.T.G</th>
          <th>C.T.2</th>
          <th>G.M</th>
          <th>M.5y6</th>
          <th>M.L</th>
          <th>G.P.JIGS#1</th>
          <th>T.JIGS#1</th>
          <th>C.M5</th>
          <th>C.M6</th>
          <th>C.JIGS1</th>
          <th>C.JIGS2</th>
          <th>C.JIGSECU</th>
          <th>G.P.JIGS1</th>
          <th>C.M1y2</th>
          <th>P.CTS</th>
          <th></th>
         
        </tr>
      </thead>
      <tbody className='table-group-divider'>
                 {data.map((d, i) => (
                    <tr key={i}>
                      <td>{d.id_reporte}</td>
                      <td>{d.fecha}</td>
                      <td>{d.crivadasilvialavar.toFixed(3)}</td>
                      <td>{d.consmoler.toFixed(3)}</td>
                      <td>{d.trictolva.toFixed(2)}</td>
                      <td>{d.grano_moler.toFixed(3)}</td>
                      <td>{d.patiotolvageneral.toFixed(3)}</td>
                      <td>{d.patiotolva2.toFixed(3)}</td>
                      <td>{d.granomoler2.toFixed(3)}</td>
                      <td>{d.medios5y6.toFixed(3)}</td>
                      <td>{d.medioslavar.toFixed(3)}</td>
                      <td>{d.granojics1.toFixed(3)}</td>
                      <td>{d.tepetatejics1.toFixed(3)}</td>
                      <td>{d.conm5.toFixed(3)}</td>
                      <td>{d.consm6.toFixed(3)}</td>
                      <td>{d.consjics1.toFixed(3)}</td>
                      <td>{d.consjics2.toFixed(3)}</td>
                      <td>{d.granoproducido.toFixed(3)}</td>
                      <td>{d.consm3y4.toFixed(3)}</td>
                      <td>{d.consm1y2.toFixed(3)}</td>
                      <td>{d.polvocts.toFixed(3)}</td>

                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Link to={`/updateseleccion/${d.id}`} className='btn btn-warning'>
                            <i className='fa-solid fa-edit'></i>
                          </Link>
                          &nbsp;

                          <button className='btn btn-danger' onClick={() => handleDelete(d.id)}>
                            <i className='fa-solid fa-trash'></i>
                          </button>
                        </div>

                      </td>
                    </tr>
                  ))}

                  {/* Puedes agregar más filas según sea necesario */}
                </tbody>
    </table>
    </div>
          </div>
          : <h2 className='aling-itemns-center'>Sin Datos</h2>
        }
      </div>
    </>
  );
};

export default ReporteDiario;
