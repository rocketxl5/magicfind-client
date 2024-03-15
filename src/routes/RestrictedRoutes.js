import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/contexthooks/useAuth';

// Can't be accessed if authenticated
const RestrictedRoutes = () => {
    const { isAuth } = useAuth();

    return !isAuth ? <Outlet /> : <Navigate to={'/me'} replace />
}

export default RestrictedRoutes;