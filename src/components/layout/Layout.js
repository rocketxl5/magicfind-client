
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    const location = useLocation()

    return (
        <div className="wrapper">
            {location.pathname !== '/login' && location.pathname !== '/signup' && <Header />}
            <div className="container">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout
