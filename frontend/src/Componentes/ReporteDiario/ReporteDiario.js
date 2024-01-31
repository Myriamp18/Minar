import React, { useEffect, useState } from 'react';
import '../Silos/Silos.css'
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'

const ReporteDiario = () => {

  const [data, setData] = useState([]);
  const [chino, setChino] = useState([]); 
  const [mesas, setMesas] = useState([])
  const [grano, setGrano]= useState([])

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

  const handleDeletejigs = (id) =>{
    axios.delete('http://localhost:8081/deletediariojigs/'+id)
    .then(res => {
      // Actualiza la lista de datos excluyendo el registro eliminado
      const  updatedJigsData = data.filter(item => item.id !== id);
      setData( updatedJigsData);

      
    })
    .catch(err => console.log(err));
  }
  const handleDeletejigsch = (id) =>{
    axios.delete('http://localhost:8081/deletediariojigsch/'+id)
    .then(res => {
      // Actualiza la lista de datos excluyendo el registro eliminado
      const  updatedJigsChData = data.filter(item => item.id !== id);
      setChino(updatedJigsChData);

      
    })
    .catch(err => console.log(err));
  }
  const handleDeletemesas = (id) =>{
    axios.delete('http://localhost:8081/deletediariomesas/'+id)
    .then(res => {
      // Actualiza la lista de datos excluyendo el registro eliminado
      const updatedMesasData= data.filter(item => item.id !== id);
      setMesas( updatedMesasData);


    })
    .catch(err => console.log(err))
  }
  const handleDeletegrano = (id) =>{
    axios.delete('http://localhost:8081/deletediariograno/'+id)
    .then(res => {
      // Actualiza la lista de datos excluyendo el registro eliminado
      const updatedGranoData = data.filter(item => item.id !== id);
      setGrano(updatedGranoData)

    })
    .catch(err => console.log(err))
  }
  return (
    <>
    <h1>Reporte Diario:</h1>
    <div className="text-center">
        <Link to="/createreportediario" className="btn btn-danger btn-lg font-weight-bold   text-lg" >
          <FontAwesomeIcon icon={faPlus} />Insertar</Link>
      </div>
      <div className='row mt-3'>
        
          <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
            <div className="table-responsive">
              <center><label>PRODUCCION DE JIGGS</label></center>
    <table  class="table table-bordered">
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
                      <td>{d.	alimj1.toFixed(3)}</td>
                      <td>{d.peaj1.toFixed(2)}</td>
                      <td>{d.granoj1.toFixed(3)}</td>
                      <td>{d.pegj1.toFixed(3)}</td>
                      <td>{d.desenj1.toFixed(3)}</td>
                      <td>{d.pedj1.toFixed(3)}</td>
                      <td>{d.colasj1 .toFixed(3)}</td>
                      <td>{d.pecj1.toFixed(3)}</td>
                      <td>{d.alimj2.toFixed(3)}</td>
                      <td>{d.peaj2.toFixed(3)}</td>
                      <td>{d.granoj2.toFixed(3)}</td>
                      <td>{d.pegj2.toFixed(3)}</td>
                      <td>{d.colasj2.toFixed(3)}</td>
                      <td>{d.pecj2.toFixed(3)}</td>
                      <td>{d.desenj2.toFixed(3)}</td>
                      <td>{d.pedj2.toFixed(3)}</td>
                    

                      
                    </tr>
                  ))}

                  {/* Puedes agregar más filas según sea necesario */}
                </tbody>
    </table>
    </div>
    <div className="table-responsive">
    <center><label>PRODUCCION DE JIGGS CHINOS</label></center>
    <table  class="table table-bordered">
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
                      <td>{d.	alimjch.toFixed(3)}</td>
                      <td>{d.peajch.toFixed(2)}</td>
                      <td>{d.granojch.toFixed(3)}</td>
                      <td>{d.pegjch.toFixed(3)}</td>
                      <td>{d.	colasjch.toFixed(3)}</td>
                      <td>{d.pecjch.toFixed(3)}</td>
                      <td>{d.desenjch.toFixed(3)}</td>
                      <td>{d.pedjch.toFixed(3)}</td>
                      <td>{d.alimjsec.toFixed(3)}</td>
                      <td>{d.peajsec.toFixed(3)}</td>
                      <td>{d.concjsec.toFixed(3)}</td>
                      <td>{d.pecojsec.toFixed(3)}</td>
                      <td>{d.colasjsec.toFixed(3)}</td>
                      <td>{d.pecjsec.toFixed(3)}</td>
                      
                    

                     
                    </tr>
                  ))}

                  {/* Puedes agregar más filas según sea necesario */}
                </tbody>
    </table>
    
          
    </div>

    <div className="table-responsive">
    <center><label>PRODUCCION DE MESAS</label></center>
    <table  class="table table-bordered">
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
                      <td>{d.alimm12.toFixed(3)}</td>
                      <td>{d.peam12.toFixed(2)}</td>
                      <td>{d.conm12.toFixed(3)}</td>
                      <td>{d.pecnm12.toFixed(3)}</td>
                      <td>{d.mediom12.toFixed(3)}</td>
                      <td>{d.pemm12.toFixed(3)}</td>
                      <td>{d.colasm12.toFixed(3)}</td>
                      <td>{d.pecm12.toFixed(3)}</td>
                      <td>{d.	alimm34.toFixed(3)}</td>
                      <td>{d.peam34.toFixed(2)}</td>
                      <td>{d.conm34.toFixed(3)}</td>
                      <td>{d.pecnm34.toFixed(3)}</td>
                      <td>{d.mediosm34.toFixed(3)}</td>
                      <td>{d.pemm34.toFixed(3)}</td>
                      <td>{d.colasm34.toFixed(3)}</td>
                      <td>{d.pecm34.toFixed(3)}</td>
                      <td>{d.alimm5.toFixed(3)}</td>
                      <td>{d.peam5.toFixed(3)}</td>
                      <td>{d.conm5.toFixed(3)}</td>
                      <td>{d.pecnm5.toFixed(3)}</td>
                      <td>{d.mediosm5.toFixed(3)}</td>
                      <td>{d.pemm5.toFixed(3)}</td>
                      <td>{d.colasm5.toFixed(3)}</td>
                      <td>{d.pecm5.toFixed(3)}</td>
                      <td>{d.alimm6.toFixed(3)}</td>
                      <td>{d.peam6.toFixed(3)}</td>
                      <td>{d.conm6.toFixed(3)}</td>
                      <td>{d.pecnm6.toFixed(3)}</td>
                      <td>{d.mediom6.toFixed(3)}</td>
                      <td>{d.pemm6.toFixed(3)}</td>
                      <td>{d.colasm6.toFixed(3)}</td>
                      <td>{d.pecm6.toFixed(3)}</td>


                      
                    

                      
                    </tr>
                  ))}

                  {/* Puedes agregar más filas según sea necesario */}
                </tbody>
    </table>
    
          
    </div>

    <div className="table-responsive">
    <center><label >PRODUCCION SELECCION</label></center>
    <table  class="table table-bordered">
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
          <th>MinaLE</th>
          <th>MinaLS</th>
          <th>PatioLE</th>
          <th>PatioLS</th>
          <th>Med3y4</th>
          <th>Desensolve</th>
          <th>Colas</th>
          
         
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
                      <td>{d.alimgrano.toFixed(3)}</td>
                      <td>{d.peag.toFixed(2)}</td>
                      <td>{d.concgrano.toFixed(3)}</td>
                      <td>{d.pecng.toFixed(2)}</td>
                      <td>{d.colasgrano.toFixed(3)}</td>
                      <td>{d.pecg.toFixed(2)}</td>
                      <td>{d.tonpiedra.toFixed(3)}</td>
                      <td>{d.petp.toFixed(2)}</td>
                      <td>{d.tolvageneral	.toFixed(3)}</td>
                      <td>{d.medio3y4.toFixed(3)}</td>
                      <td>{d.minale.toFixed(3)}</td>
                      <td>{d.minals.toFixed(3)}</td>
                      <td>{d.patiols.toFixed(3)}</td>
                      <td>{d.desensolve	.toFixed(3)}</td>
                      <td>{d.colas.toFixed(3)}</td>
                      
                    

                     
                    </tr>
                  ))}

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
