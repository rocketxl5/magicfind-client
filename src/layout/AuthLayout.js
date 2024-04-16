import { Outlet, useLocation } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

const AuthLayout = () => {
    const { pathname } = useLocation();

    return (
        <div className="auth-layout">
            {/* No breadcrumbs @ shopping cart view */}
            {!pathname.includes('shopping-cart') && < Breadcrumbs />}
            <Outlet />
        </div>
    )
}

export default AuthLayout