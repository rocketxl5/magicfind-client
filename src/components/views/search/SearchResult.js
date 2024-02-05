import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Product from './Product';
import Parameter from './Parameter';
import Modal from '../modal/Modal';
import useModalState from '../../../hooks/useModalState';
import useLoadImage from '../../../hooks/useLoadImage';
import useModalView from '../../../hooks/useModalView';
import useProduct from '../../../hooks/useProduct';
import getCardImgUrls from '../../../assets/utilities/getCardImgUrls';
import data from '../../../assets/data/SEARCH';

const SearchResult = () => {
    const [urls, setUrls] = useState(null);
    const [offset, setOffset] = useState(0);
    const [openParameters, setOpenParameters] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { cards, searchType } = location.state?.result || JSON.parse(localStorage.getItem('search-result'));
    const cardRef = useRef(null);
    const ulRef = useRef(null);
    const tabRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > offset) {
                tabRef.current?.classList.add('move-tab-right');
            }
            else {
                tabRef.current?.classList.remove('move-tab-right');
            }
            setOffset(window.scrollY);


        }
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {

        console.log(location.state)
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
        if (openParameters) {
            document.body.classList.add('scroll-none');
            ulRef.current?.classList.add('move-panel-left');
            tabRef.current?.classList.add('move-tab-left');
        } else {
            document.body.classList.remove('scroll-none');
            ulRef.current?.classList.remove('move-panel-left');
            tabRef.current?.classList.remove('move-tab-left');
        }
    }, [openParameters]);

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

                <aside className="parameters" >
                    <div className="parameters-container">
                        <ul className="parameters-list" ref={ulRef}>
                            {

                                data.parameters.map((parameter, i) => {
                                    return <Parameter key={i} parameter={parameter} />
                                })
                            }
                        </ul>

                        <button className="parameters-btn" type="button" onClick={() => setOpenParameters(!openParameters)} ref={tabRef}><span>Search</span></button>
                    </div>
                    </aside>
                <header className="header">
                    <h2 className="title">Search Results</h2>
                </header>
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
