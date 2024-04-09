import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArchiveItemNew from '../features/product/ArchiveItemNew';
import CollectionItemNew from '../features/product/CollectionItemNew';
import CatalogItemNew from '../features/product/CatalogItemNew';
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
import useSearch from '../hooks/contexthooks/useSearch';
import Loader from '../layout/Loader';

const SearchResults = () => {
    // States
    const [searchFeatures, setSearchFeatures] = useState(false);
    // Hooks
    const location = useLocation();
    const navigate = useNavigate();

    const { cards, search, query } = location.state;
    const { loading } = useSearch();


    useEffect(() => {
        console.log(query)
        // If cards is empty
        if (!cards?.length) {
            // Send to collection page
            navigate('/me/collection');
        }
    }, [location]);

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
            {imagesLoaded &&
                <Page
                    id={'search-results'}
                    classList={'padding-top-3'}
                    name={'search-results'}
                    text={query}
                    // component={<Count count={cards.length}
                    //     type={'Result'} />}
                >
                    <SearchParameters
                        setSearchFeatures={(value) => setSearchFeatures(value)}
                        searchFeatures={searchFeatures}
                    /> 
                    <main>
                        {loading && <Loader />}
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
                                                    <CatalogItemNew
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
