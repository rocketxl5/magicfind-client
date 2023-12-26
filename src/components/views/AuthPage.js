import { useParams, useNavigate, useLocation } from 'react-router-dom';
import CollectionView from './CollectionView';
import StoreView from './StoreView';
import AddCardView from './AddCardView';

const AuthPage = () => {
  const { path } = useParams();
  return (


    <div className="auth-content">

          {
            path === 'collection' ? (
              <CollectionView />
            ) : path === 'store' ? (
              <StoreView />
          ) : path === 'add-card' ? (
            <AddCardView />
            ) : (
                <>Home</>
            )
          }
        </div>

  )
}

export default AuthPage;
