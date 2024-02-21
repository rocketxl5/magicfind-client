import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoutes = () => {
    const navigate = useNavigate();
    const { isAuth } = useAuth();

    useEffect(() => {
        if (!isAuth) {
            navigate('/home', { replace: true })
        }
    }, [])

    return (
        isAuth && <Outlet />
    )
}

export default ProtectedRoutes;
