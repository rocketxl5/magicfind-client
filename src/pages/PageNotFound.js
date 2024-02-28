import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="content">
      <header className="header">

        <h2 className="title">PageNotFound</h2>
      </header>
      <main className="main not-found">
        <p>The page you requested does not exist</p>
        <Button id={''} classList={'btn color-light bg-blue'} type={'button'} text={'Back to Homepage'} handleClick={() => navigate('/')} status={false} />
      </main>
    </div>
  );
};

export default PageNotFound;
