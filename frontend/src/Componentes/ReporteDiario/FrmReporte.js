import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FrmReporte.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


function FrmReporte() {
  const [values, setValues] = useState({
    ///jigs//
    fecha: "",
    turno: "",
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

  })


  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/createreportediario', values)
      .then(res => {
        console.log(res);
        // Optionally, you can navigate to a different page or update the UI
        navigate('/reportediario'); // Example: Navigate to the home page
      })
      .catch(err => console.log(err));
  };

  return (

    <div className="d-flex  flex-column mt-3" >
      <h1>Insertar Reporte Diario</h1>
      <form className="w-50" onSubmit={handleSubmit} >
        <div className='columns'>
          <div className='JIGS1'>
            <label> Fecha:</label>
            <input
              type="date"
              placeholder="cantidad"
              name='fecha'
              onChange={(e) => setValues({ ...values, fecha: e.target.value })} />
          </div>

          <div className='JIGS1'>
            <label for="seleccion">Turno:</label>
            <select
              id="seleccion"
              name="seleccion"
              value={values.turno}
              onChange={(e) => setValues({ ...values, turno: e.target.value })} >
              <option value="opcion1">Primera</option>
              <option value="opcion2">Segunda</option>
              <option value="opcion3">Tercera</option>

            </select>

          </div>
        </div>
        <div className='columns'>
          <div className="JIGS1">
            <input
              type="numers"
              placeholder="Patio LS"
              name='tolvageneral	'
              onChange={(e) => setValues({ ...values, tolvageneral: e.target.value })} />
          </div>

          <div className="JIGS1">
            <input
              type="moler"
              placeholder="Medios 3 y 4"
              name='medio3y4'
              onChange={(e) => setValues({ ...values, medio3y4: e.target.value })} />
          </div>
        </div>




        <div className="columns">
          {/* Primera columna */}

          <div className="columna">




            <label>info. JIGS#1</label>
            <div className="JIGS1">
              <input
                type="tolvagen"
                placeholder="Alimentacion JIGS1"
                name='alimj1'
                onChange={(e) => setValues({ ...values, alimj1: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='peaj1'
                onChange={(e) => setValues({ ...values, peaj1: e.target.value })} />

            </div>

            <div className="JIGS1">
              <input
                placeholder="Grano JIGS1"
                name=' granoj1l'
                onChange={(e) => setValues({ ...values, granoj1granoj1: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pegj1'
                onChange={(e) => setValues({ ...values, pegj1: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="Desensolve JIGS1"
                name=' desenj1'
                onChange={(e) => setValues({ ...values, desenj1: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="P.E"
                name=' pedj1'
                onChange={(e) => setValues({ ...values, pedj1: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="Colas JIGS1"
                name='colasj1'
                onChange={(e) => setValues({ ...values, colasj1: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pecj1'
                onChange={(e) => setValues({ ...values, pecj1: e.target.value })} />
            </div>


          </div>



          {/* Segunda columna */}
          <div className="columna">
            <label>JIGS2</label>
            <div className="JIGS1">

              <input

                placeholder="Alimentacion JIGS2"
                name='alimj2'
                onChange={(e) => setValues({ ...values, alimj2: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input

                placeholder="P.E"
                name=' peaj2'
                onChange={(e) => setValues({ ...values, peaj2: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="Grano JIGS2"
                name='granoj2'
                onChange={(e) => setValues({ ...values, granoj2: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="P.E"
                name=' pegj2'
                onChange={(e) => setValues({ ...values, pegj2: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="Desensolve JIGS2"
                name=' desenj2'
                onChange={(e) => setValues({ ...values, desenj2: e.target.value })} />
            </div>

            <div className="JIGS1">

              <input

                placeholder="P.E"
                name=' pedj2'
                onChange={(e) => setValues({ ...values, pedj2: e.target.value })} />
            </div>

            <div className="JIGS1">

              <input

                placeholder="Colas JIGS2"
                name='colasj2'
                onChange={(e) => setValues({ ...values, colasj2: e.target.value })} />
            </div>

            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pecj2'
                onChange={(e) => setValues({ ...values, pecj2: e.target.value })} />
            </div>

          </div>



          {/* Tercera columna */}
          <div className="columna">

            <label>JIGS CHINO</label>
            <div className="JIGS1">
              <input
                placeholder="Alimentacion JIGS CHINO"
                name=' alimjch'
                onChange={(e) => setValues({ ...values, alimjch: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name=' peajch'
                onChange={(e) => setValues({ ...values, peajch: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Grano"
                name='granojch'
                onChange={(e) => setValues({ ...values, granojch: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name=' pegjch'
                onChange={(e) => setValues({ ...values, pegjch: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Desensolve JIGS CHINO"
                name=' desenjch'
                onChange={(e) => setValues({ ...values, desenjch: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name=' pedjch'
                onChange={(e) => setValues({ ...values, pedjch: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Colas JIGS CHINO"
                name='colasjch'
                onChange={(e) => setValues({ ...values, colasjch: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pecjch'
                onChange={(e) => setValues({ ...values, pecjch: e.target.value })} />
            </div>


          </div>
          {/* Cuarta columna */}
          <div className="columna">
            <label>JIGS SECU</label>
            <div className="JIGS1">
              <input
                placeholder="Alimentacion JIGS SECU"
                name='alimjsec'
                onChange={(e) => setValues({ ...values, alimjsec: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='peajsec'
                onChange={(e) => setValues({ ...values, peajsec: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Concentrado"
                name=' concjsec'
                onChange={(e) => setValues({ ...values, concjsec: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pecojsec'
                onChange={(e) => setValues({ ...values, pecojsec: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Colas"
                name='colasjsec'
                onChange={(e) => setValues({ ...values, colasjsec: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pecjsec'
                onChange={(e) => setValues({ ...values, pecjsec: e.target.value })} />
            </div>
          </div>
          {/* Quinta columna */}
          <div className='columna'>

            <label>Mesa 1 y 2 </label>
            <div className="JIGS1">
              <input
                placeholder="Alimentacion"
                name=' alimm12'
                onChange={(e) => setValues({ ...values, alimm12: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name=' peam12'
                onChange={(e) => setValues({ ...values, peam12: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Concentrado"
                name=' conm12'
                onChange={(e) => setValues({ ...values, conm12: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='  pecnm12'
                onChange={(e) => setValues({ ...values, pecnm12: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Medios"
                name='mediom12'
                onChange={(e) => setValues({ ...values, mediom12: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pemm12'
                onChange={(e) => setValues({ ...values, pemm12: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Colas"
                name=' colasm12'
                onChange={(e) => setValues({ ...values, colasm12: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pecm12'
                onChange={(e) => setValues({ ...values, pecm12: e.target.value })} />
            </div>
          </div>
          {/* SEXTA columna */}
          <div className='columna'>
            <label>Mesa 3 y 4</label>
            <div className="JIGS1">
              <input
                placeholder="Alimentacion"
                name=' alimm34'
                onChange={(e) => setValues({ ...values, alimm34: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='peam34'
                onChange={(e) => setValues({ ...values, peam34: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Concentrado"
                name='conm34'
                onChange={(e) => setValues({ ...values, conm34: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pecnm34'
                onChange={(e) => setValues({ ...values, pecnm34: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Medios"
                name=' mediosm34'
                onChange={(e) => setValues({ ...values, mediosm34: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pemm34'
                onChange={(e) => setValues({ ...values, pemm34: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Colas"
                name=' colasm34'
                onChange={(e) => setValues({ ...values, colasm34: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name=' pecm34'
                onChange={(e) => setValues({ ...values, pecm34: e.target.value })} />
            </div>

          </div>
          {/* SEXTA columna */}
          <div className='columna'>
            <label>Mesa 5</label>
            <div className="JIGS1">
              <input
                placeholder="Alimentacion"
                name=' alimm5'
                onChange={(e) => setValues({ ...values, alimm5: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='peam5'
                onChange={(e) => setValues({ ...values, peam5: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Concentrado"
                name=' conm5'
                onChange={(e) => setValues({ ...values,  conm5: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pecnm5'
                onChange={(e) => setValues({ ...values, pecnm5: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Medios"
                name='mediosm5'
                onChange={(e) => setValues({ ...values, mediosm5: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name='pemm5'
                onChange={(e) => setValues({ ...values, pemm5: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="Colas"
                name=' colasm5'
                onChange={(e) => setValues({ ...values, colasm5: e.target.value })} />
            </div>
            <div className="JIGS1">
              <input
                placeholder="P.E"
                name=' pecm5'
                onChange={(e) => setValues({ ...values, pecm5: e.target.value })} />
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