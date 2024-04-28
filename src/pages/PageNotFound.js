import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import Button from '../components/Button';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Page
      name={'not-found'}
      hasHeader={false}
    >
      <div className='flex column align-center justify-center'>

        <div className='col-12 min-height-half flex column align-center gap-2'>
          <h1 className='fs-500 color-primary'>404</h1>
          <p>The page you requested does not exist</p>
          <Button
            classList='btn color-light bg-primary'
            handleClick={() => navigate('/', { replace: true })}
            status={false}
          >
            {'Back to Homepage'}
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default PageNotFound;
