import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoutes = () => {
    // const navigate = useNavigate();
    const { auth } = useAuth();


    return (
        auth ? <Outlet /> : <Navigate to="/login" replace />
    )
}

export default PrivateRoutes;
