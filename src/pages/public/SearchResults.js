import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArchiveItem from '../../features/product/ArchiveItem';
import CollectionItem from '../../features/product/CollectionItem';
import CatalogItem from '../../features/product/CatalogItem';
import Modal from '../../features/modal/Modal';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import Page from '../../components/Page';
import SearchParameters from '../../features/search/components/SearchParameters';
import useCollectionModal from '../../hooks/useCollectionModal';
import useSlideView from '../../hooks/useSlideView';
import useImageLoader from '../../hooks/useImageLoader';

const SearchResults = () => {
    // States
    const [searchFeatures, setSearchFeatures] = useState(false);
    const [search, setSearch] = useState(null);

    // Hooks
    const location = useLocation();
    const navigate = useNavigate();

    const [imagesLoaded] = useImageLoader(search?.result);

    const [view, updateSlideView] = useSlideView(handleSlideView);

    const [state, updateCollectionItem] = useCollectionModal(search?.search, handleCollectionItem);

    useEffect(() => {
        console.log(location.state)
        // If location.state is defined
        // Search was sent through input submit 
        if (location.state) {
            // Set search search state
            setSearch({ ...location.state })
        }
        else {
            // getUrl(location.pathname);
        }
    }, [location])

    // useEffect(() => {
    //     if (url && config) {
    //         fetch(url, config);
    //     }
    // }, [url, config])

    // useEffect(() => {
    //     // If response is defined
    //     if (response) {
    //         // console.log(response)
    //         // Set search
    //         setSearch({ ...response })
    //         // Set localStorage
    //         localStorage.setItem('search-searchs', JSON.stringify(response))
    //     }
    // }, [response])

    // Validation for collection search search
    // useEffect(() => {
    //     if (search) {
    //         // If search is collection and card collection is empty
    //         if (search?.search === 'collection' && search?.result.length === 0) {
    //             // Send to collection page
    //             navigate('/me/collection');
    //         }
    //     }
    // }, [search])

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
                    title={search?.query}
                >
                    <SearchParameters
                        setSearchFeatures={(value) => setSearchFeatures(value)}
                        searchFeatures={searchFeatures}
                    />

                    <List classList="list align-center">
                        {
                            imagesLoaded &&
                            search.result.map((product, i) => {
                                return (
                                    <ListItem key={i} classList={'flex justify-center'}>
                                        {
                                            search.type === 'catalog'
                                                ?
                                                <CatalogItem
                                                    index={i}
                                                    product={product}
                                                    count={search.result.length}
                                                    handleSlideView={handleSlideView}
                                                />
                                                :
                                                search.type === 'collection'
                                                    ?
                                                    <CollectionItem
                                                        index={i}
                                                        product={product}
                                                        count={search.result.length}
                                                        handleCollectionItem={handleCollectionItem}
                                                        handleSlideView={handleSlideView}
                                                    />
                                                    :
                                                    <ArchiveItem
                                                        index={i}
                                                        product={product}
                                                        count={search.result.length}
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
