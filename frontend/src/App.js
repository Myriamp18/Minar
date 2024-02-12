
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
         
       
       </Routes>
       </Menu >
      </div>
    
    </BrowserRouter>
     
  
     
    
  );
}

export default App;
