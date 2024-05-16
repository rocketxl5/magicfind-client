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
        selection
    } = useSearch();

    const {
        getParams,
        setFetchParams,
        setIsActive,
        isActive,
        loading,
        setSearch,
        updateSearch,
        searchFor,
        clearSearch
    } = useSearchForm(inputRef);

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
        if (!searchTerm) {
            clearSearch();
            setIsActive(false);
            if (displaySearchBar) {
                handleSearchBar(false);
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selection) {
            searchFor(selection);
        }
        else if (predictions.length === 1) {
            searchFor(predictions[0]);
        }
        else {
            searchFor(inputValue, false);
        }
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
