import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireNotAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    return (
        auth ?
            <Navigate to='/me' state={{ from: location }} replace /> :
            <Outlet />
    )
}

export default RequireNotAuth;