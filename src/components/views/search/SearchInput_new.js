import React, {
    useRef,
    useState,
    useEffect,
    forwardRef,
    useContext,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import AutoComplete from './AutoComplete';
import { SearchContext } from '../../../contexts/SearchContext';
import { CardContext } from '../../../contexts/CardContext';
import toggleClass from '../../utilities/toggleClass';

const SearchInput = forwardRef(function SearchInput(props, ref) {
    const {
        formId,
        isActive
    } = props;

    const inputRef = ref && ref.inputRef;

    const [currentListItem, setCurrentListItem] = useState(null);
    const [hoverList, setHoverList] = useState(false);

    const {
        searchInput,
        setSearchInput,
        searchTerm,
        setSearchTerm,
        previousFormID,
        setIsValidLength,
        text,
        setText
    } = useContext(SearchContext);


    const listItems = useRef(null);









    // keydown event listener calls handleKeyDown function
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    });

    const handleChange = (e) => {
        console.log(e.target.value);
        setText(e.target.value);
        setSearchTerm(e.target.value)
    };

    const handleBlur = (e) => {
        // Reset currentListItem and previousListItem
        // on loosing focus of the search text field
        setCurrentListItem(null);
        if (!hoverList) {
            setIsValidLength(false);
        }
    };


    const handleFocus = (e) => {
        console.log(inputRef)
        setSearchInput(inputRef.current);
        console.log(searchInput)
        if (searchInput !== e.target) {
            if (previousFormID !== formId) {
                // if searchTerm not empty
                if (searchTerm) {
                    // empty it
                    setSearchTerm('');
                }
            }
        }

        setTracker(0);
        // setPreviousFormID(formId);
        if (text.length > 2) {
            setIsValidLength(true);
            setHoverList(false);
        }

        // Handle closing of Search catatalog search bar in mobile
        // If search field is not catalog and checkbox (#mobile-nav) is checked (search is displayed)
        if (e.target.id !== 'search-catalog-field' && document.querySelector('#mobile-nav').checked) {
            // Click label attached to checkbox to check it
            document.querySelector('.mobile-nav-label').click();
            // Clear search catalog search bar
            document.querySelector('.search-catalog').style.width = 0;
            // Display search icon (magnifier)
            document.querySelector('.search-btn').style.setProperty('display', 'block');
        }
    };

    return (
        <>
            <input
                id={`search-${formId.split('-')[1]}-input`}
                type="text"
                className="search-field"
                value={isActive ? searchTerm : ''}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={inputRef}
                placeholder={
                    formId === 'search-catalog'
                        ? 'Search Magic Find'
                        : formId === 'search-api'
                            ? 'Search Skryfall API'
                            : 'Search Your Store'
                }
            />
            <AutoComplete inputRef={inputRef} />
        </>
    );
});

export default SearchInput;
