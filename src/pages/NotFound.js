import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Page from '../components/Page';
import Button from '../components/Button';
import useAuth from '../hooks/contexthooks/useAuth';

const NotFound = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    console.log(params)

    console.log()
    return (
        <Page
            name={'not-found'}
            hasHeader={false}
        >
            <div className='flex column align-center justify-center'>
                <div className='col-12 min-height-half flex column align-center gap-2'>
                    <h1 className='fs-500 color-primary'>404</h1>
                    <p>{`${params.prefix.includes('page') ? 'Page' : 'Product'} Not Found`}</p>
                    <Button
                        classList='btn color-light bg-primary'
                        handleClick={() => navigate('/', { replace: true })}
                        status={false}
                    >
                        {'Home Page'}
                    </Button>
                </div>
            </div>
        </Page>
    );
};

export default NotFound;