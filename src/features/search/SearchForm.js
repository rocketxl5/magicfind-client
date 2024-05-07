import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AutoComplete from './components/AutoComplete';
import Loader from '../../layout/Loader';
import useBlur from '../../hooks/useBlur';
import useFocus from '../../hooks/useFocus';
import useNavbar from '../../hooks/contexthooks/useNavbar';
import useNavButton from '../../hooks/useNavButton';
import useSearch from '../../hooks/contexthooks/useSearch';
import useSearchForm from '../../hooks/useSearchForm';

const SearchForm = ({ children, classList, type, pathname, placeholder, cardNames, inputRef }) => {
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();
    const {
        inputValue,
        setInputValue,
        setMarker,
        setCardName,
        searchTerm,
        setSearchTerm,
        searchInput,
        setPredictions,
        setCardNames,
        displayAutcomplete,
        setDisplayAutocomplete
    } = useSearch();

    const { updateBlur } = useBlur();
    const { updateFocus } = useFocus();
    const { displaySearchBar, searchBarRef } = useNavbar();
    const { blurHandler } = useNavButton();
    const { searchProduct, loading } = useSearchForm(pathname);

    useEffect(() => {
        if (searchInput?.id === type) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [searchInput]);

    useEffect(() => {
        if (isActive) {
            setCardNames(cardNames);
        }
    }, [isActive])

    useEffect(() => {
        if (inputValue) {
            setInputValue('');
        }
        if (displayAutcomplete) {
            setDisplayAutocomplete(false);
        }
        if (displaySearchBar) {
            blurHandler();
        }
    }, [location])

    const handleChange = (e) => {
        const value = e.target.value;

        if (value.length >= 3) {
            // Reset Marker to initial value
            setMarker(-1);

            const filteredCardTitles = cardNames?.filter((title) => {
                return title.toLowerCase().includes(value.toLowerCase());
            });
            !displayAutcomplete && setDisplayAutocomplete(true)
            setPredictions(filteredCardTitles);
        }
        else {
            setDisplayAutocomplete(false);
            setCardName('');
        }
        setSearchTerm(value);
        setInputValue(value);
    };

    const handleBlur = (e) => {
        updateBlur(e.target.id)
    }

    return (
        <div id={`search-${type}-form`} ref={type === 'catalog' ? searchBarRef : null}>
            <form id={`${type}-form`} className='search-form' onSubmit={(e) => searchProduct(e)}>
                <input
                    id={type}
                    type="text"
                    className={classList}
                    // Value changes 
                    // @ keyboard [SearchInput]
                    // @ arrowup/arrowdown [Autocomplete] 
                    // @ mousehover [Prediction]
                    value={isActive ? inputValue : ''}
                    onChange={handleChange}
                    onFocus={(e) => updateFocus(e.target)}
                    onBlur={handleBlur}
                    ref={inputRef}
                    placeholder={placeholder}
                />
                {(isActive && searchTerm) &&
                    <AutoComplete searchCard={searchProduct} />
                }
                {loading && <Loader classList={'box-size-6 right-1'} />}
            </form>
            {children}
        </div>
    )
}

export default SearchForm
