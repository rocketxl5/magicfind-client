import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Product from '../features/product/Product';
import Modal from '../features/modal/Modal';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import useModalProductState from '../hooks/useModalProductState';
import useSlideView from '../hooks/useSlideView';
import Page from '../components/Page';
import Header from '../components/Header';
import SearchParameters from '../features/search/components/SearchParameters';
import Title from '../components/Title';
import data from '../data/PAGE.json';

const SearchResults = () => {
    // States
    const [searchFeatures, setSearchFeatures] = useState(false);

    // Hooks
    const location = useLocation();
    const navigate = useNavigate();
    const { cards, search } = location.state?.result || JSON.parse(localStorage.getItem('search-results'));

    // Data
    const { classList, header, title } = data['searc-results'];

    const Results = () => {
        return (
            <span className="space-1">
                {
                    cards ?
                        `${cards.length} ${cards.length > 1 ? 'Results' : 'Result'}` :
                        'No results'
                }
            </span>
        )
    }

    useEffect(() => {
        // If cards is empty
        if (!cards.length) {
            // Send to collection view
            navigate('/me/collection');
        }
    }, [location]);

    const [view, updateSlideView] = useSlideView(handleSlideView); 

    const [state, updateProductState] = useModalProductState(search, handleModalProductState);
    console.log(cards)

    function handleSlideView(e, layout, expandedImage) {
        e.stopPropagation();
        updateSlideView(layout, expandedImage)
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
            <Page classList={classList}>
                <Header classList={header.classList}>
                    <Title classList={title.classList} title={title.text} />
                    <Results />
                </Header>
                <SearchParameters setSearchFeatures={(value) => setSearchFeatures(value)} searchFeatures={searchFeatures} /> 
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
                                        handleSlideView={handleSlideView}
                                        handleModalProductState={handleModalProductState}
                                    >
                                    </Product>
                                )
                            })
                        }
                    </ul>

            </Page>

        </>
    )
}

export default SearchResults;
