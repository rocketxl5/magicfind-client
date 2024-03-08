import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/contexthooks/useAuth';

// All access
const PublicRoutes = () => {
    const { isAuth } = useAuth();

    return (
        isAuth ? (
            <div className="auth-layout">
                <Outlet />
            </div>
        ) : (
            <div className="layout">
                <Outlet />
            </div>
        )
    )
}

export default PublicRoutes
