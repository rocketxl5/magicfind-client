import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Page from '../../components/Page';
import Message from '../../components/Message.js';
import SearchForm from './SearchForm.js';
import Loader from '../../layout/Loader.js';
import Button from '../../components/Button';
import useSearch from '../../hooks/contexthooks/useSearch';
import useSearchForm from '../../hooks/useSearchForm.js';

const Collection = () => {
    const {
        isCollectionEmpty,
        collectionCardNames,
        collectionInputRef
    } = useSearch();

    const location = useLocation();
    const { searchProduct, loading } = useSearchForm(location.pathname);

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
                            handleClick={(e) => searchProduct('All Cards')}
                        >
                            {
                                !loading ?
                                    'All Cards' :
                                    <Loader classList='box-size-5 relative bg-transparent color-light margin-auto' />
                            }

                        </Button>
                    </SearchForm>
            }
        </Page>
    )
}

export default Collection;