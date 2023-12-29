
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

        location.pathname === '/login' || location.pathname === '/signup' ? (
                <>
                    <div className="container">
                        <Outlet />
                </div>
                </>
            ) : (
                <div className="wrapper">
                    <Header />
                    <div className="container">
                        <div className="content">
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
                        </div>
                        <Footer />

                </div>
        )

    )
}

export default Layout
