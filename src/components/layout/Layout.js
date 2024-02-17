
import { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MainHeader from './MainHeader';
import Banner from '../views/Banner';
import Footer from './Footer';
import Loading from './Loading';
import Breadcrumbs from './Breadcrumbs';
import { SearchContext } from '../../contexts/SearchContext';
import data from '../../assets/data/BANNERS';

const Layout = () => {
    const location = useLocation();
    const { loading } = useContext(SearchContext);
    const path = location.pathname;

    return (

        location.pathname === '/login' || location.pathname === '/signup' ? (
                <>
                    <div className="container">
                        <Outlet />
                </div>
                </>
            ) : (
                <div className="layout">
                    <MainHeader />
                    <div className="container">
                        {
                            data[path] &&
                            <Banner
                                classList={data[path].classList}
                                title={data[path].title}
                                link={data[path].link} />
                        }
                        {/* <Breadcrumbs />    */}
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
