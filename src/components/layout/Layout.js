
import { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Banner from '../views/Banner';
import Footer from './Footer';
import Loading from './Loading';
import { SearchContext } from '../../contexts/SearchContext';
import data from '../../assets/data/BANNER';

const Layout = () => {
    const location = useLocation();
    const { loading } = useContext(SearchContext);
    const { home } = data;
    const { classList, title, link } = home;
    return (

        location.pathname === '/login' || location.pathname === '/signup' ? (
                <>
                    <div className="container">
                        <Outlet />
                </div>
                </>
            ) : (
                <div className="layout">
                    <Header />
                    <div className="container">
                        <Banner classList={classList} title={title} link={link} />
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
