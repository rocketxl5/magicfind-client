import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { PathContext } from '../../contexts/PathContext';

const Layout = () => {
    const { pathname } = useContext(PathContext);
    return (
        <>
            {(pathname !== '/login' && pathname !== '/signup') && <Header />}
            <main className="wrapper">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout
