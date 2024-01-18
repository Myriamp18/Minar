
import './App.css';
import Login from './Componentes/Usuarios/Login'
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import Inicio from './Componentes/Inicio'
import FrmSilos from './Componentes/Silos/FrmSilos';

import ModificarSilos from './Componentes/Silos/ModificarSilos';
import InsertarUsuario from './Componentes/Usuarios/InsertarUsuario';




function App() {
  return (
   
    <Router>
    
       <Routes>
       <Route path="/" element={<Login />}/>
       <Route path="/Inicio" element={<Inicio/>}/>
       <Route path="/create" element={<FrmSilos/>}/>
       <Route path="/update/:id" element={<ModificarSilos/>}/>
       <Route path="/createusuario" element={<InsertarUsuario/>}/>
       
       
         
       
       </Routes>
    </Router>
     
  
     
    
  );
}

export default App;
