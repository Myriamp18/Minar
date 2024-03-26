import { useNavigate } from 'react-router-dom'
import { useAuth } from './auth'

export const CerrarSesion = (logout) => {
 
  return <div> 
  <button onClick={logout}> Cerrar Sesion</button>
  </div>
}

export default CerrarSesion
