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
    alimj1:"",
    peaj1:"",
    granoj1:"",
    pegj1:"",
    colasj1:"",
    pecj1:"",
    desenj1:"",
    pedj1:"",
    alimj2:"",
    peaj2:"",
    granoj2:"",
    pegj2:"",
    colasj2:"",
    pecj2:"",
    desenj2:"",
    pedj2:"",
    ///chini y sec///
    alimjch:"",
    peajch:"",
    granojch:"",
    pegjch:"",
    desenjch:"",
    pedjch:"",
    colasjch:"",
    pecjch:"",
    alimjsec:"",
    peajsec:"",
    concjsec:"",
    pecojsec:"",
    colasjsec:"",
    pecjsec:"",
    //////Mesas///
    alimm12:"",
    peam12:"",
    conm12:"",
    pecnm12:"",
    mediom12:"",
    pemm12:"",
    colasm12:"",
    pecm12:"",
    alimm34:"",
    peam34:"",
    conm34:"",
    pecnm34:"",
    mediosm34:"",
    pemm34:"",
    colasm34:"",
    pecm34:"",
    alimm5:"",
    peam5:"",
    conm5:"",
    pecnm5:"",
    mediosm5:"",
    pemm5:"",
    colasm5:"",
    pecm5:"",
    alimm6:"",
    peam6:"",
    conm6:"",
    pecnm6:"",
    mediom6:"",
    pemm6:"",
    colasm6:"",
    pecm6:"",
    ////seleccion////
    alimgrano:"",
    peag:"",
    concgrano:"",
    pecng:"",
    colasgrano:"",
    pecg:"",
    tonpiedra:"",
    petp:"",
    tolvageneral	:"",
    medio3y4:"",

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
        <div className='fecha'>
          <label> Fecha:</label>
          <input 
          type="date"
          placeholder="cantidad"
          name='fecha'
          onChange={(e) => setValues({...values, fecha: e.target.value})}  />
        </div>

        <div className='turno'>
        <label for="seleccion">Turno:</label>
        <select 
        id="seleccion" 
        name="seleccion"
        value={values.turno}
        onChange={(e) => setValues({...values, turno: e.target.value})} >
            <option value="opcion1">Primera</option>
            <option value="opcion2">Segunda</option>
            <option value="opcion3">Tercera</option>
            
        </select>
         
        </div>

        <div className="columns">
          {/* Primera columna */}

          <div className="columna">

            <div className="JIGS1">
              <input 
              type="numers" 
              placeholder="Patio LS"
              name='tolvageneral	'
              onChange={(e) => setValues({...values, tolvageneral	: e.target.value})}/>
            </div>

            <div className="JIGS1">
              <input 
              type="moler" 
              placeholder="Medios 3 y 4" 
              name='medio3y4'
              onChange={(e) => setValues({...values, medio3y4: e.target.value})}/>
            </div>

            
             <label>info. JIGS#1</label>
            <div className="JIGS1">
              <input
              type="tolvagen"
              placeholder="Alimentacion JIGS1"
              name='alimj1'
              onChange={(e) => setValues({...values, alimj1: e.target.value})}/>
            </div>

            <div className="JIGS1">
               <input
              placeholder="P.E" 
              name='peaj1'
              onChange={(e) => setValues({...values, peaj1: e.target.value})}/>
              
            </div>

            <div className="JIGS1">
              <input
               placeholder="Grano JIGS1" 
               name=' granoj1l'
               onChange={(e) => setValues({...values, granoj1granoj1: e.target.value})} />
            </div>

            <div className="JIGS1">
              <input
               placeholder="P.E"
               name='pegj1'
               onChange={(e) => setValues({...values, pegj1: e.target.value})}/>
            </div>
            
            <div className="JIGS1">
              <input
               placeholder="Desensolve JIGS1"
               name=' desenj1'
               onChange={(e) => setValues({...values,  desenj1: e.target.value})}/>
            </div>

            <div className="JIGS1">
              <input
               placeholder="P.E"
               name=' pedj1'
               onChange={(e) => setValues({...values,  pedj1: e.target.value})}/>
            </div>

            <div className="JIGS1">
              <input
               placeholder="Colas JIGS1"
               name='colasj1'
               onChange={(e) => setValues({...values,  colasj1: e.target.value})}/>
            </div>
            
            <div className="JIGS1">
              <input
               placeholder="P.E"
               name='pecj1'
               onChange={(e) => setValues({...values, pecj1: e.target.value})}/>
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