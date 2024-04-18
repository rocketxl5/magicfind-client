import { Outlet, useLocation } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

const AuthLayout = () => {
    const { pathname } = useLocation();

    return (
        <div className="auth-layout">
            {/* No breadcrumbs @ ShoppingCart &&  Product */}
            {(!pathname.includes('shopping-cart') && !pathname.includes('product')) && < Breadcrumbs />}
            <Outlet />
        </div>
    )
}

export default AuthLayout