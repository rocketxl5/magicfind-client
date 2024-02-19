// source @ https://www.youtube.com/watch?v=5s57C7leXc4&list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf&index=3
import { Outlet, useLocation } from 'react-router-dom';
import MainHeader from '../layout/MainHeader';
import Footer from '../layout/Footer';
import useAuth from '../../hooks/useAuth';

const RootLayout = () => {
    const location = useLocation();
    const { isAuth } = useAuth();
    const path = location.pathname;

    return (
        <div className={`root-layout ${isAuth || path === '/login' || path === '/signup' ? 'bg-light' : 'bg-dark'}`}>

            {
                path === '/login' || path === '/signup' ? (

                    <Outlet />

                ) : (
                    <>
                            <MainHeader />

                            <Outlet />

                            <Footer />
                    </>
                )
            }
        </div>
    )
}

export default RootLayout
