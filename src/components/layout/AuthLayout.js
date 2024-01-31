
import { useEffect, useContext } from 'react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import Header from './Header';
import AuthContextualNav from './AuthContextualNav';
import Footer from './Footer';
import Loading from './Loading';
import { SearchContext } from '../../contexts/SearchContext';

const AuthLayout = () => {
    const { loading } = useContext(SearchContext);
    const navigate = useNavigate();
    const param = useParams()['*'];

    const views = [
        { title: 'Dashboard', id: 'dashboard', path: '/me/dashboard' },
        { title: 'Collection', id: 'collection', path: '/me/collection' },
        { title: 'Store', id: 'store', path: '/me/store' },
        { title: 'Add Card', id: 'add-card', path: '/me/add-card' },
    ]

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
            <section className="contextual-nav">
                <AuthContextualNav views={views} />
            </section>
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
