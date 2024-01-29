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
    fecha: "",
    crivadasilvialavar: "",
    consmoler: "",
    trictolva: "",
    grano_moler: "",
    patiotolvageneral: "",
    patiotolva2: "",
    granomoler2: "",
    medios5y6: "",
    medioslavar: "",
    granojics1: "",
    tepetatejics1: "",
    conm5: "",
    consm6: "",
    consjics1: "",
    consjics2: "",
    granoproducido: "",
    consm3y4: "",
    consm1y2: "",
    polvocts: "",

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

    <div className="d-flex align-items-center flex-column mt-3" >
      <h1>Insertar Reporte Diario</h1>
      <form className="w-50" onSubmit={handleSubmit} >
        <div className='fecha'>
          <label> Fecha:</label>
          <input 
          type="date"
          placeholder="cantidad"
          name='fecha'
          onChange={(e) => setValues({...values, fecha: e.target.value})}  />
        </div>

        <div className="columns">
          {/* Primera columna */}

          <div className="columna">

            <div className="lavar">
              <label> Crivada Silvia a Lavar:</label>
              <input 
              type="numers" 
              placeholder="cantidad"
              name='crivadasilvialavar'
              onChange={(e) => setValues({...values, crivadasilvialavar: e.target.value})}/>
            </div>

            <div className="lavar">
              <label> Consentrado a Moler 123y4:</label>
              <input 
              type="moler" 
              placeholder="cantidad" 
              name='consmoler'
              onChange={(e) => setValues({...values, consmoler: e.target.value})}/>
            </div>

            <div className="lavar">
              <label> Tric. Tolva General:</label>
              <input
              type="tolvagen"
              placeholder="cantidad"
              name='trictolva'
              onChange={(e) => setValues({...values, trictolva: e.target.value})}/>
            </div>

            <div className="lavar">
              <label> Grano a Moler:</label >
               <input
              type="tolvagen"
              placeholder="cantidad" 
              name='grano_moler'
              onChange={(e) => setValues({...values, grano_moler: e.target.value})}/>
              
            </div>

            <div className="lavar">
              <label>Patio a Tolva General:</label>
              <input
               type="patiotg"
               placeholder="cantidad" 
               name=' patiotolvageneral'
               onChange={(e) => setValues({...values, patiotolvageneral: e.target.value})} />
            </div>

            <div className="lavar">
              <label> Patio a Tolva #2:</label>
              <input
               type="patiot2"
               placeholder="cantidad"
               name='patiotolva2'
               onChange={(e) => setValues({...values, patiotolva2: e.target.value})}/>
            </div>

          </div>



          {/* Segunda columna */}
          <div className="columna">
            <div className="lavar">
              <label>Grano a Moler:</label>
              <input
              type="granom"
              placeholder="cantidad"
              name='granomoler2'
              onChange={(e) => setValues({...values,granomoler2: e.target.value})}/>
            </div>

            <div className="lavar">
              <label>Medios 5 y 6:</label>
              <input
               type="medio5y6" 
               placeholder="cantidad"
                 name='medios5y6'
               onChange={(e) => setValues({...values, medios5y6: e.target.value})}  />
            </div>

            <div className="lavar"> 
              <label> Medios a Lavar:</label>
              <input
              type="medioslavar" 
              placeholder="cantidad"
              name='medioslavar'
              onChange={(e) => setValues({...values, medioslavar: e.target.value})} />
            </div>

            <div className="lavar">
              <label>  Grano produc. JIGS#1:</label>
              <input 
              type="jigs1" 
              placeholder="cantidad"
                 name=' granojics1'
               onChange={(e) => setValues({...values,  granojics1: e.target.value})} />
            </div>

            <div className="lavar">
              <label> Tepetate JIGS#1:</label>
              <input 
              type="tepetatejigs1"
              placeholder="cantidad" 
               name=' tepetatejics1'
               onChange={(e) => setValues({...values,  tepetatejics1: e.target.value})}  />
            </div>

            <div className="lavar">
              <label> Consentrado Mesa 5:</label>
              <input 
              type="concentradom5" 
              placeholder="cantidad"
              name='conm5'
              onChange={(e) => setValues({...values, conm5: e.target.value})} />
            </div>




          </div>



          {/* Tercera columna */}
          <div className="columna">

            <div className="lavar">
              <label> Consentrado Mesa 6:</label>
              <input 
              type="concentradom6"
              placeholder="cantidad"
              name=' consm6'
              onChange={(e) => setValues({...values, consm6: e.target.value})} />
            </div>

            <div className="lavar">
              <label>Consentrado JIGS SECU:</label>
              <input 
              type="concentraoJIGS2" 
              placeholder="cantidad"
               name=' consjics2'
              onChange={(e) => setValues({...values, consjics2: e.target.value})}/>
            </div>

            <div className="lavar">
              <label>Consentrado JIGS SE:</label>
              <input 
              type="concentraoJIGS2" 
              placeholder="cantidad"
               name=' consjics2'
              onChange={(e) => setValues({...values, consjics2: e.target.value})}/>
            </div>

            <div className="lavar">
              <label>Grano Produccion JIGS1:</label>
              <input 
              type="graPRODJIGS1" 
              placeholder="cantidad" 
              name=' granoproducido'
              onChange={(e) => setValues({...values,  granoproducido: e.target.value})}/>
            </div>

            <div className="lavar">
              <label> Consentrado Mesa 3y4:</label>
              <input 
              type="conm3y4" 
              placeholder="cantidad"
                name='consm3y4'
               onChange={(e) => setValues({...values, consm3y4: e.target.value})}  />
            </div>

            <div className="lavar">
              <label> Consentrado Mesa 1y2:</label>
              <input 
              type="conm1y2" 
              placeholder="cantidad"
              name='consm1y2'
              onChange={(e) => setValues({...values, consm1y2: e.target.value})} />
            </div>

            <div className="lavar">
              <label> Polvo CTS:</label>
              <input 
              type="POLVO" 
              placeholder="cantidad"
                 name='polvocts'
               onChange={(e) => setValues({...values, polvocts: e.target.value})} />
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