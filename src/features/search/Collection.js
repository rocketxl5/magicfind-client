import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Page from '../../components/Page';
import Message from '../../components/Message.js';
import SearchForm from './SearchForm.js';
import Button from '../../components/Button';
import useSearch from '../../hooks/contexthooks/useSearch';

const Collection = () => {
    const {
        isCollectionEmpty,
        collectionCardNames,
        collectionInputRef,
        setSearchTerm
    } = useSearch();

    const location = useLocation();

    useEffect(() => {
        // if (!isCollectionEmpty) {
            collectionInputRef.current?.focus();
        // }
    }, []);

    return (
        <Page name={'collection'} title={'Collection'}>
            {
                isCollectionEmpty ?
                    <Message type={'collection'} /> :                   
                    <SearchForm
                        type={'collection'}
                        classList={'search-input'}
                        pathname={location.pathname}
                        placeholder={'Search Collection'}
                        cardNames={collectionCardNames}
                        inputRef={collectionInputRef}
                    >
                        <Button
                            id={'collection-btn'}
                            classList='bg-success'
                            handleClick={(e) => setSearchTerm('All Cards')}
                        >
                            All Cards
                        </Button>
                    </SearchForm>
            }
        </Page>
    )
}

export default Collection;