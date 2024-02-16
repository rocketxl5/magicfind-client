
import { Outlet } from 'react-router-dom';
import MainHeader from './MainHeader';
import Breadcrumbs from './Breadcrumbs';
import Footer from './Footer';

const AuthLayout = () => {

    return (
        <div className="auth-layout">
            <MainHeader />
            <div className="container">
                <div className="content">
                    <Breadcrumbs />              
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AuthLayout
