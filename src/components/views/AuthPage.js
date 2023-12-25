import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AuthContextualMenu from '../layout/AuthContextualMenu';
import DashboardView from './DashboardView';
import CollectionView from './CollectionView';
import StoreView from './StoreView';

const AuthPage = () => {
  const { path } = useParams();

  const paths = [
    'Dashboard',
    'Collection',
    'Store'
  ];

  return (
    <>
      <div className="content">
        <div className="auth-page">
          <header>
            <AuthContextualMenu paths={paths} />
          </header>
          {
            path === 'collection' ? (
              <CollectionView />
            ) : path === 'store' ? (
              <StoreView />
            ) : path === 'dashboard' ? (
              <DashboardView />
            ) : (
                    <h1>Home</h1>
            )
          }
        </div>
    </div>
    </>
  );
};

export default AuthPage;
