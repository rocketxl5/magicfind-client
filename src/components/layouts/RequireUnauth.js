import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireUnauth = () => {
    const { isAuth } = useAuth();

    return (
        !isAuth && <Outlet />
    )
}

export default RequireUnauth;