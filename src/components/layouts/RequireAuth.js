import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = () => {
    const { isAuth } = useAuth();
    const location = useLocation();
    return (
        !isAuth ?
            //     <Navigate to='/' replace /> :
            <Navigate to='/login' state={{ from: location }} replace /> :
            <Outlet />
    )
}

export default RequireAuth;
