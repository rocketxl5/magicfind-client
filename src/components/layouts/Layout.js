import { Outlet, useLocation } from 'react-router-dom';
import Banner from '../elements/Banner';
import Loading from '../elements/Loading';
import useSearch from '../../hooks/useSearch';
import data from '../../assets/data/BANNERS';

const Layout = () => {
    const location = useLocation();
    const { loading } = useSearch();
    const path = location.pathname;

    return (

        <div className="layout">
                        {
                            data[path] &&
                            <Banner
                                classList={data[path].classList}
                                title={data[path].title}
                                link={data[path].link} />
                        }
                        {/* <Breadcrumbs />    */}

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

    )
}

export default Layout
