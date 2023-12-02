import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import Card from './Card';
import NotFound from './NotFound';
import capitalizeString from '../../../utilities/capitalizeString';

const SearchResult = () => {
    const location = useLocation();
    const { cards, cardName, type, search } = location.state;
    const [loadImages, setLoadImages] = useState(false);
    console.log(location.state)

    useEffect(() => {
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
                        setLoadImages(false)
                    })
                    .catch(error => console.log('Image load has failed', error))
            }
            preloadImages(cards);
        }
    }, [cards])
    return (
        <>
            <div className="search-result">
                <header className="search-result-header">
                    {type !== 'search-catalog' &&
                        <div className="back-link">
                            <Link to={search}>{<FiChevronLeft />} Back to Search</Link>
                        </div>
                    }
                    <div className="search-result-info">
                        <h3>{cardName ? capitalizeString(cardName) : 'Search Results'}</h3>
                        <span>
                            {
                                cards ?
                                    `${cards.length} ${cards.length > 1 ? 'Cards' : 'Card'}` :
                                    'No results'
                            }
                        </span>
                    </div>
                </header>
                {
                    type === 'not-found' ?
                        (
                            <NotFound cardName={cardName} />
                        ) : (
                            <div className="cards">
                                {!loadImages &&
                                    cards.map((card, index) => {
                                        return (
                                            <Card
                                                key={index}
                                                card={card}
                                                searchType={type}
                                            />)
                                    })
                                }
                            </div>
                        )
                }
            </div>
        </>
    )
}

export default SearchResult;
