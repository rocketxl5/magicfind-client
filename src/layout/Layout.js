import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Banner from './Banner';
import Loader from './Loader';
import useSearchContext from '../hooks/contexthooks/useSearchContext';
import data from '../data/BANNERS.json';

const Layout = () => {
    const location = useLocation();
    const { loading } = useSearchContext();
    const path = location.pathname;

    return (

        <div className="layout">

                    <>
                        {
                            data[path] &&
                            <Banner
                                    classList={data[path]?.classList.banner}
                            >
                                {data[path].link &&
                                        <Link className={data[path]?.classList.link} to={data[path]?.link}>
                                        {data[path].title}
                                    </Link>
                                }
                            </Banner>
                        }
                        {/* <Breadcrumbs />    */}

                        <Outlet />
                    </>




        </div>

    )
}

export default Layout
