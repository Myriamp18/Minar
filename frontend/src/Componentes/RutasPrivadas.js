import {Navigate,Outlet} from 'react-router-dom'

export const RutasPrivadas = ({ children, redirectTo="/" }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      // Si el usuario no está autenticado, redirige a la ruta especificada (por defecto, la página de inicio de sesión)
      return <Navigate to={redirectTo} />;
    }
  
    // Si el usuario está autenticado, renderiza las rutas protegidas o cualquier otro componente pasado como hijo
    return children ? children : <Outlet />;
  }
  