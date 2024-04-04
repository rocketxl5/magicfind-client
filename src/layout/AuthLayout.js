import { Outlet } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

const AuthLayout = () => {

    return (
        <div className="auth-layout">
            <Breadcrumbs />
            <Outlet />
        </div>
    )
}

export default AuthLayout