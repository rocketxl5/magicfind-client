import { useLocation, Navigate, Outlet } from 'react';
import useAuth from '../../hooks/useAuth';

const RequireAuth = () => {
    const { user } = useAuth;
    const location = useLocation();
    console.log(user)
    return (
        !user ?
            <Navigate to='/login' state={{ from: location }} replace /> :
            <Outlet />
    )
}

export default RequireAuth
