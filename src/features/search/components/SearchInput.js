import React, {
    forwardRef
} from 'react';
import AutoComplete from './AutoComplete';
import useNavbar from '../../../hooks/contexthooks/useNavbar'
import useSearch from '../../../hooks/contexthooks/useSearch';
import useViewport from '../../../hooks/contexthooks/useViewport';

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
        setSearchInput,
        searchTerm,
        setSearchTerm,
        setPredictions,
        searchInput,
        displayAutcomplete,
        setCardNames,
        setDisplayAutocomplete
    } = useSearch();

    const { displaySeachBar, setDisplaySearchBar, hamburgerRef } = useNavbar();
    const { isMobile } = useViewport();

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

    const handleBlur = (e) => {
        e.preventDefault();
        // console.log(e.target)
        setMarker(-1);
        setSearchTerm('');
        // Reinitialize input state if catalog 
        // query is triggered each time search catalog has focus
        // making sure search catalog cardnames is updated with latest results  
        if (e.target.id === 'catalog') {
            setSearchInput(null);
            setCardNames(null);
            if (isMobile) {
                setDisplaySearchBar(false);
                hamburgerRef.current?.setAttribute('aria-expanded', 'false');
                setTimeout(() => {
                    hamburgerRef.current.disabled = false;
                }, 500);
            }
        }
    };

    const handleFocus = (e) => {
        e.preventDefault();

        if (searchInput?.id !== e.target.id) {
            setSearchInput(e.target);
        }


        if (displaySeachBar) {
            setDisplaySearchBar(false);
        }
    }

    return (
        <>
            <input
                id={id}
                type="text"
                className={className}
                value={isActive ? searchTerm : ''}
                onChange={handleChange}
                onFocus={handleFocus}
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