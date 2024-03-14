import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/contexthooks/useAuth';

// All access
const PublicRoutes = () => {
    const { isAuth } = useAuth();

    return (
        <div className={isAuth ? 'auth-layout' : 'layout'}>
            <Outlet />
        </div>
    )
}

export default PublicRoutes
