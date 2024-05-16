import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import Button from '../../components/Button';

const NotFound = () => {

    const navigate = useNavigate();

    return (
        <Page
            name={'not-found'}
            hasHeader={false}
        >
            <div className='flex column align-center justify-center'>
                <div className='col-12 min-height-half flex column align-center gap-2'>
                    <h1 className='fs-500 color-primary'>404</h1>
                    <p>Sorry we could not find the page you requested</p>
                    <Button
                        id={'404'}
                        classList={'btn color-light bg-primary'}
                        handleClick={() => navigate('/', { replace: true })}
                    >
                        {'Home Page'}
                    </Button>
                </div>
            </div>
        </Page>
    );
};

export default NotFound;