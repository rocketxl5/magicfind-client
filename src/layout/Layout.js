import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Banner from './Banner';
import Loader from './Loader';
import useSearch from '../hooks/contexthooks/useSearch';
import data from '../data/BANNERS.json';

const Layout = () => {
    const location = useLocation();
    const { loading } = useSearch();
    const path = location.pathname;

    return (

        <div className="layout">
            {
                loading ?
                    <Loader />
                    :
                    <>
                        {
                            data[path] !== undefined &&
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

                        <Outlet />
                    </>
            }



        </div>

    )
}

export default Layout
