import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RestrictedRoutes = () => {
    const navigate = useNavigate();
    const { isAuth } = useAuth();

    useEffect(() => {
        if (isAuth) {
            navigate('/me', { replace: true });
        }
    }, [])

    return (
        !isAuth && <Outlet />
    )
}

export default RestrictedRoutes;