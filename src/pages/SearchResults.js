import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArchiveItem from '../features/product/ArchiveItem';
import CollectionItem from '../features/product/CollectionItem';
import CatalogItem from '../features/product/CatalogItem';
import Modal from '../features/modal/Modal';
import List from '../components/List';
import ListItem from '../components/ListItem';
import Page from '../components/Page';
import SearchParameters from '../features/search/components/SearchParameters';
import useCollectionModal from '../hooks/useCollectionModal';
import useSlideView from '../hooks/useSlideView';
import useImageLoader from '../hooks/useImageLoader';
import useSearch from '../hooks/useSearch';

const SearchResults = () => {
    // States
    const [searchFeatures, setSearchFeatures] = useState(false);
    const [result, setResult] = useState(null);

    // Hooks
    const location = useLocation();
    const navigate = useNavigate();
    const { fetchSearchResult, response, error } = useSearch();

    // const { cards, search, query } =
    //     location?.state ||
    //     JSON.parse(localStorage.getItem('search-results')) |


    const [imagesLoaded] = useImageLoader(result?.cards);

    const [view, updateSlideView] = useSlideView(handleSlideView);

    const [state, updateCollectionItem] = useCollectionModal(result?.search, handleCollectionItem);

    useEffect(() => {
        if (location.state) {
            console.log(location.state)
            setResult({ ...location.state })
        }
        else {
            fetchSearchResult(location.pathname);
        }
    }, [location])

    useEffect(() => {
        if (response) {
            console.log(response)
            setResult({ ...response })
        }
        if (error) {
            console.log(error)
        }
    }, [response, error])

    useEffect(() => {
        // If search is collection and card collection is empty
        if (result?.search === 'collection' && result?.cards.length === 0) {
            // Send to collection page
            navigate('/me/collection');
        }
    }, [result])

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
                    name={'search-results'}
                    title={result?.query}
                >
                    <SearchParameters
                        setSearchFeatures={(value) => setSearchFeatures(value)}
                        searchFeatures={searchFeatures}
                    /> 

                        <List classList="list align-center">
                        {
                            result?.cards &&
                            result.cards.map((card, i) => {
                                return (
                                    <ListItem key={i} classList={'flex justify-center'}>
                                        {
                                            result.search === 'catalog'
                                                ?
                                                <CatalogItem
                                                    index={i}
                                                    product={card}
                                                    count={result.cards.length}
                                                    handleSlideView={handleSlideView}
                                                />
                                                :
                                                result.search === 'collection'
                                                    ?
                                                    <CollectionItem
                                                        index={i}
                                                        product={card}
                                                        count={result.cards.length}
                                                        handleCollectionItem={handleCollectionItem}
                                                        handleSlideView={handleSlideView}
                                                    />
                                                    :
                                                    <ArchiveItem
                                                        index={i}
                                                        product={card}
                                                        count={result.cards.length}
                                                        handleSlideView={handleSlideView}
                                                    />
                                        }
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Page>}
        </>
    )
}

export default SearchResults;
