import React, { useEffect, useState } from 'react';
import '../Silos/Silos.css'
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { GiManualMeatGrinder } from "react-icons/gi";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { GiMineralPearls } from "react-icons/gi";

const ReporteDiario = () => {

  const [data, setData] = useState([]);
  const [chino, setChino] = useState([]);
  const [mesas, setMesas] = useState([])
  const [grano, setGrano] = useState([])
  const [showTable1, setShowTable1] = useState(false);
  const [showTable2, setShowTable2] = useState(false);
  const [showTable3, setShowTable3] = useState(false);
  const [showTable4, setShowTable4] = useState(false);

  const toggleTable1 = () => {
    setShowTable1(!showTable1); // Cambia el estado de showTable al contrario de su valor actual
  };
  const toggleTable2 = () => {
    setShowTable2(!showTable2); // Cambia el estado de showTable al contrario de su valor actual
  };
  const toggleTable3 = () => {
    setShowTable3(!showTable3); // Cambia el estado de showTable al contrario de su valor actual
  };
  const toggleTable4 = () => {
    setShowTable4(!showTable4); // Cambia el estado de showTable al contrario de su valor actual
  };
  useEffect(() => {
    fetch('http://localhost:8081/reportediario')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    fetch('http://localhost:8081/reportediariojch')
      .then(res => res.json())
      .then(chino => setChino(chino))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    fetch('http://localhost:8081/reportediariomesas')
      .then(res => res.json())
      .then(mesas => setMesas(mesas))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    fetch('http://localhost:8081/reportediariograno')
      .then(res => res.json())
      .then(grano => setGrano(grano))
      .catch(err => console.log(err));
  }, [])

  const handleDeletejigs = (id) => {
    axios.delete('http://localhost:8081/deletediariojigs/' + id)
      .then(res => {
        // Actualiza la lista de datos excluyendo el registro eliminado
        const updatedJigsData = data.filter(item => item.id !== id);
        setData(updatedJigsData);


      })
      .catch(err => console.log(err));
  }
  const handleDeletejigsch = (id) => {
    axios.delete('http://localhost:8081/deletediariojigsch/' + id)
      .then(res => {
        // Actualiza la lista de datos excluyendo el registro eliminado
        const updatedJigsChData = data.filter(item => item.id !== id);
        setChino(updatedJigsChData);


      })
      .catch(err => console.log(err));
  }
  const handleDeletemesas = (id) => {
    axios.delete('http://localhost:8081/deletediariomesas/' + id)
      .then(res => {
        // Actualiza la lista de datos excluyendo el registro eliminado
        const updatedMesasData = data.filter(item => item.id !== id);
        setMesas(updatedMesasData);


      })
      .catch(err => console.log(err))
  }
  const handleDeletegrano = (id) => {
    axios.delete('http://localhost:8081/deletediariograno/' + id)
      .then(res => {
        // Actualiza la lista de datos excluyendo el registro eliminado
        const updatedGranoData = data.filter(item => item.id !== id);
        setGrano(updatedGranoData)

      })
      .catch(err => console.log(err))
  }

  return (
    <div className=''>
      <h1 className="d-flex">Reporte Diario:</h1>
      <div className="d-flex" >
        <Link to="/createreportediario" className="btn btn-danger btn-lg font-weight-bold  text-lg" >
          <FontAwesomeIcon icon={faPlus} />Insertar</Link>
      </div>
     <div className='jigs'>
     <div className="button-container">
        <button className="big-button" onClick={toggleTable1}>

          <GiManualMeatGrinder size={30} />
          <br />
          PROD.JIGS

        </button>

        <button className="big-buttonch" onClick={toggleTable2}>
          <GiManualMeatGrinder size={30} />
          <br />
          JIGG´S CHINOS

        </button>

        <button className="big-buttonmesas" onClick={toggleTable3}>
            <MdOutlineTableRestaurant size={30} />
            <br />
            MESAS
        </button>

        <button className="big-buttonselc" onClick={toggleTable4}>
            <GiMineralPearls size={30} />
            <br />
            SELECCION
        </button>



        </div>
        {showTable1 && (
            <div className='col-12 col-lg-8 '>
            <center><label>PRODUCCION DE JIGG´S</label></center>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr  >
                    <th></th>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Turno</th>
                    <th>AlimJ1</th>
                    <th>P.E</th>
                    <th>GranoJ1</th>
                    <th>P.E</th>
                    <th>DesenJ1</th>
                    <th>P.E</th>
                    <th>ColasJ1</th>
                    <th>P.E</th>
                    <th>AlimJ2</th>
                    <th>P.E</th>
                    <th>GranoJ2</th>
                    <th>P.E</th>
                    <th>DesenJ2</th>
                    <th>P.E</th>
                    <th>ColasJ2</th>
                    <th>P.E</th>


                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {data.map((d, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Link to={`/updateseleccion/${d.id}`} className='btn btn-warning'>
                            <i className='fa-solid fa-edit'></i>
                          </Link>
                          &nbsp;

                          <button className='btn btn-danger' onClick={() => handleDeletejigs(d.id)}>
                            <i className='fa-solid fa-trash'></i>
                          </button>
                        </div>

                      </td>
                      <td>{d.id}</td>
                      <td>{d.fecha}</td>
                      <td>{d.turno}</td>
                      <td>{typeof d.alimj1 === 'number' ? d.alimj1.toFixed(3) : 'N/A'}</td>
                      <td>{typeof d.peaj1 === 'number' ? d.peaj1.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.granoj1 === 'number' ? d.granoj1.toFixed(3) : 'N/A'}</td>
                      <td>{typeof d.pegj1 === 'number' ? d.pegj1.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.desenj1 === 'number' ? d.desenj1.toFixed(3) : 'N/A'}</td>
                      <td>{typeof d.pedj1 === 'number' ? d.pedj1.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.colasj1 === 'number' ? d.colasj1.toFixed(3) : 'N/A'}</td>
                      <td>{typeof d.pecj1 === 'number' ? d.pecj1.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.alimj2 === 'number' ? d.alimj2.toFixed(3) : 'N/A'}</td>
                      <td>{typeof d.peaj2 === 'number' ? d.peaj2.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.granoj2 === 'number' ? d.granoj2.toFixed(3) : 'N/A'}</td>
                      <td>{typeof d.pegj2 === 'number' ? d.pegj2.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.colasj2 === 'number' ? d.colasj2.toFixed(3) : 'N/A'}</td>
                      <td>{typeof d.pecj2 === 'number' ? d.pecj2.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.desenj2 === 'number' ? d.desenj2.toFixed(3) : 'N/A'}</td>
                      <td>{typeof d.pedj2 === 'number' ? d.pedj2.toFixed(2) : 'N/A'}</td>



                    </tr>
                  ))}

                  {/* Puedes agregar más filas según sea necesario */}
                </tbody>
              </table>
            </div>
          </div>
        )}

      
        {showTable2 && (
           <div className='col-12 col-lg-8 '>
            <div className="table-responsive">
              <center><label>PRODUCCION DE JIGGS CHINOS</label></center>
              <table className="table table-bordered">
                <thead>
                  <tr  >
                    <th></th>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Turno</th>
                    <th>AlimJCH</th>
                    <th>P.E</th>
                    <th>GranoJCH</th>
                    <th>P.E</th>
                    <th>DesenJCH</th>
                    <th>P.E</th>
                    <th>ColasJCH</th>
                    <th>P.E</th>
                    <th>AlimJSEC</th>
                    <th>P.E</th>
                    <th>Conc.JSEC</th>
                    <th>P.E</th>
                    <th>ColasJSEC</th>
                    <th>P.E</th>



                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {chino.map((d, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Link to={`/updateseleccion/${d.id}`} className='btn btn-warning'>
                            <i className='fa-solid fa-edit'></i>
                          </Link>
                          &nbsp;

                          <button className='btn btn-danger' onClick={() => handleDeletejigsch(d.id)}>
                            <i className='fa-solid fa-trash'></i>
                          </button>
                        </div>

                      </td>
                      <td>{d.id}</td>
                      <td>{d.fecha}</td>
                      <td>{d.turno}</td>
                      <td>{typeof d.alimjch === 'number' ? d.alimjch.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.peajch === 'number' ? d.peajch.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.granojch === 'number' ? d.granojch.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.pegjch === 'number' ? d.pegjch.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.colasjch === 'number' ? d.colasjch.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.pecjch === 'number' ? d.pecjch.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.desenjch === 'number' ? d.desenjch.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.pedjch === 'number' ? d.pedjch.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.alimjsec === 'number' ? d.alimjsec.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.peajsec === 'number' ? d.peajsec.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.concjsec === 'number' ? d.concjsec.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.pecojsec === 'number' ? d.pecojsec.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.colasjsec === 'number' ? d.colasjsec.toFixed(2) : 'N/A'}</td>
                      <td>{typeof d.pecjsec === 'number' ? d.pecjsec.toFixed(2) : 'N/A'}</td>




                    </tr>
                  ))}

                  {/* Puedes agregar más filas según sea necesario */}
                </tbody>
              </table>

            </div>
          </div>
        )}
        
        {showTable3 && (
                  <div className='col-12 col-lg-8 '>
                    <div className="table-responsive">
            <center><label>PRODUCCION DE MESAS</label></center>
            <table className="table table-bordered">
              <thead>
                <tr  >
                  <th></th>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Turno</th>
                  <th>Alim1y2</th>
                  <th>P.E</th>
                  <th>Conc1y2</th>
                  <th>P.E</th>
                  <th>Medios1y2</th>
                  <th>P.E</th>
                  <th>Colas1y2</th>
                  <th>P.E</th>

                  <th>Alim3y4</th>
                  <th>P.E</th>
                  <th>Conc3y4</th>
                  <th>P.E</th>
                  <th>Medios3y4</th>
                  <th>P.E</th>
                  <th>Colas3y4</th>
                  <th>P.E</th>

                  <th>Alim5</th>
                  <th>P.E</th>
                  <th>Conc5</th>
                  <th>P.E</th>
                  <th>Medios5</th>
                  <th>P.E</th>
                  <th>Colas5</th>
                  <th>P.E</th>

                  <th>Alim6</th>
                  <th>P.E</th>
                  <th>Conc6</th>
                  <th>P.E</th>
                  <th>Medios6</th>
                  <th>P.E</th>
                  <th>Colas6</th>
                  <th>P.E</th>




                </tr>
              </thead>
              <tbody className='table-group-divider'>
                {mesas.map((d, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to={`/updateseleccion/${d.id}`} className='btn btn-warning'>
                          <i className='fa-solid fa-edit'></i>
                        </Link>
                        &nbsp;

                        <button className='btn btn-danger' onClick={() => handleDeletemesas(d.id)}>
                          <i className='fa-solid fa-trash'></i>
                        </button>
                      </div>

                    </td>
                    <td>{d.id}</td>
                    <td>{d.fecha}</td>
                    <td>{d.turno}</td>
                    <td>{typeof d.alimm12 === 'number' ? d.alimm12.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.peam12 === 'number' ? d.peam12.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.conm12 === 'number' ? d.conm12.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pecnm12 === 'number' ? d.pecnm12.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.mediom12 === 'number' ? d.mediom12.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pemm12 === 'number' ? d.pemm12.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.colasm12 === 'number' ? d.colasm12.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pecm12 === 'number' ? d.pecm12.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.alimm34 === 'number' ? d.alimm34.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.peam34 === 'number' ? d.peam34.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.conm34 === 'number' ? d.conm34.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pecnm34 === 'number' ? d.pecnm34.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.mediosm34 === 'number' ? d.mediosm34.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pemm34 === 'number' ? d.pemm34.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.colasm34 === 'number' ? d.colasm34.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pecm34 === 'number' ? d.pecm34.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.alimm5 === 'number' ? d.alimm5.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.peam5 === 'number' ? d.peam5.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.conm5 === 'number' ? d.conm5.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pecnm5 === 'number' ? d.pecnm5.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.mediosm5 === 'number' ? d.mediosm5.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pemm5 === 'number' ? d.pemm5.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.colasm5 === 'number' ? d.colasm5.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pecm5 === 'number' ? d.pecm5.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.alimm6 === 'number' ? d.alimm6.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.peam6 === 'number' ? d.peam6.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.conm6 === 'number' ? d.conm6.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pecnm6 === 'number' ? d.pecnm6.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.mediom6 === 'number' ? d.mediom6.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pemm6 === 'number' ? d.pemm6.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.colasm6 === 'number' ? d.colasm6.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pecm6 === 'number' ? d.pecm6.toFixed(2) : 'N/A'}</td>






                  </tr>
                ))}

                {/* Puedes agregar más filas según sea necesario */}
              </tbody>
            </table>


          </div>
                </div>
            )}
        
        {showTable4 && (
                  <div className='col-12 col-lg-8 '>
                    <div className="table-responsive">
            <center><label >PRODUCCION SELECCION</label></center>
            <table className="table table-bordered">
              <thead>
                <tr  >
                  <th></th>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Turno</th>
                  <th>AlimGr</th>
                  <th>P.E</th>
                  <th>ConcGr</th>
                  <th>P.E</th>
                  <th>ColasGr</th>
                  <th>P.E</th>
                  <th>TONPIEDRA</th>
                  <th>P.E</th>
                  <th>A</th>
                  <th>MinaLE</th>
                  <th>P.E</th>
                  <th>A</th>
                  <th>MinaLS</th>
                  <th>P.E</th>
                  <th>A</th>
                  <th>PatioLE</th>
                  <th>P.E</th>
                  <th>A</th>
                  <th>PatioLS</th>
                  <th>P.E</th>
                  <th>A</th>
                  <th>Med3y4</th>
                  <th>P.E</th>
                  <th>A</th>
                  <th>Desensolve</th>
                  <th>P.E</th>
                  <th>A</th>
                  <th>Colas</th>
                  <th>P.E</th>



                </tr>
              </thead>
              <tbody className='table-group-divider'>
                {grano.map((d, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to={`/updateseleccion/${d.id}`} className='btn btn-warning'>
                          <i className='fa-solid fa-edit'></i>
                        </Link>
                        &nbsp;

                        <button className='btn btn-danger' onClick={() => handleDeletegrano(d.id)}>
                          <i className='fa-solid fa-trash'></i>
                        </button>
                      </div>

                    </td>
                    <td>{d.id}</td>
                    <td>{d.fecha}</td>
                    <td>{d.turno}</td>
                    <td>{typeof d.alimgrano === 'number' ? d.alimgrano.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.peag === 'number' ? d.peag.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.concgrano === 'number' ? d.concgrano.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pecng === 'number' ? d.pecng.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.colasgrano === 'number' ? d.colasgrano.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pecg === 'number' ? d.pecg.toFixed(2) : 'N/A'}</td>
                    <td>{typeof d.tonpiedra === 'number' ? d.tonpiedra.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.petp === 'number' ? d.petp.toFixed(2) : 'N/A'}</td>
                    <td>{d.aminale}</td>
                    <td>{typeof d.minale === 'number' ? d.minale.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pemle === 'number' ? d.pemle.toFixed(2) : 'N/A'}</td>
                    <td>{d.aminals}</td>
                    <td>{typeof d.minals === 'number' ? d.minals.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pemls === 'number' ? d.pemls.toFixed(2) : 'N/A'}</td>
                    <td>{d.apatiole}</td>
                    <td>{typeof d.patiols === 'number' ? d.patiols.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.peple === 'number' ? d.peple.toFixed(2) : 'N/A'}</td>
                    <td>{d.apatiols}</td>
                    <td>{typeof d.tolvageneral === 'number' ? d.tolvageneral.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pepls === 'number' ? d.pepls.toFixed(2) : 'N/A'}</td>
                    <td>{d.amedio34}</td>
                    <td>{typeof d.medio3y4 === 'number' ? d.medio3y4.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.psm34 === 'number' ? d.psm34.toFixed(2) : 'N/A'}</td>
                    <td>{d.adesensolve}</td>
                    <td>{typeof d.desensolve === 'number' ? d.desensolve.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pedese === 'number' ? d.pedese.toFixed(2) : 'N/A'}</td>
                    <td>{d.acolas}</td>
                    <td>{typeof d.colas === 'number' ? d.colas.toFixed(3) : 'N/A'}</td>
                    <td>{typeof d.pecolas === 'number' ? d.pecolas.toFixed(2) : 'N/A'}</td>






                  </tr>
                ))}

                {/* Puedes agregar más filas según sea necesario */}
              </tbody>
            </table>


          </div>
                </div>
            )}
</div>
    </div>
  );
};

export default ReporteDiario;
