import { Outlet } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import DashboardNav from './DashboardNav';

const AuthLayout = () => {

    return (
        <div className="auth-layout">
            <DashboardNav />
            <Breadcrumbs />
            <Outlet />
        </div>
    )
}

export default AuthLayout