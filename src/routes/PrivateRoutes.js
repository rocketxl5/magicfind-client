import { Navigate, Outlet } from 'react-router-dom';

// Must be Authenticated
const PrivateRoutes = () => {
    console.log(localStorage.getItem('auth'))
    return !localStorage.getItem('auth') ? <Navigate to={'/login'} replace /> : <Outlet />
}

export default PrivateRoutes;
