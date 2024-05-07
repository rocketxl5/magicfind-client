import React, {
    useEffect,
} from 'react';
import { useLocation } from 'react-router-dom';
import Page from '../../components/Page';
import Message from '../../components/Message.js';
import SearchForm from './SearchForm.js';
import Loader from '../../layout/Loader.js';
import Button from '../../components/Button';
import useSearch from '../../hooks/contexthooks/useSearch';
import useNavbar from '../../hooks/contexthooks/useNavbar.js';
import useSearchForm from '../../hooks/useSearchForm.js';

const Collection = () => {
    const {
        isCollectionEmpty,
        collectionCardNames,
        collectionInputRef
    } = useSearch();

    const { displaySeachBar, setDisplaySearchBar } = useNavbar();

    const location = useLocation();
    const { searchProduct, loading } = useSearchForm(location.pathname);

    useEffect(() => {
        if (!isCollectionEmpty) {
            collectionInputRef.current?.focus();
        }
        if (displaySeachBar) {
            setDisplaySearchBar(false);
        }
    }, []);

    return (
            <Page name={'collection'} title={'Collection'}>
                <main>
                    {
                        isCollectionEmpty ?
                            <Message type={'collection'} /> :
                            <>
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
                                    handleClick={(e) => searchProduct(e, 'All Cards')}
                                >
                                    {
                                        !loading ?
                                            'All Cards' :
                                            <Loader classList='box-size-5 relative bg-transparent color-light margin-auto' />
                                    }

                                </Button>
                            </SearchForm>

                            </>
                    }
                <div>
                    <h3>Search</h3>
                </div>
                </main>
        </Page>
    )
}

export default Collection;