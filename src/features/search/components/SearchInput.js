import { useEffect, forwardRef } from 'react';
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
        setMarker,
        cardNames,
        setCardName,
        searchTerm,
        setSearchTerm,
        setPredictions,
        displayAutcomplete,
        setDisplayAutocomplete
    } = useSearch();

    const location = useLocation();

    const { updateBlur } = useBlur();
    const { updateFocus } = useFocus();
    const { displaySearchBar } = useNavbar();
    const { blurHandler } = useNavButton();

    useEffect(() => {
        if (displaySearchBar) {
            blurHandler();
        }
    }, [location])

    const handleChange = (e) => {

        if (e.target.value.length >= 3) {
            // Reset Marker to initial value
            setMarker(-1);

            const filteredCardTitles = cardNames?.filter((title) => {
                return title.toLowerCase().includes(e.target.value.toLowerCase());
            });

            !displayAutcomplete && setDisplayAutocomplete(true)
            setPredictions(filteredCardTitles);
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
                className={classList}
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