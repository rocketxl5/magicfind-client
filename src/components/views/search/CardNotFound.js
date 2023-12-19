import { useParams, useNavigate } from 'react-router-dom';

const CardNotFound = () => {
    const { cardName } = useParams();
    const navigate = useNavigate();

    return (
        <div className="not-found">
            <header>
                <section className="banner not-found-banner"></section>
            </header>
            <main className="main">
                <h2>Oops!</h2>
                <p>No results were found for "{cardName}"</p>
            </main>
            <footer>
                <button className="not-found-btn" onClick={() => navigate(-1)}> Go Back </button>
            </footer>
        </div>
    )
}

export default CardNotFound
