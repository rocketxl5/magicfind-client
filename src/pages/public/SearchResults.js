import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import ArchiveItem from '../../features/product/ArchiveItem';
// import CollectionItem from '../../features/product/CollectionItem';
// import CatalogItem from '../../features/product/CatalogItem';
import Card from '../../components/Card';
import Modal from '../../features/modal/Modal';
// import List from '../../components/List';
// import ListItem from '../../components/ListItem';
import Page from '../../components/Page';
import SearchParameters from '../../features/search/components/SearchParameters';
import useCollectionModal from '../../hooks/useCollectionModal';
import useSlideView from '../../hooks/useSlideView';
import useLoadImages from '../../hooks/useLoadImages';
import useResults from '../../hooks/useResults';
import useSearchContext from '../../hooks/contexthooks/useSearchContext';
import useSearchForm from '../../hooks/useSearchForm';

const SearchResults = () => {
    // States
    const [searchFeatures, setSearchFeatures] = useState(false);

    // Hooks
    const location = useLocation();
    const navigate = useNavigate();

    const { results } = useSearchContext();
    const { handleSearchResults } = useResults();

    useEffect(() => {
        if (!results && localStorage.getItem('search-results')) {
            const { data, props } = JSON.parse(localStorage.getItem('search-results'))
            handleSearchResults(data, props);
        }
    }, [])

    // useEffect(() => {
    //     console.log(results)
    // }, [results])

    // const [imagesLoaded] = useLoadImages(search?.data);

    // const [view, updateSlideView] = useSlideView(handleSlideView);

    // const [state, updateCollectionItem] = useCollectionModal(search?.type, handleCollectionItem);

    // const { results } = useResult(search);

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

    // function handleSlideView(e, layout, expandedImage) {
    //     e.stopPropagation();
    //     updateSlideView(layout, expandedImage);
    // }

    // function handleCollectionItem(e, card, expandedImage) {
    //     e.stopPropagation();
    //     updateCollectionItem(e.target.id, card, expandedImage);
    // }

    return (
        <>
            {/* {
                <Modal open={view.open}>
                    {view.component}
                </Modal>
            } */}
            {/* {
                <Modal open={state.open}>
                    {state.component}
                </Modal>
            } */}
                <Page
                    name={'search-results'}
                title={location.state?.query}
                >
                    <SearchParameters
                        setSearchFeatures={(value) => setSearchFeatures(value)}
                        searchFeatures={searchFeatures}
                    />

                    <div className="list">
                        {
                        results?.map((result, i) => {
                                return (
                                    result
                                    // <Card
                                    //     key={i}
                                    //     classList={'product-container'}
                                    //     header={result.header}
                                    //     footer={result.footer}
                                    // >
                                    // </Card>
                                    // <ListItem key={i} classList={'flex justify-center'}>
                                    //     {
                                    //         search.type === 'catalog'
                                    //             ?
                                    //             <CatalogItem
                                    //                 index={i}
                                    //                 product={product}
                                    //                 count={search.result.length}
                                    //                 handleSlideView={handleSlideView}
                                    //             />
                                    //             :
                                    //             search.type === 'collection'
                                    //                 ?
                                    //                 <CollectionItem
                                    //                     index={i}
                                    //                     product={product}
                                    //                     count={search.result.length}
                                    //                     handleCollectionItem={handleCollectionItem}
                                    //                     handleSlideView={handleSlideView}
                                    //                 />
                                    //                 :
                                    //                 <ArchiveItem
                                    //                     index={i}
                                    //                     product={product}
                                    //                     count={search.result.length}
                                    //                     handleSlideView={handleSlideView}
                                    //                 />
                                    //     }
                                    // </ListItem>
                                )
                            })
                        }
                    </div>
            </Page>
        </>
    )
}

export default SearchResults;
