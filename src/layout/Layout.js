import { Outlet, useLocation } from 'react-router-dom';
import Banner from './Banner';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import useSearch from '../hooks/useSearch';
import data from '../data/BANNERS.json';

const Layout = () => {
    const location = useLocation();
    const { loading } = useSearch();
    const path = location.pathname;

    return (

        <div className="layout">
            {
                data[path] &&
                <Banner
                        classList={data[path].styles.banner}
                    >
                        {data[path].link &&
                            <Link className={data[path].styles.link} to={data[path].link}>
                                {data[path].title}
                            </Link>
                        }
                    </Banner>
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
