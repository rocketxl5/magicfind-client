import { useNavigate } from 'react-router-dom';
import Button from '../layout/Button';
const NotFound = () => {
  const navigate = useNavigate();

  const attributes = {
    id: '',
    style: 'btn color-light bg-blue',
    type: 'button',
    value: 'Back to Homepage',
    status: false
  }

  const handleClick = () => {
    navigate('/', { replace: true })
  }
  return (
    <div className="content">
      <header className="header">

        <h2 className="title">404</h2>
      </header>
      <main className="main not-found">
        <p>The page you requested does not exist</p>
        <Button attributes={attributes} handleClick={handleClick} />
      </main>
    </div>
  );
};

export default NotFound;
