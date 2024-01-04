import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from './Card';
import Modal from './Modal';
import useModal from '../../../hooks/useModal';
import useImageLoader from '../../../hooks/useImageLoader';

const SearchResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cards, searchType } = location.state || JSON.parse(localStorage.getItem('search-result'));
    const cardRef = useRef(null);


    useEffect(() => {
        // If cards is empty
        if (!cards.length) {
            setTimeout(() => {
                navigate('/search-collection')
            }, 1500)
        }
    }, [location]);

    const { imagesLoaded } = useImageLoader(cards)

    const [{ open, component }, { updateState }] = useModal(searchType, (value) => handleClick(value));

    function handleClick(e, card, attributes, ExpandedCard) {
        e.stopPropagation();
        updateState(e.target.id, card, attributes, ExpandedCard);
    }

    return (
        <>
            {
                <Modal open={open}>
                    {component}
                </Modal>
            }
            <header className="search-result-header">
                <button className="back-btn" type="button" onClick={() => {
                    searchType === 'search-collection' ? navigate('/me/collection') : navigate(-1);
                }}>Back To Search</button>
                <span className="space-1">
                    {
                        cards ?
                            `${cards.length} ${cards.length > 1 ? 'Results' : 'Result'}` :
                            'No results'
                    }
                </span>
            </header>
            <>
                <header className="header">
                    <h2 className="title">Search Results</h2>
                </header>
                <main className="main">
                    <div className="cards">
                        {
                            imagesLoaded &&
                            cards.map((card, index) => {
                                return (
                                    <Card
                                        key={index}
                                        card={card}
                                        searchType={searchType}
                                        handleClick={handleClick}
                                        ref={cardRef}
                                    />)
                            })
                        }
                    </div>
                </main>
            </>
        </>
    )
}

export default SearchResult;
