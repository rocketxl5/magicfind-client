import { FiSearch } from 'react-icons/fi';
import useNav from '../../../hooks/contexthooks/useNav.js';
import useSearch from '../../../hooks/contexthooks/useSearch.js';

const SearchIcon = () => {
    const { searchIconRef } = useNav();
    const { catalogInputRef } = useSearch();

    const handleClick = () => {
        catalogInputRef.current.focus();
    }

    return (
        <label id="search-icon" htmlFor="mobile-nav" className="nav-icon search-icon" ref={searchIconRef} onClick={handleClick}>
            <FiSearch className="nav-icon" />
        </label>
    );
}

export default SearchIcon;
