import { useParams, useNavigate, useLocation } from 'react-router-dom';

import Store from './Store';

import AuthContextualNav from '../layout/AuthContextualNav';
import SearchCollection from './search/SearchCollection';
import SearchApi from './search/SearchAPI';

const AuthPage = () => {
  const { path } = useParams();

  const views = [
    { title: 'Home', path: '../me/home' },
    { title: 'Collection', path: '../me/collection' },
    { title: 'Store', path: '../me/store' },
    { title: 'Add Card', path: '../me/add-card' },
  ]

  return (
    <>
      <div className="buffer"></div>
      <aside>
        <AuthContextualNav views={views} />
      </aside>
      <div className="auth-content">
          {
            path === 'collection' ? (
            <SearchCollection />
          ) : path === 'store' ? (
              <Store />
          ) : path === 'add-card' ? (
            <SearchApi />
          ) : (
            <>Home</>
          )
        } 
        </div>
    </>
  )
}

export default AuthPage;
