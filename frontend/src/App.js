
import './App.css';
import Login from './Componentes/Usuarios/Login'
import { BrowserRouter as Router, Routes , Route, BrowserRouter} from 'react-router-dom'
import Inicio from './Componentes/Inicio'
import FrmSilos from './Componentes/Silos/FrmSilos';
import 'bootstrap/dist/css/bootstrap.min.css'
import ModificarSilos from './Componentes/Silos/ModificarSilos';
import InsertarUsuario from './Componentes/Usuarios/InsertarUsuario';
import FrmBandas from './Componentes/GranoBandas/FrmBandas';
import ModificarGrano from './Componentes/GranoBandas/ModificarGrano';
import FrmSeleccion from './Componentes/Seleccion/FrmSeleccion';
import ModificarSeleccion from './Componentes/Seleccion/ModificarSeleccion';
import FrmPMoler from './Componentes/ConcPMoler/FrmPMoler';
import ModificarCPMoler from './Componentes/ConcPMoler/ModificarCPMoler';
import ConcPMoler from './Componentes/ConcPMoler/ConcPMoler';
import Menu from './Componentes/Menu'
import Silos from './Componentes/Silos/Silos';
import Seleccion from './Componentes/Seleccion/Seleccion';
import GranoBandas from './Componentes/GranoBandas/GranoBandas';
import ReporteDiario from './Componentes/ReporteDiario/ReporteDiario'
import FrmReporte from './Componentes/ReporteDiario/FrmReporte'
import ReporteExistencia from './Componentes/ReporteExistencia/ReporteExistencia ';
import Pdf from './Componentes/ReporteDiario/Pdf';
import Modificarjigs from './Componentes/ReporteDiario/Modificarjigs';
import Modificarjigsch from './Componentes/ReporteDiario/Modificarjigsch';
import Modificarmesas from './Componentes/ReporteDiario/Modificarmesas';
import Modificargrano from './Componentes/ReporteDiario/Modificargrano';
import PP from './Componentes/ReporteExistencia/PP';
import PT from './Componentes/ReporteExistencia/PT';
import GranoBaribright from './Componentes/GranoBaribright/GranoBaribright';
import FrmGranoBaribright from './Componentes/GranoBaribright/FrmGranoBaribright';
import ModificarGranoBaribrigth from './Componentes/GranoBaribright/ModificarGranoBaribrigth';
import ConcBaribright from './Componentes/ConcBaribright/ConcBaribright';
import FrmConcBaribright from './Componentes/ConcBaribright/FrmConcBaribright';

import Molienda from './Componentes/Molienda/Molienda';
import Mezclas from './Componentes/Molienda/Mezclas';
import FrmMezclas from './Componentes/Molienda/FrmMezclas';
import ModificarMezclas from './Componentes/Molienda/ModificarMezclas';
import Promedios from './Componentes/Molienda/Promedios';
import FrmPromedios from './Componentes/Molienda/FrmPromedios';
import ModificarPromedios from './Componentes/Molienda/ModificarPromedios';
import PdfMolienda from './Componentes/Molienda/PdfMolienda';
import ConcMesas from './Componentes/ConcMesas/ConcMesas';
import FrmConcMesas from './Componentes/ConcMesas/FrmConcMesas';
import ModificrConcMesas from './Componentes/ConcMesas/ModificrConcMesas';
import ConcJigsSec from './Componentes/ConcJigsSec/ConcJigsSec';
import FrmConcJigsSec from './Componentes/ConcJigsSec/FrmConcJigsSec';
import ModificarJigsSec from './Componentes/ConcJigsSec/ModificarJigsSec';
import Medios from './Componentes/Medios/Medios';
import AllMedios from './Componentes/Medios/AllMedios';
import FrmAllMedios from './Componentes/Medios/FrmAllMedios';
import ModificarAllMedios from './Componentes/Medios/ModificarAllMedios';
import Medios4 from './Componentes/Medios/Medios4';
import FrmMedios4 from './Componentes/Medios/FrmMedios4';
import ModificarMedios4 from './Componentes/Medios/ModificarMedios4';
import Medios3 from './Componentes/Medios/Medios3';
import FrmMedios3 from './Componentes/Medios/FrmMedios3';
import ModificarMedios3 from './Componentes/Medios/ModificarMedios3';
import GranoPMoler from './Componentes/GranoPMoler/GranoPMoler';
import FrmGranoPMoler from './Componentes/GranoPMoler/FrmGranoPMoler';
import ModificarGranoPMoler from './Componentes/GranoPMoler/ModificarGranoPMoler';
import GranoJigsChino from './Componentes/GranoJigsChino/GranoJigsChino';
import FrmGranoJigs from './Componentes/GranoJigsChino/FrmGranoJigs';
import ModificarGranojigs from './Componentes/GranoJigsChino/ModificarGranojigs';
import Desensolvech from './Componentes/Desensolvech/Desensolvech';
import FrmDesensolvech from './Componentes/Desensolvech/FrmDesensolvech';
import ModificarDesensolvech from './Componentes/Desensolvech/ModificarDesensolvech';
import Desensolve from './Componentes/Desensolve/Desensolve';
import FrmDesensolve from './Componentes/Desensolve/FrmDesensolve';
import ModificarDesensolve from './Componentes/Desensolve/ModificarDesensolve';
import DesechoSeleccion from './Componentes/DesechoSeleccion/DesechoSeleccion';
import Desecho43 from './Componentes/DesechoSeleccion/Desecho43';
import FrmDesecho43 from './Componentes/DesechoSeleccion/FrmDesecho43';
import ModificarDesecho43 from './Componentes/DesechoSeleccion/ModificarDesecho43';
import Desecho39 from './Componentes/DesechoSeleccion/Desecho39';
import FrmDesecho39 from './Componentes/DesechoSeleccion/FrmDesecho39';
import ModificarDesecho39 from './Componentes/DesechoSeleccion/ModificarDesecho39';
import Baritron from './Componentes/Baritron/Baritron';
import FrmBaritron from './Componentes/Baritron/FrmBaritron';
import ModificarBaritron from './Componentes/Baritron/ModificarBaritron';
import TolvasMolinos from './Componentes/TolvasMolinos/TolvasMolinos';
import FrmTolvasMolinos from './Componentes/TolvasMolinos/FrmTolvasMolinos';
import ModificarTolvasMolinos from './Componentes/TolvasMolinos/ModificarTolvasMolinos';
import MP from './Componentes/ReporteExistencia/MP';
import FrmMezclasMLT from './Componentes/Mezclas/FrmMezclasMLT';
import MezclasMLE from './Componentes/Mezclas/MezclasMLE';
import MezclasMLT from './Componentes/Mezclas/MezclasMLT';

import MMezclas from './Componentes/Mezclas/MMezclas';
import FrmMezclasMLE from './Componentes/Mezclas/FrmMezclasMLE';
import ModificarMezclasMLE from './Componentes/Mezclas/ModificarMezclasMLE';
import ModificarMezclasMLT from './Componentes/Mezclas/ModificarMezclasMLT';
import MPatio from './Componentes/MPatio/MPatio';
import PatioMLE from './Componentes/MPatio/PatioMLE';
import PatioMLT from './Componentes/MPatio/PatioMLT';
import FrmPatioMLE from './Componentes/MPatio/FrmPatioMLE';
import FrmPatioMLT from './Componentes/MPatio/FrmPatioMLT';
import ModificarPatioMLE from './Componentes/MPatio/ModificarPatioMLE';
import ModificarPatioMLT from './Componentes/MPatio/ModificarPatioMLT';
import Triturada from './Componentes/Triturada/Triturada';
import TrituradaMLE from './Componentes/Triturada/TrituradaMLE';
import TrituradaMLT from './Componentes/Triturada/TrituradaMLT';
import TolvaG from './Componentes/Triturada/TolvaG';
import FrmTrituradaMLE from './Componentes/Triturada/FrmTrituradaMLE';
import FrmTrituradaMLT from './Componentes/Triturada/FrmTrituradaMLT';
import FrmTolvaG from './Componentes/Triturada/FrmTolvaG';
import ModificarTrituradaMLE from './Componentes/Triturada/ModificarTrituradaMLE';
import ModificarTrituradaMLT from './Componentes/Triturada/ModificarTrituradaMLT';
import ModificarTolvaG from './Componentes/Triturada/ModificarTolvaG';
import PdfExistencia from './Componentes/ReporteExistencia/PdfExistencia';
import Notas from './Componentes/Notas/Notas';
import FrmNotas from './Componentes/Notas/FrmNotas';
import ModificarNotas from './Componentes/Notas/ModificarNotas';




function App() {
  return (
   
    <BrowserRouter>
    <div className=''>
      <Menu>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/diario" element={<ReporteDiario />} />
        <Route path="/pdfdiario" element={<Pdf />} />


       /////////SILOS///////
       <Route path="/create" element={<FrmSilos/>}/>
       <Route path="/update/:id" element={<ModificarSilos/>}/>
       <Route path="/silos" element={<Silos/>}/>

       ////USUARIO/////////
       <Route path="/createusuario" element={<InsertarUsuario/>}/>

       /////////GRANOBANDAS/////
       <Route path="/creategrano" element={<FrmBandas/>}/>
       <Route path="/updategrano/:id" element={<ModificarGrano/>}/>
       <Route path="/granobandas" element={<GranoBandas/>}/>

       ////////SELECCION/////
       <Route path="/createseleccion" element={<FrmSeleccion/>}/>
       <Route path="/updateseleccion/:id" element={<ModificarSeleccion/>}/>
       <Route path="/seleccion" element={<Seleccion/>}/>

       ///////////CONC.P/MOLER/////////7
       <Route path="/createconcpmoler" element={<FrmPMoler/>}/>
       <Route path="/updateconcpmoler/:id" element={<ModificarCPMoler/>}/>
       <Route path="/concpmoler" element={<ConcPMoler/>}/>

       //////////REPORTESDIARIOS//////////7
       <Route path="/createreportediario" element={<FrmReporte/>}/>
       <Route path="/updatejigs/:id" element={<Modificarjigs/>}/>
       <Route path="/updatejigsch/:id" element={<Modificarjigsch/>}/>
       <Route path="/updatemesas/:id" element={<Modificarmesas/>}/>
       <Route path="/updategranoseleccion/:id" element={<Modificargrano/>}/>
       <Route path="/reporteexistencia" element={<ReporteExistencia/>}/>
         
         ////////////REPORTEEXISTENCIA////////
         <Route path="/existencia" element={<ReporteExistencia/>}/>
         <Route path="/pp" element={<PP/>}/>
         <Route path="/pt" element={<PT/>}/>
         <Route path="/mp" element={<MP/>}/>
         <Route path="/pdfexistencia" element={<PdfExistencia/>}/>




         ///////////////////granobaribright///
         <Route path="/granobaribright" element={<GranoBaribright/>}/>
         <Route path="/creategranobaribright" element={<FrmGranoBaribright/>}/>
         <Route path="/updategranobaribright/:id" element={<ModificarGranoBaribrigth/>}/>

         ///////////////////concentradobaribright///
         <Route path="/concentradobaribright" element={<ConcBaribright/>}/>
         <Route path="/createconcentradobaribaright" element={<FrmConcBaribright/>}/>
         <Route path="/updateconcentradobaribright/:id" element={<ModificarGranoBaribrigth/>}/>

          ////////////////////////////MOLIENDA//////
          <Route path="/molienda" element={<Molienda/>}/>
          <Route path="/mezclas" element={<Mezclas/>}/>
          <Route path="/createmezclasmolienda" element={<FrmMezclas/>}/>
          <Route path="/updatemezclasmolienda/:id" element={<ModificarMezclas/>}/>
          <Route path="/promedios" element={<Promedios/>}/>
          <Route path="/createpromedios" element={<FrmPromedios/>}/>
          <Route path="/updatepromedios/:id" element={<ModificarPromedios/>}/>
          <Route path="/pdfmolienda" element={<PdfMolienda/>}/>
         //////////conmesas////////////
         <Route path="/concmesas" element={<ConcMesas/>}/>
         <Route path="/createconcmesas" element={<FrmConcMesas/>}/>
         <Route path="/updateconcmesas/:id" element={<ModificrConcMesas/>}/>

         ////////////CONCJIGSSEC/////////
         <Route path="/concjigssec" element={<ConcJigsSec/>}/>
         <Route path="/createconcjigssec" element={<FrmConcJigsSec/>}/>
         <Route path="/updatenconcjigssec/:id" element={<ModificarJigsSec/>}/>


         /////////Medios//////////
         <Route path="/medios" element={<Medios/>}/>
         <Route path="/medios46" element={<AllMedios/>}/>
         <Route path="/createmedios46" element={<FrmAllMedios/>}/>
         <Route path="/updatemedios46/:id" element={<ModificarAllMedios/>}/>
         <Route path="/medios4" element={<Medios4/>}/>
         <Route path="/createmedios4" element={<FrmMedios4/>}/>
         <Route path="/updatemedios4/:id" element={<ModificarMedios4/>}/>
         <Route path="/medios3" element={<Medios3/>}/>
         <Route path="/createmedios3" element={<FrmMedios3/>}/>
         <Route path="/updatemedios3/:id" element={<ModificarMedios3/>}/>


         ////////////GRANOP/MOLER////////////
         <Route path="/granomoler" element={<GranoPMoler/>}/>
         <Route path="/creategranomoler" element={<FrmGranoPMoler/>}/>
         <Route path="/updategranomoler/:id" element={<ModificarGranoPMoler/>}/>

         /////////GRANOJIGS////////////
         <Route path="/granojigs" element={<GranoJigsChino/>}/>
         <Route path="/creategranojigs" element={<FrmGranoJigs/>}/>
         <Route path="/updategranojigs/:id" element={<ModificarGranojigs/>}/>

         /////////DESENSOLVECH////////////
         <Route path="/desensolvech" element={<Desensolvech/>}/>
         <Route path="/createdesensolvech" element={<FrmDesensolvech/>}/>
         <Route path="/updatedesensolvech/:id" element={<ModificarDesensolvech/>}/>
         /////////DESENSOLVE////////////
         <Route path="/desensolve" element={<Desensolve/>}/>
         <Route path="/createdesensolve" element={<FrmDesensolve/>}/>
         <Route path="/updatedesensolve/:id" element={<ModificarDesensolve/>}/>

         /////DESECHOSELECCION//////
         <Route path="/desechoseleccion" element={<DesechoSeleccion/>}/>
         <Route path="/desecho43" element={<Desecho43/>}/>
         <Route path="/createdesecho43" element={<FrmDesecho43/>}/>
         <Route path="/updatedesecho43/:id" element={<ModificarDesecho43/>}/>
         <Route path="/desecho39" element={<Desecho39/>}/>
         <Route path="/createdesecho39" element={<FrmDesecho39/>}/>
         <Route path="/updatedesecho39/:id" element={<ModificarDesecho39/>}/>

         /////////BARITRON////////////
         <Route path="/baritron" element={<Baritron/>}/>
         <Route path="/createbaritron" element={<FrmBaritron/>}/>
         <Route path="/updatebaritron/:id" element={<ModificarBaritron/>}/>

         /////////TOLVAS MOLINOS////////////
         <Route path="/tolvas" element={<TolvasMolinos/>}/>
         <Route path="/createtolvas" element={<FrmTolvasMolinos/>}/>
         <Route path="/updatetolvas/:id" element={<ModificarTolvasMolinos/>}/>

         ////////////////MP//////////
         <Route path="/mineral" element={<MMezclas/>}/>
         <Route path="/mmlt" element={<MezclasMLT/>}/>
         <Route path="/createmmlt" element={<FrmMezclasMLT/>}/>
         <Route path="/updatemmlt/:id" element={<ModificarMezclasMLT/>}/>
         <Route path="/mmle" element={<MezclasMLE/>}/>
         <Route path="/createmmle" element={<FrmMezclasMLE/>}/>
         <Route path="/updatemmle/:id" element={<ModificarMezclasMLE/>}/>

         <Route path="/patio" element={<MPatio/>}/>
         <Route path="/mpmle" element={<PatioMLE/>}/>
         <Route path="/creatempmle" element={<FrmPatioMLE/>}/>
         <Route path="/updatempmle/:id" element={<ModificarPatioMLE/>}/>
         <Route path="/mpmlt" element={<PatioMLT/>}/>
         <Route path="/creatempmlt" element={<FrmPatioMLT/>}/>
         <Route path="/updatempmlt/:id" element={<ModificarPatioMLT/>}/>

         <Route path="/triturada" element={<Triturada/>}/>
         <Route path="/tmle" element={<TrituradaMLE/>}/>
         <Route path="/tmlt" element={<TrituradaMLT/>}/>
         <Route path="/tolvag" element={<TolvaG/>}/>
         <Route path="/createtmle" element={<FrmTrituradaMLE/>}/>
         <Route path="/createtmlt" element={<FrmTrituradaMLT/>}/>
         <Route path="/createtolvag" element={<FrmTolvaG/>}/>
         <Route path="/updatetmle/:id" element={<ModificarTrituradaMLE/>}/>
         <Route path="/updatetmlt/:id" element={<ModificarTrituradaMLT/>}/>
         <Route path="/updatetolvag/:id" element={<ModificarTolvaG/>}/>
         <Route path="/notas" element={<Notas/>}/>
         <Route path="/createnotas" element={<FrmNotas/>}/>
         <Route path="/updatenotas/:id" element={<ModificarNotas/>}/>
       </Routes>
       </Menu >
      </div>
    
    </BrowserRouter>
     
  
     
    
  );
}

export default App;
