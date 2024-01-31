import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchItem from './SearchItem';
import Modal from '../modal/Modal';
import useModalState from '../../../hooks/useModalState';
import useLoadImage from '../../../hooks/useLoadImage';
import useModalView from '../../../hooks/useModalView';
import getCardImgUrls from '../../../assets/utilities/getCardImgUrls';

const SearchResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cards, searchType } = location.state || JSON.parse(localStorage.getItem('search-result'));
    const cardRef = useRef(null);

    useEffect(() => {
        console.log(cards.length)
        // If cards is empty
        if (!cards.length) {

            navigate('/me/collection');

        }
    }, [location]);

    const { imagesLoaded } = useLoadImage(getCardImgUrls(cards))

    const [view, updateCardView] = useModalView(handleCardView);

    const [state, updateCardState] = useModalState(searchType, handleCardState);

    function handleCardView(e, layout, expandedImage) {
        e.stopPropagation();
        updateCardView(layout, expandedImage)
    }

    function handleCardState(e, card, imgAttributes) {
        e.stopPropagation();
        updateCardState(e.target.id, card, imgAttributes)
    }

    return (
        <>
            {
                <Modal open={view.open}>
                    {view.component}
                </Modal>
            }
            {
                <Modal open={state.open}>
                    {state.component}
                </Modal>
            }
            <header className="search-result-header">
                {
                    searchType !== 'search-catalog' &&
                    <button
                        className="back-btn"
                        type="button"
                        onClick={() => {
                            searchType === 'search-collection' ?
                                navigate('/me/collection') :
                                navigate(-1);
                        }}>
                        Back To Search
                    </button>}
                <span className="space-1">
                    {
                        cards ?
                            `${cards.length} ${cards.length > 1 ? 'Results' : 'Result'}` :
                            'No results'
                    }
                </span>
            </header>

            <div className="search-result">
                <header className="header">
                    <h2 className="title">Search Results</h2>
                </header>
                <main className="main">
                        {
                            imagesLoaded &&
                        cards.map((card, i) => {
                                return (
                                    <SearchItem
                                        key={i}
                                        index={i}
                                        card={card}
                                        searchType={searchType}
                                        handleCardView={handleCardView}
                                        handleCardState={handleCardState}
                                        ref={cardRef}
                                    />)
                            })
                    }
                </main>
            </div>
        </>
    )
}

export default SearchResult;
