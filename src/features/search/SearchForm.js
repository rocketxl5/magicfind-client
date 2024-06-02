import { useEffect } from 'react';
import AutoComplete from './components/AutoComplete';
import Loader from '../../layout/Loader';
import useNav from '../../hooks/contexthooks/useNavbar';
import useNavButton from '../../hooks/useNavButton';
import useSearch from '../../hooks/contexthooks/useSearch';
import useSearchForm from '../../hooks/useSearchForm';

const SearchForm = ({ children, classList, type, placeholder, cardNames, inputRef }) => {
    const { searchBarRef, displaySearchBar } = useNav();
    const {handleSearchBar} = useNavButton();

    const { 
        inputValue,
        predictions,
        searchTerm,
        selection,
    } = useSearch();

    const {
        getParams,
        setIsActive,
        isActive,
        setFetchParams,
        handleSetSearch,
        handleUpdateSearch,
        handleClearSearch,
        handleSearch,
        loading,
    } = useSearchForm(inputRef);

    const handleChange = (e) => {
        const value = e.target.value;

        if (value.length >= 3) {
            handleUpdateSearch(
                value,
                cardNames?.filter((title) => title.toLowerCase().includes(value.toLowerCase()))
            );
        }
        else {
            handleUpdateSearch(value, []);
        }
    };

    const handleBlur = (e) => {
        handleClearSearch();
        setIsActive(false);
        // Close search bar if open
        if (displaySearchBar) {
            handleSearchBar(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selection) {
            handleSearch(selection);
        }
        else if (predictions.length === 1) {
            handleSearch(predictions[0]);
        }
        else {
            handleSearch(inputValue, false);
        }
    }

    const handleFocus = (e) => {
        setIsActive(true);
        handleSetSearch(cardNames, e.target.id);
    }

    useEffect(() => {
        if (searchTerm && isActive) {
            const searchParams = getParams(type, searchTerm);
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
