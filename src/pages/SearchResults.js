import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArchiveItem from '../features/product/ArchiveItem';
import ArchiveItemNew from '../features/product/ArchiveItemNew';
import CollectionItemNew from '../features/product/CollectionItemNew';
import CatalogItem from '../features/product/CatalogItem';
import Modal from '../features/modal/Modal';
import List from '../components/List';
import ListItem from '../components/ListItem';
import Card from '../components/Card';
import Page from '../components/Page';
import Count from '../features/search/components/Count';
import SearchParameters from '../features/search/components/SearchParameters';
import useCollectionModal from '../hooks/useCollectionModal';
import useSlideView from '../hooks/useSlideView';
import useImageLoader from '../hooks/useImageLoader';

const SearchResults = () => {
    // States
    const [searchFeatures, setSearchFeatures] = useState(false);
    // Hooks
    const location = useLocation();
    const navigate = useNavigate();

    const { cards, search } = location.state;

    useEffect(() => {
        // console.log(location)
        // If cards is empty
        if (!cards?.length) {
            // Send to collection page
            navigate('/me/collection');
        }
    }, [location, cards, navigate]);

    const [imagesLoaded] = useImageLoader(cards);

    const [view, updateSlideView] = useSlideView(handleSlideView);

    const [state, updateCollectionItem] = useCollectionModal(search, handleCollectionItem);

    function handleSlideView(e, layout, expandedImage) {
        e.stopPropagation();
        updateSlideView(layout, expandedImage);
    }

    function handleCollectionItem(e, card, expandedImage) {
        e.stopPropagation();
        updateCollectionItem(e.target.id, card, expandedImage);
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
                // <Page id={'search-results'} name={'search-results'} >
                <Page id={'search-results'} name={'search-results'} component={<Count count={cards.length} type={'Result'} />}>
                <SearchParameters setSearchFeatures={(value) => setSearchFeatures(value)} searchFeatures={searchFeatures} /> 
                <main>
                            <List classList="list align-center">
                        {
                            cards &&
                            cards.map((card, i) => {
                                return (
                                    <ListItem key={i}>
                                        <Card classList={''}>
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
                                                        <CollectionItemNew
                                                            index={i}
                                                            product={card}
                                                            count={cards.length}
                                                            handleCollectionItem={handleCollectionItem}
                                                            handleSlideView={handleSlideView}
                                                        />
                                                        :
                                                        <ArchiveItemNew
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
