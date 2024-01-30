
import { useEffect, useContext } from 'react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Loading from './Loading';
import { SearchContext } from '../../contexts/SearchContext';

const AuthLayout = () => {
    const { loading } = useContext(SearchContext);
    const navigate = useNavigate();
    const param = useParams()['*'];

    // Updates each time pathname changes
    useEffect(() => {

        // If param is defined
        if (param === 'me') {
            navigate(`/${param}`, { replace: true })
        }
        else {
            localStorage.setItem('param', JSON.stringify(param));
        }
    }, [param])

    useEffect(() => {
        const param = JSON.parse(localStorage.getItem('param'))

        if (param) {
            navigate(`/${param}`, { replace: true });
        }
    }, [])

    return (
        <div className="auth-layout">
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
}

export default AuthLayout
