import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = () => {
    const { isAuth } = useAuth();

    return (
        isAuth && <Outlet />
    )
}

export default RequireAuth;
