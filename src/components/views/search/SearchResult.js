import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import Card from './Card';
import Modal from './Modal';
import useModal from '../../../hooks/useModal';
import NotFound from './CardNotFound';
import capitalizeString from '../../../utilities/capitalizeString';

const SearchResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cards, cardName, type, search } = location?.state;
    const [haveLoaded, setHaveLoaded] = useState(false);

    const cardRef = useRef(null);

    useEffect(() => {
        // If cards is not empty
        if (cards?.length) {
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
                        setHaveLoaded(true)
                    })
                    .catch(error => console.log('Image load has failed', error))
            }
            // Call normal image async loader
            preloadImages(cards);
        }
            // No cards collection
            // Send back to search-collection page
        else {
            setTimeout(() => {
                navigate('/search-collection')
            }, 1500)
        }
    }, [location])


    const [{ open, component }, { updateState }] = useModal();

    const handleClick = (e, card, attributes, expandedCard) => {
        e.stopPropagation();
        updateState(e.target.id, card, attributes, expandedCard, (value) => handleClick(value));
    }

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'scroll';

        }
    }, [open])

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
                    type === 'card-not-found' ?
                        (
                            <NotFound cardName={cardName} />
                        ) : (
                            <div className="cards">
                                {haveLoaded &&
                                    cards.map((card, index) => {
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
                        )
                }
            </div>
        </>
    )
}

export default SearchResult;
