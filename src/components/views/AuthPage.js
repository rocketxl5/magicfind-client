import { useParams } from 'react-router-dom';
import Store from './Store';
import AuthContextualNav from '../layout/AuthContextualNav';
import AuthLanding from './AuthLanding';
import SearchCollection from './search/SearchCollection';
import SearchApi from './search/SearchAPI';
const AuthPage = () => {
  const { path } = useParams()

  const views = [
    { title: 'Home', id: 'home', path: '../me/home' },
    { title: 'Collection', id: 'collection', path: '../me/collection' },
    { title: 'Store', id: 'store', path: '../me/store' },
    { title: 'Add Card', id: 'add-card', path: '../me/add-card' },
  ]

  return (
    <>
        <section className="contextual-nav">
          <AuthContextualNav views={views} />
        </section>
          {
            path === 'collection' ? (
            <SearchCollection path={path} />
          ) : path === 'store' ? (
              <Store path={path} />
          ) : path === 'add-card' ? (
                <SearchApi path={path} />
          ) : (
                  <AuthLanding />
          )
      } 
    </>
  )
}

export default AuthPage;
