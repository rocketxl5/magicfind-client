import { useNavigate } from 'react-router-dom';
// import { FiArrowRightCircle } from 'react-icons/fi';

const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="content auth-page">
      <header className="auth-header">
        <div className='tabs'>
          <button className="tab" type="button" onClick={() => { navigate('/me') }}>Dashboard</button>
          <button className="tab" type="button" onClick={() => { navigate('/search-collection') }}>Collection</button>
          <button className="tab" type="button" onClick={() => { navigate('/search-api') }}>New Card</button>
        </div>
      </header>
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
  );
};

export default AuthPage;
