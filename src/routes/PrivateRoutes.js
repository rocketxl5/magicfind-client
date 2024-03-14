import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/contexthooks/useAuth';

// Requires authentication
const PrivateRoutes = () => {
    const { isAuth } = useAuth();

    return isAuth && <Outlet />
}

export default PrivateRoutes;
