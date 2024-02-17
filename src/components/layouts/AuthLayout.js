import { Outlet } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

const AuthLayout = () => {

    return (
        <div className="auth-layout">
            <div className="content">
                <Breadcrumbs />
                <Outlet />
            </div>
        </div>


    )
}

export default AuthLayout