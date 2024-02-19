import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const UnrestrictedLayout = () => {
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

export default UnrestrictedLayout
