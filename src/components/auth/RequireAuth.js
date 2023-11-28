import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = () => {
    const { user } = useAuth();
    const location = useLocation();
    return (
        !user ?
            <Navigate to='/login' state={{ from: location }} replace /> :
            <Outlet user={user} />
    )
}

export default RequireAuth
