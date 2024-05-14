import { useEffect } from 'react';
import Page from '../../components/Page.js';
import Message from '../../components/Message.js';
import SearchForm from '../../features/search/SearchForm.js';
import Button from '../../components/Button.js';
import useSearch from '../../hooks/contexthooks/useSearch.js';
import useSearchForm from '../../hooks/useSearchForm.js';

const Collection = () => {
    const {
        isCollectionEmpty,
        collectionCardNames,
        collectionInputRef,
    } = useSearch();

    const { search } = useSearchForm();

    useEffect(() => {
        collectionInputRef.current?.focus();
    }, []);

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
                            classList='bg-success'
                            handleClick={() => search('All', 'collection')}
                        >
                            All Cards
                        </Button>
                    </SearchForm>
            }
        </Page>
    )
}

export default Collection;