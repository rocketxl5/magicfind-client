import { useLocation, useParams } from 'react-router-dom';
import AuthContextualMenu from '../layout/AuthContextualMenu';
import Dashboard from './Dashboard';
import SearchCollection from './search/SearchCollection';
import SearchAPI from './search/SearchAPI';

const AuthPage = () => {
  const location = useLocation();
  const { path } = useParams();
  // console.log(location)
  return (
    <>
      <header>
        <AuthContextualMenu />
      </header>
      <div className="content">
        {
          path === 'dashboard' ?
            (
              <Dashboard />
            ) : path === 'collection' ? (
              <SearchCollection />
            ) : path === 'add-card' ? (
              <SearchAPI />
            ) : (
              <h1>Home</h1>
            )
        }
      {/* <main className="main">
        <section className="auth-card">
          <header className="header">

            <h2 className="title">Dashboard</h2>
          </header>
          <article>
            <p>Go to your collection to publish or modify your cards.</p>
          </article>
          <footer>


          </footer>
      </section>


        <section className="auth-card">
          <header className="header">

            <h2 className="title">Manage Collection</h2>
          </header>
          <article>
            <p></p>
          </article>
          <footer>


          </footer>
        </section>
        <section className="auth-card">
          <header className="header">

            <h2 className="title">Add Cards</h2>
          </header>
          <article>
            <p>
              Add a new card to your collection. Choose between the 20 000 + cards in the Magic The Gathering book.
            </p>
          </article>
          <footer>


          </footer>
        </section>
      </main> */}

    </div>
    </>
  );
};

export default AuthPage;
