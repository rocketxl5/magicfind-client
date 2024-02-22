import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RestrictedRoutes = () => {
    const { auth } = useAuth();

    console.log(auth)
    return (

        <>
            {

                auth ? <Navigate to="/me" replace /> : <Outlet />
            }
        </>
    )
}

export default RestrictedRoutes;