import { useState, useEffect, useContext, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Product from './Product';
import Parameter from './Parameter';
import Modal from '../modal/Modal';
import { ScrollContext } from '../../../contexts/ScrollContext';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";
import useModalState from '../../../hooks/useModalState';
import useLoadImage from '../../../hooks/useLoadImage';
import useModalView from '../../../hooks/useModalView';
import useProduct from '../../../hooks/useProduct';
import getCardImgUrls from '../../../assets/utilities/getCardImgUrls';
import data from '../../../assets/data/SEARCH';

const SearchResult = () => {
    // States
    const [urls, setUrls] = useState(null);
    const [searchFeatures, setSearchFeatures] = useState(false);
    // Refs
    const cardRef = useRef(null);
    const panelRef = useRef(null);
    const iconRef = useRef(null);
    // Context
    const { btnRef } = useContext(ScrollContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { cards, searchType } = location.state?.result || JSON.parse(localStorage.getItem('search-result'));


    useEffect(() => {

        // If cards is empty
        if (!cards.length) {
            // Send to collection view
            navigate('/me/collection');

        } else {
            const urls = getCardImgUrls(cards)
            // console.log(urls);
            if (urls) {
                setUrls(urls);
            }
        }
    }, [location]);

    useEffect(() => {
        if (searchFeatures) {
            document.body.classList.add('scroll-none');
            panelRef.current?.classList.add('move-panel');
            btnRef.current?.classList.add('move-btn');
            iconRef.current?.classList.add('rotate-icon');
        } else {
            document.body.classList.remove('scroll-none');
            panelRef.current?.classList.remove('move-panel');
            btnRef.current?.classList.remove('move-btn');
            iconRef.current?.classList.remove('rotate-icon');
        }
    }, [searchFeatures]);

    const { imagesLoaded } = useLoadImage(urls);

    const [view, updateCardView] = useModalView(handleCardView);

    const [state, updateCardState] = useModalState(searchType, handleCardState);

    // const [products] = useProduct(cards, searchType)

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
            {/* <div className="search-count">
                <div className="inner">
                {
                    searchType !== 'search-catalog' &&
                    <button
                        className="back-btn"
                        type="button"
                                onClick={() => {
                                navigate(-1);
                        }}>
                            Go Back
                    </button>}
                <span className="space-1">
                    {
                        cards ?
                            `${cards.length} ${cards.length > 1 ? 'Results' : 'Result'}` :
                            'No results'
                    }
                </span>
                </div>
            </div> */}

            <div className="search-result">
                {/* <header className="header">
                    <h2 className="title">Search Results</h2>
                </header> */}
                <aside className="parameters" >
                    <div className="parameters-container">
                        <ul className="parameters-list" ref={panelRef}>
                            {

                                data.parameters.map((parameter, i) => {
                                    return <Parameter key={i} parameter={parameter} />
                                })
                            }
                        </ul>

                        <button className="parameters-btn" type="button" onClick={() => setSearchFeatures(!searchFeatures)} ref={btnRef}><span className="parameters-icon" ref={iconRef}><FiPlus /></span></button>
                    </div>
                </aside>
                <main className="products">
                        <ul>
                        {
                            imagesLoaded &&
                                cards.map((card, i) => {
                                    return (
                                        <Product
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
                        </ul>

                </main>
            </div>

        </>
    )
}

export default SearchResult;
