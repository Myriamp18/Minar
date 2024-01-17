
import './App.css';
import Login from './Componentes/Login'
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import Inicio from './Componentes/Inicio'
import FrmSilos from './Componentes/Silos/FrmSilos';

import ModificarSilos from './Componentes/Silos/ModificarSilos';




function App() {
  return (
   
    <Router>
    
       <Routes>
       <Route path="/" element={<Login />}/>
       <Route path="/Inicio" element={<Inicio/>}/>
       <Route path="/create" element={<FrmSilos/>}/>
       <Route path="/update/:id" element={<ModificarSilos/>}/>
       
       
         
       
       </Routes>
    </Router>
     
  
     
    
  );
}

export default App;
