import { useState, useEffect, forwardRef } from 'react';
import { useLocation } from 'react-router-dom';
import AutoComplete from './AutoComplete';
import useBlur from '../../../hooks/useBlur';
import useFocus from '../../../hooks/useFocus';
import useSearch from '../../../hooks/contexthooks/useSearch';
import useNavbar from '../../../hooks/contexthooks/useNavbar';
import useNavButton from '../../../hooks/useNavButton';

const SearchInput = forwardRef(function SearchInput(props, ref) {
    const {
        id,
        classList,
        placeholder,
        searchCard,
        isActive,
    } = props;

    const {
        inputValue,
        setInputValue,
        setMarker,
        cardNames,
        setCardName,
        searchTerm,
        setSearchTerm,
        searchInput,
        setPredictions,
        displayAutcomplete,
        setDisplayAutocomplete
    } = useSearch();

    const location = useLocation();

    const { updateBlur } = useBlur();
    const { updateFocus } = useFocus();
    const { displaySearchBar } = useNavbar();
    const { blurHandler } = useNavButton();

    // If location changes reset search states
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
        <>
            <input
                id={id}
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
                ref={ref}
                placeholder={placeholder}
            />
            {(isActive && searchTerm) &&
                <AutoComplete searchCard={searchCard} />
            }
        </>
    );
});

export default SearchInput;