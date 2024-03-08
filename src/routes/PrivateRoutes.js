import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/contexthooks/useAuth';

// Requires authentication
const PrivateRoutes = () => {
    const { isAuth } = useAuth();

    return (
        isAuth ? <Outlet /> : <Navigate to="/login" replace />
    )
}

export default PrivateRoutes;
