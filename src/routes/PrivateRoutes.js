import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// Requires authentication
const PrivateRoutes = () => {
    const { auth } = useAuth();

    return (
        auth ? <Outlet /> : <Navigate to="/login" replace />
    )
}

export default PrivateRoutes;
