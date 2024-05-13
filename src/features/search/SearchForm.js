import { useState, useEffect } from 'react';
import AutoComplete from './components/AutoComplete';
import Loader from '../../layout/Loader';
import useNav from '../../hooks/contexthooks/useNavbar';
import useNavButton from '../../hooks/useNavButton';
import useSearch from '../../hooks/contexthooks/useSearch';
import useSearchForm from '../../hooks/useSearchForm';

const SearchForm = ({ children, classList, type, placeholder, cardNames, inputRef }) => {
    // const [oracleID, setOracleID] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const { searchBarRef } = useNav();
    const {displaySearchBar} = useNav();
    const {handleSearchBar} = useNavButton();
    const { 
        initialState,
        inputValue,
        predictions,
        searchTerm,
        dispatch,
    } = useSearch();

    const { loading, search } = useSearchForm(type, clearSearch);

    function setSearch(names, type) {
        dispatch({
            type: 'set-search',
            payload: {
                cardNames: names,
                searchType: type,
            }
        });
    }

    function updateSearch(value, predictions) {
        dispatch({
            type: 'update-search',
            payload: {
                inputValue: value,
                predictions: predictions
            }
        });
    }

    function clearSearch() {
        dispatch({
            type: 'clear-search',
            payload: initialState
        })
    }

    function launchSearch(term) { 
        dispatch({
            type: 'launch-search',
            payload: term
        });
    }

    const handleChange = (e) => {
        const value = e.target.value;

        if (value.length >= 3) {
            updateSearch(value, cardNames?.filter((title) => {
                return title.toLowerCase().includes(value.toLowerCase());
            }))

        }
        else {
            updateSearch(value, []);
        }
    };

    const handleBlur = () => {
        setIsActive(false);
        clearSearch();
        if(displaySearchBar) {
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
            search(searchTerm);
        }
    }, [searchTerm]);

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
                {(predictions.length > 0 && isActive) && <AutoComplete />}
                {loading && <Loader classList={'box-size-6 right-1'} />}
            </form>
            {children}
        </div>
    )
}

export default SearchForm
