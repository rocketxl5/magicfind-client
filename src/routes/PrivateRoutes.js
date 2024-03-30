import { Navigate, Outlet } from 'react-router-dom';

// Must be Authenticated
const PrivateRoutes = () => {
    return !localStorage.getItem('auth') ? <Navigate to={'/login'} replace /> : <Outlet />
}

export default PrivateRoutes;
