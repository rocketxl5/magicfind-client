import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RestrictedRoutes = () => {
    const { isAuth } = useAuth();

    return (
        !isAuth && <Outlet />
    )
}

export default RestrictedRoutes;