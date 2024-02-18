import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../elements/Breadcrumbs';

const AuthLayout = () => {

    return (
        <div className="wrapper">
            <div className="content">
                <Breadcrumbs />
                <Outlet />
            </div>
        </div>


    )
}

export default AuthLayout