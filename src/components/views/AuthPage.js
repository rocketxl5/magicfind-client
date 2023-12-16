import { Link } from 'react-router-dom';
// import { FiArrowRightCircle } from 'react-icons/fi';

const AuthPage = () => {

  return (
    <div className="content">
      <header className="header">

        <h2 className="title">User Page</h2>
      </header>
      <main className="main">
        <section className="auth-card">
          <header>
            <h2>Manage Your Collection</h2>
          </header>
          <article>
            <p>Go to your collection to publish or modify your cards.</p>
          </article>
          <footer>

            <Link to="/search-collection">Go To Collection</Link>
          </footer>
      </section>

        <section className="auth-card">
          <header>

          <h2>Add A New Card</h2>
          </header>
          <article>
            <p>
              Add a new card to your collection. Choose between the 20 000 + cards in the Magic The Gathering book.
            </p>
          </article>
          <footer>

            <Link to="/search-api">Go To Add Card</Link>
          </footer>
      </section>

        <section className="auth-card">

          <h2>Modify Your Profile</h2>
          <article>
            <p>This section is under currently under development.</p>
          </article>
      </section>
    </main>
      <footer>
        <Link to="/profile">Go To Profile</Link>

      </footer>
    </div>
  );
};

export default AuthPage;
