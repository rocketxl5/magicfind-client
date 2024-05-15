import { useState, useEffect } from 'react';
import AutoComplete from './components/AutoComplete';
import Loader from '../../layout/Loader';
import useNav from '../../hooks/contexthooks/useNavbar';
import useNavButton from '../../hooks/useNavButton';
import useSearch from '../../hooks/contexthooks/useSearch';
import useSearchForm from '../../hooks/useSearchForm';

const SearchForm = ({ children, classList, type, placeholder, cardNames, inputRef }) => {
    // const [oracleID, setOracleID] = useState(null);

    const { searchBarRef, displaySearchBar } = useNav();
    const {handleSearchBar} = useNavButton();

    const { 
        inputValue,
        // loading,
        predictions,
        searchTerm,
    } = useSearch();

    const { getParams, setFetchParams, setIsActive, isActive, loading, setSearch, updateSearch, launchSearch, clearSearch } = useSearchForm(inputRef);

    const handleChange = (e) => {
        const value = e.target.value;

        if (value.length >= 3) {
            updateSearch(
                value,
                cardNames?.filter((title) => title.toLowerCase().includes(value.toLowerCase()))
            );
        }
        else {
            updateSearch(value, []);
        }
    };

    const handleBlur = () => {
        setIsActive(false);
        clearSearch();
        if (displaySearchBar) {
            handleSearchBar(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        launchSearch(predictions[0]);
    }

    const handleFocus = (e) => {
        setIsActive(true);
        setSearch(cardNames, e.target.id);
    }

    useEffect(() => {
        if (searchTerm && isActive) {
            const searchParams = getParams(searchTerm, type);
            setFetchParams(searchParams);
        }
    }, [searchTerm, isActive]);

    return (
        <div id={`search-${type}-form`} ref={type === 'catalog' ? searchBarRef : null}>
            <form id={`${type}-form`} className='search-form' onSubmit={(e) => handleSubmit(e)}>
                <input
                    id={type}
                    type="text"
                    className={classList}
                    value={isActive ? inputValue : ''}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    ref={inputRef}
                />
                {
                    isActive &&
                    <>
                        {predictions?.length > 0 && <AutoComplete />}
                        {loading && <Loader classList={'box-size-6 right-1'} />}
                    </>
                }
            </form>
            {children}
        </div>
    )
}

export default SearchForm
