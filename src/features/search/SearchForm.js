import { useEffect } from 'react';
import AutoComplete from './components/AutoComplete';
import Loader from '../../layout/Loader';
import useBlur from '../../hooks/useBlur';
import useFocus from '../../hooks/useFocus';
import useNavbar from '../../hooks/contexthooks/useNavbar';
import useSearch from '../../hooks/contexthooks/useSearch';
import useSearchForm from '../../hooks/useSearchForm';

const SearchForm = ({ children, classList, type, pathname, placeholder, cardNames, inputRef }) => {
    // const [oracleID, setOracleID] = useState(null);

    const { updateBlur } = useBlur();
    const { updateFocus } = useFocus();
    const { searchBarRef } = useNavbar();
    const { 
        inputValue,
        predictions,
        isActive,
        dispatch,
        searchTerm
    } = useSearch();

    const { loading } = useSearchForm(pathname);

    useEffect(() => {
        if (searchTerm) {
            console.log(searchTerm)
        }
    }, [searchTerm]);

    const handleChange = (e) => {
        const value = e.target.value;

        console.log(isActive)

        if (value.length >= 3) {

            dispatch({
                type: 'update-search',
                payload: {
                    // tracker: -1,
                    // isActive: inputRef.current === document.activeElement,
                    inputValue: value,
                    predictions: cardNames?.filter((title) => {
                        return title.toLowerCase().includes(value.toLowerCase())
                    }),
                }
            });

        }
        else {

            dispatch({
                type: 'update-search',
                payload: {
                    // isActive: inputRef.current === document.activeElement,
                    inputValue: value,
                    predictions: [],
                }
            });
        }
    };

    const handleBlur = (e) => {

        // updateBlur(type === 'catalog' ? true : false);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: 'launch-search',
            payload: predictions[0]
        });

    }

    const handleFocus = (e) => {
        console.log(e.target === document.activeElement)
        dispatch({
            type: 'set-search',
            payload: {
                cardNames: cardNames,
                isActive: e.target === document.activeElement,
                searchInput: e.target,
                searchType: e.target.id,
            }
        });
    }

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
