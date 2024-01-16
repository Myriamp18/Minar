
import './App.css';
import Login from './Componentes/Login'
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import Inicio from './Componentes/Inicio'




function App() {
  return (
    <div>
    <Router>
    
       <Routes>
       <Route path="/" element={<Login />}/>
       <Route path="/Inicio" element={<Inicio/>}/>
       
         
       
       </Routes>
    </Router>
     
   </div>
     
    
  );
}

export default App;
