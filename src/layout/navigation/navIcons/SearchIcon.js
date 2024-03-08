import { FiSearch } from 'react-icons/fi';
import useMenu from '../../../hooks/contexthooks/useMenu';

const SearchIcon = () => {
    const { searchIconRef } = useMenu();

    return (
        <label id="search-icon" htmlFor="mobile-nav" className="nav-icon search-icon" ref={searchIconRef}>
            <FiSearch className="nav-icon" />
        </label>
    );
}

export default SearchIcon;
