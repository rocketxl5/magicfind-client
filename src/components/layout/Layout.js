
import { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Loading from './Loading';
import { SearchContext } from '../../contexts/SearchContext';

const Layout = () => {
    const location = useLocation();
    const { loading } = useContext(SearchContext);

    return (
        <div className="wrapper">
            {location.pathname !== '/login' && location.pathname !== '/signup' && <Header />}
            <div className="container">
                {
                    !loading ? (
                        <Outlet />
                    ) : (
                        <div className="loading-content">
                            <Loading />
                        </div>
                        )
                }
            </div>
            <Footer />
        </div>
    )
}

export default Layout
