import { useState, useEffect, useContext, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Product from '../features/search/components/product/Product';
import Parameter from '../features/search/components/Parameter';
import Modal from '../features/modal/Modal';
import { ScrollContext } from '../contexts/ScrollContext';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";
import useModalProductState from '../features/search/hooks/useModalProductState';
import useModalProductView from '../features/search/hooks/useModalProductView';
import useModalSlide from '../features/modal/hooks/useModalSlide';

const SearchResults = () => {
    // States
    const [searchFeatures, setSearchFeatures] = useState(false);
    // Context
    const { btnRef, countRef } = useContext(ScrollContext);
    // Hooks
    const location = useLocation();
    const navigate = useNavigate();
    // Refs
    const cardRef = useRef(null);
    const panelRef = useRef(null);
    const iconRef = useRef(null);

    const { cards, search } = location.state?.result || JSON.parse(localStorage.getItem('search-results'));

    useEffect(() => {

        // If cards is empty
        if (!cards.length) {
            // Send to collection view
            navigate('/me/collection');
        }
        else {
            // updateProducts(search)
        }
    }, [location]);

    // useEffect(() => {
    //     if (searchFeatures) {
    //         document.body.classList.add('scroll-none');
    //         panelRef.current?.classList.add('move-panel');
    //         btnRef.current?.classList.add('move-btn');
    //         iconRef.current?.classList.add('rotate-icon');
    //     } else {
    //         document.body.classList.remove('scroll-none');
    //         panelRef.current?.classList.remove('move-panel');
    //         btnRef.current?.classList.remove('move-btn');
    //         iconRef.current?.classList.remove('rotate-icon');
    //     }
    // }, [searchFeatures]);

    const [view, updateProductView] = useModalProductView(handleModalProductView);

    const [state, updateProductState] = useModalProductState(search, handleModalProductState);


    function handleModalProductView(e, layout, expandedImage) {
        e.stopPropagation();
        updateProductView(layout, expandedImage)
    }

    function handleModalProductState(e, card) {
        e.stopPropagation();
        updateProductState(e.target.id, card)
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

            <div className="search-results">

                <aside className="parameters" >
                    <header className="parameters-header">
                        <h3>Search Parameters</h3>
                    </header>
                    <div className="parameters-container">
                        <ul className="parameters-list" ref={panelRef}>
                            {

                                // data.parameters.map((parameter, i) => {
                                //     return <Parameter key={i} parameter={parameter} />
                                // })
                            }
                        </ul>

                        <button className="parameters-btn" type="button" onClick={() => setSearchFeatures(!searchFeatures)} ref={btnRef}><span className="parameters-icon" ref={iconRef}><FiPlus /></span></button>
                    </div>
                </aside>
                <main className="containter">
                    <header className="search-results-header">
                        <h2 className="title">Search Results</h2>
                        <span className="space-1">
                            {
                                cards ?
                                    `${cards.length} ${cards.length > 1 ? 'Results' : 'Result'}` :
                                    'No results'
                            }
                        </span>
                    </header>
                    <ul className="products">
                        {
                            cards &&
                            cards.map((card, i) => {
                                return (
                                    <Product
                                        key={i}
                                        index={i}
                                        count={cards.length}
                                        card={card}
                                        search={search}
                                        handleModalProductView={handleModalProductView}
                                        handleModalProductState={handleModalProductState}
                                        ref={cardRef}
                                    >
                                    </Product>
                                )
                            })
                        }
                    </ul>
                </main>
            </div>
        </>
    )
}

export default SearchResults;
