// source @ https://www.youtube.com/watch?v=5s57C7leXc4&list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf&index=3
import { Outlet } from 'react-router-dom';
import MainHeader from '../layout/MainHeader';
import Footer from '../layout/Footer';

const RootLayout = () => {
    return (
        <div className="root-layout">
            <MainHeader />
            <Outlet />
            <Footer />
        </div>
    )
}

export default RootLayout
