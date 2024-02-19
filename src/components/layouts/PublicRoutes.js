import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PublicRoutes = () => {
    const { isAuth } = useAuth();

    return (
        isAuth ? (
            <div className="auth-layout">
                <div className="wrapper">
                    <Outlet />
                </div>
            </div>
        ) : (
            <div className="layout">
                <Outlet />
            </div>
        )
    )
}

export default PublicRoutes
