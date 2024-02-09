import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

function ModificarReporte() {
    const { id } = useParams()
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
        minale: "",
        minals: "",
        patiols: "",
        desensolve: "",
        colas: "",
        pemle: "",
        pemls: "",
        peple: "",
        pepls: "",
        psm34: "",
        pedese: "",
        pecolas: "",
        aminale: "",
        aminals: "",
        apatiole: "",
        apatiols: "",
        amedio34: "",
        adesensolve: "",
        acolas: "",
    })

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8081/updatejigs/${id}`, values)
        axios.put(`http://localhost:8081/updatejigsch/${id}`, values)
        axios.put(`http://localhost:8081/updatemesas/${id}`, values)
        axios.put(`http://localhost:8081/updategrano/${id}`, values)


            .then(res => {
                console.log(res);
                // Optionally, you can navigate to a different page or update the UI
                navigate('/diario'); // Example: Navigate to the home page
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        axios.get(`http://localhost:8081/getrecorjigs/` + id)
            .then((res) => {

                setValues({
                    ...values,
                    fecha: res.data[0].fecha,
                    turno: res.data[0].turno,
                    alimj1: res.data[0].alimj1,
                    peaj1: res.data[0].peaj1,
                    granoj1: res.data[0].granoj1,
                    pegj1: res.data[0].peaj1,
                    colasj1: res.data[0].colasj1,
                    pecj1: res.data[0].pecj1,
                    desenj1: res.data[0].desenj1,
                    pedj1: res.data[0].pedj1,
                    alimj2: res.data[0].alimj2,
                    peaj2: res.data[0].peaj2,
                    granoj2: res.data[0].granoj2,
                    pegj2: res.data[0].peaj2,
                    colasj2: res.data[0].colasj2,
                    pecj2: res.data[0].pecj2,
                    desenj2: res.data[0].desenj2,
                    pedj2: res.data[0].pedj2,
                    ///chini y sec///
                    alimjch: res.data[0].alimjch,
                    peajch: res.data[0].peajch,
                    granojch: res.data[0].granojch,
                    pegjch: res.data[0].pegjch,
                    desenjch: res.data[0].desenjch,
                    pedjch: res.data[0].pedjch,
                    colasjch: res.data[0].colasjch,
                    pecjch: res.data[0].pecjch,
                    alimjsec: res.data[0].alimjsec,
                    peajsec: res.data[0].peajsec,
                    concjsec: res.data[0].concjsec,
                    pecojsec: res.data[0].pecojsec,
                    colasjsec: res.data[0].colasjsec,
                    pecjsec: res.data[0].pecjsec,
                    //////Mesas///
                    alimm12: res.data[0].alimm12,
                    peam12: res.data[0].peam12,
                    conm12: res.data[0].conm12,
                    pecnm12: res.data[0].pecnm12,
                    mediom12: res.data[0].mediom12,
                    pemm12: res.data[0].pemm12,
                    colasm12: res.data[0].colasm12,
                    pecm12: res.data[0].pecm12,
                    ////34////
                    alimm34: res.data[0].alimm34,
                    peam34: res.data[0].peam34,
                    conm34: res.data[0].conm34,
                    pecnm34: res.data[0].pecm34,
                    mediosm34: res.data[0].mediosm34,
                    pemm34: res.data[0].pemm34,
                    colasm34: res.data[0].colasm34,
                    pecm34: res.data[0].pecm34,
                    ////5/////
                    alimm5: res.data[0].alimm5,
                    peam5: res.data[0].peam5,
                    conm5: res.data[0].conm5,
                    pecnm5: res.data[0].pecnm5,
                    mediosm5: res.data[0].mediosm5,
                    pemm5: res.data[0].pemm5,
                    colasm5: res.data[0].colasm5,
                    pecm5: res.data[0].pecm5,
                    ////6////
                    alimm6: res.data[0].alimm6,
                    peam6: res.data[0].peam6,
                    conm6: res.data[0].conm6,
                    pecnm6: res.data[0].pecnm6,
                    mediom6: res.data[0].mediom6,
                    pemm6: res.data[0].pemm6,
                    colasm6: res.data[0].colasm6,
                    pecm6: res.data[0].pecm6,
                    ////seleccion////
                    alimgrano: res.data[0].alimgrano,
                    peag: res.data[0].peag,
                    concgrano: res.data[0].concgrano,
                    pecng: res.data[0].pecng,
                    colasgrano: res.data[0].colasgrano,
                    pecg: res.data[0].pecg,
                    tonpiedra: res.data[0].tonpiedra,
                    petp: res.data[0].petp,
                    tolvageneral: res.data[0].tolvageneral,
                    medio3y4: res.data[0].medio3y4,
                    minale: res.data[0].minale,
                    minals: res.data[0].minals,
                    patiols: res.data[0].patiols,
                    desensolve: res.data[0].desensolve,
                    colas: res.data[0].colas,
                    pemle: res.data[0].pemle,
                    pemls: res.data[0].pemls,
                    peple: res.data[0].peple,
                    pepls: res.data[0].pepls,
                    psm34: res.data[0].psm34,
                    pedese: res.data[0].pedese,
                    pecolas: res.data[0].pecolas,
                    aminale: res.data[0].aminale,
                    aminals: res.data[0].aminals,
                    apatiole: res.data[0].apatiole,
                    apatiols: res.data[0].apatiols,
                    amedio34: res.data[0].amedio34,
                    adesensolve: res.data[0].adesensolve,
                    acolas: res.data[0].acolas,
                });

            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div className="d-flex align-items-center flex-column mt-3" >
        <h1>Insertar Reporte Diario</h1>
        <form className="w-50" onSubmit={handleSubmit} >
          <div className='mmm'>
            <div className='JIGS1'>
              <label> Fecha:</label>
              <input
                type="date"
                placeholder="cantidad"
                name='fecha'
                value={values.fecha}
                onChange={(e) => setValues({ ...values, fecha: e.target.value })} />
            </div>
  
            <div className='JIGS1'>
              <label>Turno:</label>
              <select
                id="seleccion"
                name="seleccion"
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
                value={values.aminale}
                onChange={(e) => setValues({ ...values, 	aminale: e.target.value })} />
            </div>
  
            <div className="JIGS">
              
              <input
                type="numers"
                placeholder="Mina LE"
                name='	minale	'
                value={values.minale}
                onChange={(e) => setValues({ ...values, 	minale: e.target.value })} />
            </div>
            <div className="JIGS">
              <input
                type="numers"
                placeholder="P.E"
                name='pemle'
                value={values.pemle}
                onChange={(e) => setValues({ ...values ,pemle: e.target.value })} />
            </div>
           
            <div className="JIGS">
              <input
                type="text"
                placeholder="A"
                name='aminals'
                value={values.aminals}
                onChange={(e) => setValues({ ...values, aminals: e.target.value })} />
            </div>
  
            <div className="JIGS">
              <input
                type="moler"
                placeholder="Mina LS"
                name='minals'
                value={values.minals}
                onChange={(e) => setValues({ ...values, minals: e.target.value })} />
            </div>
            <div className="JIGS">
              <input
                type="numers"
                placeholder="P.E"
                name='pemls	'
                value={values.pemls}
                onChange={(e) => setValues({ ...values ,pemls: e.target.value })} />
            </div>
            </div>
            <div className='columnas'>
             <div className="JIGS">
              <input
                type="text"
                placeholder="A"
                name='apatiole	'
                value={values.apatiole}
                onChange={(e) => setValues({ ...values, apatiole: e.target.value })} />
            </div>
      
            <div className="JIGS">
              <input
                type="numers"
                placeholder="Patio LE"
                name='patiols	'
                value={values.patiols}
                onChange={(e) => setValues({ ...values, patiols: e.target.value })} />
            </div>
            <div className="JIGS">
              <input
                type="numers"
                placeholder="P.E"
                name='peple	'
                value={values.peple}
                onChange={(e) => setValues({ ...values ,peple: e.target.value })} />
            </div>
            
           
            
            <div className="JIGS">
              <input
                type="text"
                placeholder="A"
                name='apatiols'
                value={values.apatiols}
                onChange={(e) => setValues({ ...values, apatiols: e.target.value })} />
            </div>
            <div className="JIGS">
              <input
                type="numers"
                placeholder="Patio LS"
                name='tolvageneral	'
                value={values.tolvageneral}
                onChange={(e) => setValues({ ...values, tolvageneral: e.target.value })} />
            </div>
            <div className="JIGS">
              <input
                type="numers"
                placeholder="P.E"
                name='pepls	'
                value={values.pepls}
                onChange={(e) => setValues({ ...values , pepls: e.target.value })} />
            </div>
            </div>
            
            <div className='columnas'>
            <div className="JIGS">
              <input
                type="text"
                placeholder="A"
                name='amedio34'
                value={values.amedio34}
                onChange={(e) => setValues({ ...values, amedio34: e.target.value })} />
            
          </div>
            <div className="JIGS">
              <input
                type="moler"
                placeholder="Medios 3 y 4"
                name='medio3y4'
                value={values.medio3y4}
                onChange={(e) => setValues({ ...values, medio3y4: e.target.value })} />
            
          </div>
          <div className="JIGS">
              <input
                type="numers"
                placeholder="P.E"
                name='psm34	'
                value={values.psm34}
                onChange={(e) => setValues({ ...values ,psm34: e.target.value })} />
            </div>
            
  
            
            <div className="JIGS">
              <input
                type="text"
                placeholder="A"
                name='adesensolve'
                value={values.adesensolve}
                onChange={(e) => setValues({ ...values, adesensolve: e.target.value })} />
            
          </div>
          <div className="JIGS">
              <input
                type="moler"
                placeholder="Desensolve"
                name='desensolve'
                value={values.desensolve}
                onChange={(e) => setValues({ ...values, desensolve: e.target.value })} />
            
          </div>
          <div className="JIGS">
              <input
                type="numers"
                placeholder="P.E"
                name='pedese	'
                value={values.pedese}
                onChange={(e) => setValues({ ...values ,pedese: e.target.value })} />
            </div>
            </div>
          
        
          <div className='columnas'>
          <div className="JIGS">
              <input
                type="text"
                placeholder="A"
                name='acolas'
                value={values.acolas}
                onChange={(e) => setValues({ ...values, acolas: e.target.value })} />
            
            </div>
          <div className="JIGS">
              <input
                type="moler"
                placeholder="Colas"
                name='colas'
                value={values.colas}
                onChange={(e) => setValues({ ...values, colas: e.target.value })} />
            
            </div>
  
            <div className="JIGS">
              <input
                type="numers"
                placeholder="P.E"
                name='pecolas'
                value={values.pecolas}
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
                  value={values.alimj1}
                  onChange={(e) => setValues({ ...values, alimj1: e.target.value })} />
              </div>
  
              <div className="JIGS1">
                <input
                  placeholder="P.E"
                  name='peaj1'
                  value={values.peaj1}
                  onChange={(e) => setValues({ ...values, peaj1: e.target.value })} />
  
              </div>
  
              <div className="JIGS1">
                <input
                  placeholder="Grano"
                  name=' granoj1'
                  value={values.granoj1}
                  onChange={(e) => setValues({ ...values, granoj1: e.target.value })} />
              </div>
  
              <div className="JIGS1">
                <input
                  placeholder="P.E"
                  name='pegj1'
                  value={values.pegj1}
                  onChange={(e) => setValues({ ...values, pegj1: e.target.value })} />
              </div>
  
              <div className="JIGS1">
                <input
                  placeholder="Desens"
                  name=' desenj1'
                  value={values.desenj1}
                  onChange={(e) => setValues({ ...values, desenj1: e.target.value })} />
              </div>
  
              <div className="JIGS1">
                <input
                  placeholder="P.E"
                  name=' pedj1'
                  value={values.pedj1}
                  onChange={(e) => setValues({ ...values, pedj1: e.target.value })} />
              </div>
  
              <div className="JIGS1">
                <input
                  placeholder="Colas"
                  name='colasj1'
                  value={values.colasj1}
                  onChange={(e) => setValues({ ...values, colasj1: e.target.value })} />
              </div>
  
              <div className="JIGS1">
                <input
                  placeholder="P.E"
                  name='pecj1'
                  value={values.pecj1}
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
                  value={values.alimj2}
                  onChange={(e) => setValues({ ...values, alimj2: e.target.value })} />
              </div>
  
              <div className="JIGS1">
                <input
  
                  placeholder="P.E"
                  name=' peaj2'
                  value={values.peaj2}
                  onChange={(e) => setValues({ ...values, peaj2: e.target.value })} />
              </div>
  
              <div className="JIGS1">
                <input
                  placeholder="Grano"
                  name='granoj2'
                  value={values.granoj2}
                  onChange={(e) => setValues({ ...values, granoj2: e.target.value })} />
              </div>
  
              <div className="JIGS1">
                <input
                  placeholder="P.E"
                  name=' pegj2'
                  value={values.pegj2}
                  onChange={(e) => setValues({ ...values, pegj2: e.target.value })} />
              </div>
  
              <div className="JIGS1">
                <input
                  placeholder="Desen."
                  name=' desenj2'
                  value={values.desenj2}
                  onChange={(e) => setValues({ ...values, desenj2: e.target.value })} />
              </div>
  
              <div className="JIGS1">
  
                <input
  
                  placeholder="P.E"
                  name=' pedj2'
                  value={values.pedj2}
                  onChange={(e) => setValues({ ...values, pedj2: e.target.value })} />
              </div>
  
              <div className="JIGS1">
  
                <input
  
                  placeholder="Colas"
                  name='colasj2'
                  value={values.colasj2}
                  onChange={(e) => setValues({ ...values, colasj2: e.target.value })} />
              </div>
  
              <div className="JIGS1">
                <input
                  placeholder="P.E"
                  name='pecj2'
                  value={values.pecj2}
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
                  placeholder="Desens."
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
                  placeholder="Colas"
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
              <label>J.SECU</label>
              <div className="JIGS1">
                <input
                  placeholder="Alim."
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
                  placeholder="Conc."
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
  
              <label>Mesa1y2 </label>
              <div className="JIGS1">
                <input
                  placeholder="Alim."
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
                  placeholder="Conc."
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
              <label>Mesa3y4</label>
              <div className="JIGS1">
                <input
                  placeholder="Alim."
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
                  placeholder="Conc."
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
            {/* SEptima columna */}
            <div className='columna'>
              <label>Mesa#5</label>
              <div className="JIGS1">
                <input
                  placeholder="Alim."
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
                  placeholder="Conc."
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
  
              {/* octava columna */}
              <div className='columna'>
              <label>Mesa#6</label>
              <div className="JIGS1">
                <input
                  placeholder="Alim."
                  name=' alimm6'
                  onChange={(e) => setValues({ ...values, alimm6: e.target.value })} />
              </div>
              <div className="JIGS1">
                <input
                  placeholder="P.E"
                  name='peam6'
                  onChange={(e) => setValues({ ...values, peam6: e.target.value })} />
              </div>
              <div className="JIGS1">
                <input
                  placeholder="Conc."
                  name=' conm6'
                  onChange={(e) => setValues({ ...values,  conm6: e.target.value })} />
              </div>
              <div className="JIGS1">
                <input
                  placeholder="P.E"
                  name='pecnm6'
                  onChange={(e) => setValues({ ...values, pecnm6: e.target.value })} />
              </div>
              <div className="JIGS1">
                <input
                  placeholder="Medios"
                  name='mediosm6'
                  onChange={(e) => setValues({ ...values, mediosm6: e.target.value })} />
              </div>
              <div className="JIGS1">
                <input
                  placeholder="P.E"
                  name='pemm6'
                  onChange={(e) => setValues({ ...values, pemm6: e.target.value })} />
              </div>
              <div className="JIGS1">
                <input
                  placeholder="Colas"
                  name=' colasm6'
                  onChange={(e) => setValues({ ...values, colasm6: e.target.value })} />
              </div>
              <div className="JIGS1">
                <input
                  placeholder="P.E"
                  name=' pecm6'
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
                  onChange={(e) => setValues({ ...values, alimgrano: e.target.value })} />
              </div>
              <div className="JIGS1">
                <input
                  placeholder="P.E"
                  name=' peag'
                  onChange={(e) => setValues({ ...values,  peag: e.target.value })} />
              </div>
              <div className="JIGS1">
                <input
                  placeholder="Conc."
                  name=' concgrano'
                  onChange={(e) => setValues({ ...values, concgrano: e.target.value })} />
              </div>
              <div className="JIGS1">
                <input
                  placeholder="P.E"
                  name='pecng'
                  onChange={(e) => setValues({ ...values, pecng: e.target.value })} />
              </div>
              <div className="JIGS1">
                <input
                  placeholder="Colas"
                  name=' colasgrano'
                  onChange={(e) => setValues({ ...values,  colasgrano: e.target.value })} />
              </div>
              <div className="JIGS1">
                <input
                  placeholder="P.E"
                  name='pecg'
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
                  onChange={(e) => setValues({ ...values,tonpiedra: e.target.value })} />
              </div>
              <div className="JIGS1">
                <input
                  placeholder="P.E"
                  name='  petp'
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

export default ModificarReporte
