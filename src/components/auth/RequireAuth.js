import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = () => {
    const { isAuth, auth } = useAuth();
    const location = useLocation();
    return (
        !isAuth ?
            <Navigate to='/login' state={{ from: location }} replace /> :
            <Outlet auth={auth} />
    )
}

export default RequireAuth;
