import { useState, useEffect } from 'react';
import AutoComplete from './components/AutoComplete';
import Loader from '../../layout/Loader';
import useBlur from '../../hooks/useBlur';
import useFocus from '../../hooks/useFocus';
import useNavbar from '../../hooks/contexthooks/useNavbar';
import useSearch from '../../hooks/contexthooks/useSearch';
import useSearchForm from '../../hooks/useSearchForm';
import { searchReducer } from './services/searchReducer';

// const initialState = {
//     searchType: '',
//     searchTerm: '',
//     inputValue: '',
//     searchResult: [],
//     predictions: [],
//     cardNames: [],
//     marker: -1,
//     searchInput: null
// }
const SearchForm = ({ children, classList, type, pathname, placeholder, cardNames }) => {
    const [isActive, setIsActive] = useState(false);
    const [oracleID, setOracleID] = useState(null);
    const {
        inputValue,
        setInputValue,
        setMarker,
        searchTerm,
        setSearchTerm,
        searchInput,
        setPredictions,
        setCardNames,
        displayAutcomplete,
        setDisplayAutocomplete,
        predictions,

        dispatch,
        marker,
        inputRef
    } = useSearch();

    const { updateBlur } = useBlur();
    const { updateFocus } = useFocus();
    const { searchBarRef } = useNavbar();
    const { loading } = useSearchForm(pathname, type);

    // const [state, dispatch] = useReducer(searchReducer, initialState);

    // const {
    //   searchTerm,
    //   inputValue,
    //   searchResult,
    //   predictions,
    //   cardNames,
    //   marker,
    //   searchInput
    // } = state || {};

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

    const handleChange = (e) => {
        const value = e.target.value;

        if (value.length >= 3) {
            // Reset Marker to initial value
            setMarker(-1);
            dispatch({
                type: 'update-value',
                payload: marker
            });

            const filteredCardTitles = cardNames?.filter((title) => {
                return title.toLowerCase().includes(value.toLowerCase());
            });
            !displayAutcomplete && setDisplayAutocomplete(true)
            setPredictions(filteredCardTitles);
        }
        else {
            setDisplayAutocomplete(false);
        }
        // setSearchTerm(value);
        dispatch({
            type: 'update-value',
            payload: value
        });
        setInputValue(value);
    };

    const handleBlur = (e) => {
        if (!searchTerm) {
            updateBlur(type === 'catalog' ? true : false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(predictions[0])
        setSearchTerm(predictions[0]);
    }

    return (
        <div id={`search-${type}-form`} ref={type === 'catalog' ? searchBarRef : null}>
            <form id={`${type}-form`} className='search-form' onSubmit={(e) => handleSubmit(e)}>
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
                    onFocus={(e) => {
                        dispatch({
                            type: 'update-input',
                            payload: {
                                isActive: true,
                                cardNames: cardNames,
                                searchInput: e.target,
                                searchType: e.target.id,
                            }
                        });
                        updateFocus(e.target);
                    }}
                    onBlur={handleBlur}
                    ref={inputRef}
                    placeholder={placeholder}
                />
                {isActive &&
                    <AutoComplete />
                }
                {loading && <Loader classList={'box-size-6 right-1'} />}
            </form>
            {children}
        </div>
    )
}

export default SearchForm
