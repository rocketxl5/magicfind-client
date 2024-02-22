import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const PageNotFound = () => {
  const navigate = useNavigate();

  const attributes = {
    id: '',
    style: 'btn color-light bg-blue',
    type: 'button',
    value: 'Back to Homepage',
    status: false
  }

  const goBack = (e) => {
    console.log(e.target)
    navigate('/');
  }
  return (
    <div className="content">
      <header className="header">

        <h2 className="title">PageNotFound</h2>
      </header>
      <main className="main not-found">
        <p>The page you requested does not exist</p>
        <Button attributes={attributes} handleClick={goBack} />
      </main>
    </div>
  );
};

export default PageNotFound;
