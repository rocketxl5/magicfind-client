import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Card from './Card';
import Modal from './Modal';
import useModal from '../../../hooks/useModal';
import NotFound from './CardNotFound';

const SearchResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cards, cardName, type, search } = location.state || JSON.parse(localStorage.getItem('search-result'));
    const [loadedCards, setLoadedCards] = useState(null);
    const cardRef = useRef(null);

    useEffect(() => {

        // If cards is not empty
        if (cards) {
            const preloadImages = (cards) => {
                const loadImage = card => {
                    return new Promise((resolve, reject) => {
                        const image = new Image();
                        const uri = card.image_uris ? card.image_uris.normal : card.card_faces[0].image_uris.normal
                        image.src = uri;
                        image.onload = () => resolve(card);
                        image.onerror = error => reject(error);
                    });
                }
                Promise.all(cards.map(card => loadImage(card)))
                    .then(() => {
                        setLoadedCards(cards);
                    })
                    .catch(error => console.log('Image load has failed', error))
            }
            // Call async image loader
            preloadImages(cards);
        }
        // else {
        // setTimeout(() => {
        //     navigate('/search-collection')
        // }, 1500)
        // }
    }, [])

    const [{ open, component }, { updateState }] = useModal((value) => handleClick(value));

    function handleClick(e, card, attributes, expandedCard) {
        e.stopPropagation();
        updateState(e.target.id, card, attributes, expandedCard);
    }

    return (
        <>
            <div className="search-result">
                {
                    <Modal open={open}>
                        {component}
                    </Modal>
                }
                <header className="search-result-header">

                    {type !== 'search-catalog' &&

                        <Link className="back-link" to={search}>Back to Search</Link>

                    }
                    <span className="space-1">
                            {
                                cards ?
                                `${cards.length} ${cards.length > 1 ? 'Results' : 'Result'}` :
                                    'No results'
                            }
                    </span>
                </header>
                {
                    type === 'card-not-found' ?
                        (
                            <NotFound cardName={cardName} />
                        ) : (
                            <div className="content">
                                <header className="header">

                                    <h2 className="title">Search Results</h2>
                                </header>
                                <main className="main">
                            <div className="cards">
                                        {
                                            loadedCards &&
                                            loadedCards.map((card, index) => {
                                                return (
                                                    <Card
                                                        key={index}
                                                        card={card}
                                                        searchType={type}
                                                        handleClick={handleClick}
                                                        ref={cardRef}
                                                    />)
                                            })
                                        }
                            </div>
                                </main>
                            </div>
                        )
                }
            </div>
        </>
    )
}

export default SearchResult;
