import { FiSearch } from 'react-icons/fi';
import useNav from '../../../hooks/contexthooks/useNav.js';

const SearchIcon = () => {
    const { searchIconRef } = useNav();

    return (
        <label id="search-icon" htmlFor="mobile-nav" className="nav-icon search-icon" ref={searchIconRef}>
            <FiSearch className="nav-icon" />
        </label>
    );
}

export default SearchIcon;
