import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireUnauth = () => {
    const { isAuth } = useAuth();
    const location = useLocation();
    return (
        isAuth ?
            <Navigate to='/me' state={{ from: location }} replace /> :
            <Outlet />
    )
}

export default RequireUnauth;