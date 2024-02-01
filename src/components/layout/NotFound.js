import { useNavigate } from 'react-router-dom';
import Button from './Button';
import useAuth from '../../hooks/useAuth';

const NotFound = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const attributes = {
    id: '',
    style: 'btn color-light bg-blue',
    type: 'button',
    value: 'Back to Homepage',
    status: false
  }

  const goBack = (e) => {
    console.log(e.target)
    navigate('/me/');
  }
  return (
    <div className="content">
      <header className="header">

        <h2 className="title">404</h2>
      </header>
      <main className="main not-found">
        <p>The page you requested does not exist</p>
        <Button attributes={attributes} handleClick={goBack} />
      </main>
    </div>
  );
};

export default NotFound;