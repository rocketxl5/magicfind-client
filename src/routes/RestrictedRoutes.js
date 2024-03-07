import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/contexthooks/useAuth';

// Can't be accessed if authenticated
const RestrictedRoutes = () => {
    const { auth } = useAuth();

    return (
        <>
            {

                auth ? <Navigate to="/me" replace /> : <Outlet />
            }
        </>
    )
}

export default RestrictedRoutes;