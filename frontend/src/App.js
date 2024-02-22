
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
       </Routes>
       </Menu >
      </div>
    
    </BrowserRouter>
     
  
     
    
  );
}

export default App;
