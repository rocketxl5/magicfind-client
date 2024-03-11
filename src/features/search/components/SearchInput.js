import React, {
    forwardRef
} from 'react';
import AutoComplete from './AutoComplete';
import useBlur from '../../../hooks/useBlur';
import useFocus from '../../../hooks/useFocus';
import useSearch from '../../../hooks/contexthooks/useSearch';

const SearchInput = forwardRef(function SearchInput(props, ref) {
    const {
        id,
        className,
        placeholder,
        searchCard,
        isActive,
    } = props;

    const {
        setMarker,
        cardNames,
        setCardName,
        searchTerm,
        setSearchTerm,
        setPredictions,
        displayAutcomplete,
        setDisplayAutocomplete
    } = useSearch();

    const { updateBlur } = useBlur();
    const { updateFocus } = useFocus();

    const handleChange = (e) => {

        if (e.target.value.length >= 3) {
            // Reset Marker to initial value
            setMarker(-1);

            const filteredCardTitles = cardNames?.filter((title) => {
                return title.toLowerCase().includes(e.target.value.toLowerCase());
            });

            !displayAutcomplete && setDisplayAutocomplete(true)
            setPredictions(filteredCardTitles);
            // setCardName(e.target.value);
        }
        else {
            setDisplayAutocomplete(false);
            setCardName('');
        }
        setSearchTerm(e.target.value)
    };

    return (
        <>
            <input
                id={id}
                type="text"
                className={className}
                value={isActive ? searchTerm : ''}
                onChange={handleChange}
                onFocus={(e) => updateFocus(e.target)}
                onBlur={(e) => updateBlur(e.target.id)}
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