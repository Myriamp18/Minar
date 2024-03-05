import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FrmReporte.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


function FrmReporte() {
  const [values, setValues] = useState({
    ///jigs//
    fecha: "",
    turno: "1",
    alimj1: "",
    peaj1: "",
    granoj1: "",
    pegj1: "",
    colasj1: "",
    pecj1: "",
    desenj1: "",
    pedj1: "",
    alimj2: "",
    peaj2: "",
    granoj2: "",
    pegj2: "",
    colasj2: "",
    pecj2: "",
    desenj2: "",
    pedj2: "",
    ///chini y sec///
    alimjch: "",
    peajch: "",
    granojch: "",
    pegjch: "",
    desenjch: "",
    pedjch: "",
    colasjch: "",
    pecjch: "",
    horasec:"",
    alimjsec: "",
    peajsec: "",
    concjsec: "",
    pecojsec: "",
    colasjsec: "",
    pecjsec: "",
    //////Mesas///
    alimm12: "",
    peam12: "",
    conm12: "",
    pecnm12: "",
    mediom12: "",
    pemm12: "",
    colasm12: "",
    pecm12: "",
    ////34////
    alimm34: "",
    peam34: "",
    conm34: "",
    pecnm34: "",
    mediosm34: "",
    pemm34: "",
    colasm34: "",
    pecm34: "",
    ////5/////
    alimm5: "",
    peam5: "",
    conm5: "",
    pecnm5: "",
    mediosm5: "",
    pemm5: "",
    colasm5: "",
    pecm5: "",
    ////6////
    alimm6: "",
    peam6: "",
    conm6: "",
    pecnm6: "",
    mediom6: "",
    pemm6: "",
    colasm6: "",
    pecm6: "",
    ////seleccion////
    alimgrano: "",
    peag: "",
    concgrano: "",
    pecng: "",
    colasgrano: "",
    pecg: "",
    tonpiedra: "",
    petp: "",
    tolvageneral: "",
    medio3y4: "",
    minale:"",
    minals:"",
    patiols:"",
    desensolve:"",
    colas:"",
    pemle:"",
    pemls:"",
    peple:"",
    pepls:"",
    psm34:"",
    pedese:"",
    pecolas:"",
    aminale:"",
    aminals:"",
    apatiole:"",
    apatiols:"",
    amedio34:"",
    adesensolve:"",
    acolas:"",

    })


  const navigate = useNavigate()

      const handleSubmit =(e) => {
        e.preventDefault()
        axios.post('http://localhost:8081/createrreportejigs', values)
        .then(res => {
          console.log(res);
          // Optionally, you can navigate to a different page or update the UI
          navigate('/diario'); // Example: Navigate to the home page
        })
        .catch(err => console.log(err));

        e.preventDefault()
        axios.post('http://localhost:8081/createrreportejigsch', values)
        .then(res => {
          console.log(res);
          // Optionally, you can navigate to a different page or update the UI
          navigate('/diario'); // Example: Navigate to the home page
        })
        .catch(err => console.log(err));

        e.preventDefault()
        axios.post('http://localhost:8081/createrreportemesas', values)
        .then(res => {
          console.log(res);
          // Optionally, you can navigate to a different page or update the UI
          navigate('/diario'); // Example: Navigate to the home page
        })
        .catch(err => console.log(err));

        e.preventDefault()
        axios.post('http://localhost:8081/createrreportegrano', values)
        .then(res => {
          console.log(res);
          // Optionally, you can navigate to a different page or update the UI
          navigate('/diario'); // Example: Navigate to the home page
        })
        .catch(err => console.log(err));
    };

   
  
    


    

  return (

    <div className="d-flex align-items-center flex-column mt-3" >
      <h1>Insertar Reporte Diario</h1>
      <div className="close-button" onClick={() => navigate('/diario')}>
            <FontAwesomeIcon icon={faTimes} />
            </div>
      <form className="w-50" onSubmit={handleSubmit} >
        <div className='mmm'>
          <div className='JIGS1'>
            <label> Fecha:</label>
            <input
              type="date"
              placeholder="cantidad"
              name='fecha'
              required
              onChange={(e) => setValues({ ...values, fecha: e.target.value })} />
          </div>

          <div className='JIGS1'>
            <label>Turno:</label>
            <select
              id="seleccion"
              name="seleccion"
              required
              value={values.turno}
              onChange={(e) => setValues({ ...values, turno: e.target.value })} >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>

            </select>

          </div>
        </div>
        <div className='columnas'>
        <div className="JIGS">
            
            <input
              type="text"
              placeholder="A"
              name='	aminale	'
              required
              onChange={(e) => setValues({ ...values, 	aminale: e.target.value })} />
          </div>

          <div className="JIGS">
            
            <input
              type="numers"
              placeholder="Mina LE"
              name='	minale	'
              required
              onChange={(e) => setValues({ ...values, 	minale: e.target.value })} />
          </div>
          <div className="JIGS">
            <input
              type="numers"
              placeholder="P.E"
              name='pemle	'
              required
              onChange={(e) => setValues({ ...values ,pemle: e.target.value })} />
          </div>
         
          <div className="JIGS">
            <input
              type="text"
              placeholder="A"
              name='aminals'
              required
              onChange={(e) => setValues({ ...values, aminals: e.target.value })} />
          </div>

          <div className="JIGS">
            <input
              type="moler"
              placeholder="Mina LS"
              name='minals'
              required
              onChange={(e) => setValues({ ...values, minals: e.target.value })} />
          </div>
          <div className="JIGS">
            <input
              type="numers"
              placeholder="P.E"
              name='pemls	'
              required
              onChange={(e) => setValues({ ...values ,pemls: e.target.value })} />
          </div>
          </div>
          <div className='columnas'>
           <div className="JIGS">
            <input
              type="text"
              placeholder="A"
              name='apatiole	'
              required
              onChange={(e) => setValues({ ...values, apatiole: e.target.value })} />
          </div>
    
          <div className="JIGS">
            <input
              type="numers"
              placeholder="Patio LE"
              name='patiols	'
              required
              onChange={(e) => setValues({ ...values, patiols: e.target.value })} />
          </div>
          <div className="JIGS">
            <input
              type="numers"
              placeholder="P.E"
              name='peple	'
              required
              onChange={(e) => setValues({ ...values ,peple: e.target.value })} />
          </div>
          
         
          
          <div className="JIGS">
            <input
              type="text"
              placeholder="A"
              name='apatiols'
              required
              onChange={(e) => setValues({ ...values, apatiols: e.target.value })} />
          </div>
          <div className="JIGS">
            <input
              type="numers"
              placeholder="Patio LS"
              name='tolvageneral	'
              required
              onChange={(e) => setValues({ ...values, tolvageneral: e.target.value })} />
          </div>
          <div className="JIGS">
            <input
              type="numers"
              placeholder="P.E"
              required
              name='pepls	'
              onChange={(e) => setValues({ ...values , pepls: e.target.value })} />
          </div>
          </div>
          
          <div className='columnas'>
          <div className="JIGS">
            <input
              type="text"
              placeholder="A"
              required
              name='amedio34'
              onChange={(e) => setValues({ ...values, amedio34: e.target.value })} />
          
        </div>
          <div className="JIGS">
            <input
              type="moler"
              placeholder="Medios 3 y 4"
              name='medio3y4'
              required
              onChange={(e) => setValues({ ...values, medio3y4: e.target.value })} />
          
        </div>
        <div className="JIGS">
            <input
              type="numers"
              placeholder="P.E"
              name='psm34	'
              required
              onChange={(e) => setValues({ ...values ,psm34: e.target.value })} />
          </div>
          

          
          <div className="JIGS">
            <input
              type="text"
              placeholder="A"
              name='adesensolve'
              required
              onChange={(e) => setValues({ ...values, adesensolve: e.target.value })} />
          
        </div>
        <div className="JIGS">
            <input
              type="moler"
              placeholder="Desensolve"
              name='desensolve'
              required
              onChange={(e) => setValues({ ...values, desensolve: e.target.value })} />
          
        </div>
        <div className="JIGS">
            <input
              type="numers"
              placeholder="P.E"
              required
              name='pedese	'
              onChange={(e) => setValues({ ...values ,pedese: e.target.value })} />
          </div>
          </div>
        
      
        <div className='columnas'>
        <div className="JIGS">
            <input
              type="text"
              placeholder="A"
              name='acolas'
              required
              onChange={(e) => setValues({ ...values, acolas: e.target.value })} />
          
          </div>
        <div className="JIGS">
            <input
              type="moler"
              placeholder="Colas"
              name='colas'
              required
              onChange={(e) => setValues({ ...values, colas: e.target.value })} />
          
          </div>

          <div className="JIGS">
            <input
              type="numers"
              placeholder="P.E"
              name='pecolas'
              required
              onChange={(e) => setValues({ ...values ,pecolas: e.target.value })} />
          </div>
          </div>

        




        <div className="columns">
          {/* Primera columna */}

          <div className="columna">




            <label>JIGGS#1</label>
            <div className="JIGS1">
              <input
                type="tolvagen"
                placeholder="Alim."
                name='alimj1'
                required
                onChange={(e) => setValues({ ...values, alimj1: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='peaj1'
                required
                onChange={(e) => setValues({ ...values, peaj1: e.target.value })} />

            </div>

            <div className="JIGS1">
              <input
                placeholder="Grano"
                name=' granoj1l'
                required
                onChange={(e) => setValues({ ...values, granoj1: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pegj1'
                required
                onChange={(e) => setValues({ ...values, pegj1: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="Desens"
                name=' desenj1'
                required
                onChange={(e) => setValues({ ...values, desenj1: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="P.E"
                name=' pedj1'
                required
                onChange={(e) => setValues({ ...values, pedj1: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="Colas"
                name='colasj1'
                required
                onChange={(e) => setValues({ ...values, colasj1: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pecj1'
                required
                onChange={(e) => setValues({ ...values, pecj1: e.target.value })} />
            </div>


          </div>



          {/* Segunda columna */}
          <div className="columna">
            <label>JIGGS#2</label>
            <div className="JIGS1">

              <input

                placeholder="Alim."
                name='alimj2'
                required
                onChange={(e) => setValues({ ...values, alimj2: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input

                placeholder="P.E"
                name=' peaj2'
                required
                onChange={(e) => setValues({ ...values, peaj2: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="Grano"
                name='granoj2'
                required
                onChange={(e) => setValues({ ...values, granoj2: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="P.E"
                name=' pegj2'
                required
                onChange={(e) => setValues({ ...values, pegj2: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="Desen."
                name=' desenj2'
                required
                onChange={(e) => setValues({ ...values, desenj2: e.target.value })} />
            </div>

            <div className="JIGS1">

              <input

                placeholder="P.E"
                name=' pedj2'
                required
                onChange={(e) => setValues({ ...values, pedj2: e.target.value })} />
            </div>

            <div className="JIGS1">

              <input

                placeholder="Colas"
                name='colasj2'
                required
                onChange={(e) => setValues({ ...values, colasj2: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pecj2'
                required
                onChange={(e) => setValues({ ...values, pecj2: e.target.value })} />
            </div>

          </div>



          {/* Tercera columna */}
          <div className="columna">

            <label>J.CHINO</label>
            
            <div className="JIGS1">
              <input
                placeholder="Alim."
                name=' alimjch'
                required
                onChange={(e) => setValues({ ...values, alimjch: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name=' peajch'
                required
                onChange={(e) => setValues({ ...values, peajch: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Grano"
                name='granojch'
                required
                onChange={(e) => setValues({ ...values, granojch: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name=' pegjch'
                required
                onChange={(e) => setValues({ ...values, pegjch: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Desens."
                name=' desenjch'
                required
                onChange={(e) => setValues({ ...values, desenjch: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name=' pedjch'
                required
                onChange={(e) => setValues({ ...values, pedjch: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Colas"
                name='colasjch'
                required
                onChange={(e) => setValues({ ...values, colasjch: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pecjch'
                required
                onChange={(e) => setValues({ ...values, pecjch: e.target.value })} />
            </div>


          </div>
          {/* Cuarta columna */}
          <div className="columna">
            <label>J.SECU</label>
            <div className="JIGS1">
              <input
                placeholder="Horas"
                name='horasec'
                required
                onChange={(e) => setValues({ ...values, horasec: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Alim."
                name='alimjsec'
                required
                onChange={(e) => setValues({ ...values, alimjsec: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='peajsec'
                required
                onChange={(e) => setValues({ ...values, peajsec: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Conc."
                name=' concjsec'
                required
                onChange={(e) => setValues({ ...values, concjsec: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pecojsec'
                required
                onChange={(e) => setValues({ ...values, pecojsec: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Colas"
                name='colasjsec'
                required
                onChange={(e) => setValues({ ...values, colasjsec: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pecjsec'
                required
                onChange={(e) => setValues({ ...values, pecjsec: e.target.value })} />
            </div>
          </div>
          {/* Quinta columna */}
          <div className='columna'>

            <label>Mesa1y2 </label>
            <div className="JIGS1">
              <input
                placeholder="Alim."
                name=' alimm12'
                required
                onChange={(e) => setValues({ ...values, alimm12: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name=' peam12'
                required
                onChange={(e) => setValues({ ...values, peam12: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Conc."
                name=' conm12'
                required
                onChange={(e) => setValues({ ...values, conm12: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='  pecnm12'
                required
                onChange={(e) => setValues({ ...values, pecnm12: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Medios"
                name='mediom12'
                required
                onChange={(e) => setValues({ ...values, mediom12: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pemm12'
                required
                onChange={(e) => setValues({ ...values, pemm12: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Colas"
                name=' colasm12'
                required
                onChange={(e) => setValues({ ...values, colasm12: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                required
                name='pecm12'
                onChange={(e) => setValues({ ...values, pecm12: e.target.value })} />
            </div>
          </div>
          {/* SEXTA columna */}
          <div className='columna'>
            <label>Mesa3y4</label>
            <div className="JIGS1">
              <input
                placeholder="Alim."
                name=' alimm34'
                required
                onChange={(e) => setValues({ ...values, alimm34: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='peam34'
                required
                onChange={(e) => setValues({ ...values, peam34: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Conc."
                name='conm34'
                required
                onChange={(e) => setValues({ ...values, conm34: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pecnm34'
                required
                onChange={(e) => setValues({ ...values, pecnm34: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Medios"
                name=' mediosm34'
                required
                onChange={(e) => setValues({ ...values, mediosm34: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pemm34'
                required
                onChange={(e) => setValues({ ...values, pemm34: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Colas"
                name=' colasm34'
                required
                onChange={(e) => setValues({ ...values, colasm34: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name=' pecm34'
                required
                onChange={(e) => setValues({ ...values, pecm34: e.target.value })} />
            </div>

          </div>
          {/* SEptima columna */}
          <div className='columna'>
            <label>Mesa#5</label>
            <div className="JIGS1">
              <input
                placeholder="Alim."
                name=' alimm5'
                required
                onChange={(e) => setValues({ ...values, alimm5: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='peam5'
                required
                onChange={(e) => setValues({ ...values, peam5: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Conc."
                name=' conm5'
                required
                onChange={(e) => setValues({ ...values,  conm5: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pecnm5'
                required
                onChange={(e) => setValues({ ...values, pecnm5: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Medios"
                name='mediosm5'
                required
                onChange={(e) => setValues({ ...values, mediosm5: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pemm5'
                required
                onChange={(e) => setValues({ ...values, pemm5: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Colas"
                name=' colasm5'
                required
                onChange={(e) => setValues({ ...values, colasm5: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name=' pecm5'
                required
                onChange={(e) => setValues({ ...values, pecm5: e.target.value })} />
            </div>
          </div>

            {/* octava columna */}
            <div className='columna'>
            <label>Mesa#6</label>
            <div className="JIGS1">
              <input
                placeholder="Alim."
                required
                name=' alimm6'
                onChange={(e) => setValues({ ...values, alimm6: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='peam6'
                required
                onChange={(e) => setValues({ ...values, peam6: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Conc."
                name=' conm6'
                required
                onChange={(e) => setValues({ ...values,  conm6: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pecnm6'
                required
                onChange={(e) => setValues({ ...values, pecnm6: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Medios"
                name='mediom6'
                required
                onChange={(e) => setValues({ ...values, mediom6: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pemm6'
                required
                onChange={(e) => setValues({ ...values, pemm6: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Colas"
                name=' colasm6'
                required
                onChange={(e) => setValues({ ...values, colasm6: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name=' pecm6'
                required
                onChange={(e) => setValues({ ...values, pecm6: e.target.value })} />
            </div>
            </div>

              {/* novena columna */}
              <div className='columna'>
            <label>Grano</label>
            <div className="JIGS1">
              <input
                placeholder="Alim."
                name=' alimgrano'
                required
                onChange={(e) => setValues({ ...values, alimgrano: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name=' peag'
                required
                onChange={(e) => setValues({ ...values,  peag: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Conc."
                name=' concgrano'
                required
                onChange={(e) => setValues({ ...values, concgrano: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                required
                name='pecng'
                onChange={(e) => setValues({ ...values, pecng: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Colas"
                name=' colasgrano'
                required
                onChange={(e) => setValues({ ...values,  colasgrano: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pecg'
                required
                onChange={(e) => setValues({ ...values, pecg: e.target.value })} />
            </div>
           
  
            </div>
             {/* 10 columna */}
             <div className='columna'> 
             <label>Piedra</label>
            <div className="JIGS1">
              <input
                placeholder="TON"
                name=' tonpiedra'
                required
                onChange={(e) => setValues({ ...values,tonpiedra: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='  petp'
                required
                onChange={(e) => setValues({ ...values, petp: e.target.value })} />
            </div>
            </div>
        </div>
        <div className="btn-container">
          <button type="submit" className="BTN"  >GUARDAR</button>
        </div>

      </form>






    </div>


  );
}

export default FrmReporte;