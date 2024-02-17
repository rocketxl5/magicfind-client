// source @ https://www.youtube.com/watch?v=5s57C7leXc4&list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf&index=3
import { Outlet, useLocation } from 'react-router-dom';
import MainHeader from '../layout/MainHeader';
import Footer from '../layout/Footer';

const RootLayout = () => {
    const location = useLocation();

    return (
        <div className="root-layout">
            {
                location.pathname === '/login' || location.pathname === '/signup' ? (
                    <Outlet />
                ) : (
                    <>
                            <MainHeader />
                            <div className="container">
                                <Outlet />
                            </div>
                            <Footer />
                    </>
                )
            }
        </div>
    )
}

export default RootLayout
