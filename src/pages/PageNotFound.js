import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import Button from '../components/Button';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Page name={'not-found'}>
      <p>The page you requested does not exist</p>
      <Button
        classList='btn color-light bg-blue'
        handleClick={() => navigate('/', { replace: true })}
        status={false}
      >
        {'Back to Homepage'}
      </Button>
    </Page>
  );
};

export default PageNotFound;
