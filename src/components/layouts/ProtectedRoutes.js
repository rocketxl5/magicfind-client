import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoutes = () => {
    const { isAuth } = useAuth();

    return (
        isAuth && <Outlet />
    )
}

export default ProtectedRoutes;
