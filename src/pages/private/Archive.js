import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Page from '../../components/Page.js';
import SearchForm from '../../features/search/SearchForm.js';
import useSearchContext from '../../hooks/contexthooks/useSearchContext.js';

const Search = () => {
    const archiveInputRef = useRef(null);
    const { archiveCardNames } = useSearchContext();
    const location = useLocation();

    useEffect(() => {
        archiveInputRef.current?.focus();
    }, []);

    return (
        <Page name={'archive'} title={'MTG Archive'}>
            <SearchForm
                type={'archive'}
                classList={'search-input'}
                pathname={location.pathname}
                placeholder={'Search Archive'}
                cardNames={archiveCardNames}
                inputRef={archiveInputRef}
            >
            </SearchForm>
        </Page>
    )
}

export default Search;