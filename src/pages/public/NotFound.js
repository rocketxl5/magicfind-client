import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Page from '../../components/Page';
import Button from '../../components/Button';
import useAuth from '../../hooks/contexthooks/useAuth';

const NotFound = () => {
    const [style, setStyle] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { isAuth } = useAuth();

    useEffect(() => {
        if (isAuth) {
            const style = ''
        }
    }, [])
    return (
        <Page
            name={'not-found'}
            hasHeader={false}
        >
            <div className='flex column align-center justify-center'>
                <div className='col-12 min-height-half flex column align-center gap-2'>
                    <h1 className='fs-500 color-primary'>404</h1>
                    <p>Sorry we could not find the page you requested</p>
                    <button
                        className='btn color-light bg-primary'
                        onClick={() => navigate('/', { replace: true })}
                        status={false}
                    >
                        {'Home Page'}
                    </button>
                </div>
            </div>
        </Page>
    );
};

export default NotFound;