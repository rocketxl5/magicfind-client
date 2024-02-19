import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../elements/Breadcrumbs';

const AuthLayout = () => {

    return (
        <div className="auth-layout">
            <Breadcrumbs />
            <div className="wrapper">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout