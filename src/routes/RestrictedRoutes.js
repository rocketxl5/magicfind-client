import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/contexthooks/useAuth';

// Must be Unauthenticated
const RestrictedRoutes = () => {
    const { isAuth } = useAuth();

    return !isAuth ? <Outlet /> : <Navigate to={'/me'} replace />
}

export default RestrictedRoutes;