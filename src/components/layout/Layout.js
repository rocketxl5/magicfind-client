
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    const location = useLocation()

    return (
        <>
            {location.pathname !== '/login' && location.pathname !== '/signup' && <Header />}
            <div className="wrapper">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout
