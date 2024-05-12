import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Page from '../components/Page.js';
import Message from '../components/Message.js';
import SearchForm from '../features/search/SearchForm.js';
import Button from '../components/Button.js';
import useSearch from '../hooks/contexthooks/useSearch.js';
import useAuth from '../hooks/contexthooks/useAuth.js';
import useFetch from '../hooks/useFetch.js';
import useConfig from '../hooks/useConfig.js';

const Collection = () => {
    const {
        isCollectionEmpty,
        collectionCardNames,
        collectionInputRef,
    } = useSearch();

    const { auth } = useAuth();
    const { fetchOne, response, error } = useFetch();
    const { config, getConfig } = useConfig();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        collectionInputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (config) {
            fetchOne(`/api/cards/collection/${auth.user.id}`, config);
        }
    }, [config]);

    useEffect(() => {
        if (response) {
            navigate(`${location.pathname}/cards`, { state: { ...response } });
        }
    }, [response, error])

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
                            handleClick={() => getConfig('collection', auth.token, 'Collection Cards')}
                        >
                            All Cards
                        </Button>
                    </SearchForm>
            }
        </Page>
    )
}

export default Collection;