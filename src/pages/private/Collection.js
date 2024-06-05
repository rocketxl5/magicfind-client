import { useEffect } from 'react';
import Button from '../../components/Button.js';
import Page from '../../components/Page.js';
import Loader from '../../layout/Loader.js';
import Message from '../../components/Message.js';
import SearchForm from '../../features/search/SearchForm.js';
import useSearch from '../../hooks/contexthooks/useSearch.js';
import useSearchForm from '../../hooks/useSearchForm.js';

const Collection = () => {
    // Search Context
    const {
        isCollectionEmpty,
        collectionCardNames,
        collectionInputRef,
    } = useSearch();

    const {
        getParams,
        setFetchParams,
        loading
    } = useSearchForm();

    useEffect(() => {
        collectionInputRef.current?.focus();
    }, []);

    const handleClick = () => {
        const searchParams = getParams('collection', 'All');
        setFetchParams(searchParams);
    }

    return (
        <Page name={'collection'} title={'Collection'}>
            {
                isCollectionEmpty ?
                    <Message type={'collection'} /> :
                    <SearchForm
                        type={'collection'}
                        classList={'search-input'}
                        placeholder={'Search Collection'}
                        cardNames={collectionCardNames}
                        inputRef={collectionInputRef}
                    >
                        <Button
                            id={'collection-btn'}
                            classList='btn bg-success'
                            handleClick={handleClick}
                        >
                            {
                                !loading ?
                                    'All Cards' :
                                    <Loader classList='box-size-6 relative bg-transparent margin-auto' />
                            }
                        </Button>
                    </SearchForm>
            }
        </Page>
    )
}

export default Collection;