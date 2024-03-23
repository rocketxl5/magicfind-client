import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArchiveItem from '../features/products/ArchiveItem';
import CollectionItem from '../features/products/CollectionItem';
import CatalogItem from '../features/products/CatalogItem';
import Modal from '../features/modal/Modal';
import List from '../components/List';
import ListItem from '../components/ListItem';
import Card from '../components/Card';
import Page from '../components/Page';
import Count from '../features/search/components/Count';
import SearchParameters from '../features/search/components/SearchParameters';
import useProductForms from '../hooks/useProductForms';
import useSlideView from '../hooks/useSlideView';
import useImageLoader from '../hooks/useImageLoader';

const SearchResults = () => {
    // States
    const [searchFeatures, setSearchFeatures] = useState(false);
    // Hooks
    const location = useLocation();
    const navigate = useNavigate();

    const { cards, search } = location.state?.result || JSON.parse(localStorage.getItem('search-results'));

    // console.log(cards)
    useEffect(() => {
        // If cards is empty
        if (!cards.length) {
            // Send to collection view
            navigate('/me/collection');
        }
    }, [location]);

    const [imagesLoaded] = useImageLoader(cards);

    const [view, updateSlideView] = useSlideView(handleSlideView);

    const [state, updateProductState] = useProductForms(search, handleProductForm);

    function handleSlideView(e, layout, expandedImage) {
        e.stopPropagation();
        updateSlideView(layout, expandedImage);
    }

    function handleProductForm(e, card) {
        e.stopPropagation();
        updateProductState(e.target.id, card);
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
            {
                imagesLoaded &&
            <Page id={'search-results'} name={'search-results'} component={<Count count={cards.length} type={'Result'} />}>
                <SearchParameters setSearchFeatures={(value) => setSearchFeatures(value)} searchFeatures={searchFeatures} /> 
                <main>
                        <List classList="list">
                        {
                            cards &&
                            cards.map((card, i) => {
                                return (
                                    <ListItem key={i}>
                                        <Card classList={'product-card'}>
                                            {
                                                search === 'catalog'
                                                    ?
                                                    <CatalogItem
                                                        index={i}
                                                        product={card}
                                                        count={cards.length}
                                                        handleSlideView={handleSlideView}
                                                    />
                                                    :
                                                    search === 'collection'
                                                        ?
                                                        <CollectionItem
                                                            index={i}
                                                            product={card}
                                                            count={cards.length}
                                                            handleProductForm={handleProductForm}
                                                            handleSlideView={handleSlideView}
                                                        />
                                                        :
                                                        <ArchiveItem
                                                            index={i}
                                                            product={card}
                                                            count={cards.length}
                                                            handleSlideView={handleSlideView}
                                                        />
                                            }
                                        </Card>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </main>
                </Page>}
        </>
    )
}

export default SearchResults;
