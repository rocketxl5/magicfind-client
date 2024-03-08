import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductItem from '../features/product/ProductItem';
import Modal from '../features/modal/Modal';
import Page from '../components/Page';
import Count from '../features/search/components/Count';
import SearchParameters from '../features/search/components/SearchParameters';
import useProductForms from '../hooks/useProductForms';
import useSlideView from '../hooks/useSlideView';

const SearchResults = () => {
    // States
    const [searchFeatures, setSearchFeatures] = useState(false);
    // Hooks
    const location = useLocation();
    const navigate = useNavigate();

    const { cards, search } = location.state?.result || JSON.parse(localStorage.getItem('search-results'));

    useEffect(() => {
        // If cards is empty
        if (!cards.length) {
            // Send to collection view
            navigate('/me/collection');
        }
    }, [location]);

    const [view, updateSlideView] = useSlideView(handleSlideView); 

    const [state, updateProductState] = useProductForms(search, handleProductForm);

    function handleSlideView(e, layout, expandedImage) {
        e.stopPropagation();
        updateSlideView(layout, expandedImage)
    }

    function handleProductForm(e, card) {
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
            <Page name={'search-results'} component={<Count count={cards.length} type={'Result'} />}>
                <SearchParameters setSearchFeatures={(value) => setSearchFeatures(value)} searchFeatures={searchFeatures} /> 
                    <ul className="products">
                        {
                            cards &&
                            cards.map((card, i) => {
                                return (
                                    <ProductItem
                                        key={i}
                                        index={i}
                                        count={cards.length}
                                        card={card}
                                        search={search}
                                        handleSlideView={handleSlideView}
                                        handleProductForm={handleProductForm}
                                    >
                                    </ProductItem>
                                )
                            })
                        }
                </ul>
            </Page>
        </>
    )
}

export default SearchResults;
