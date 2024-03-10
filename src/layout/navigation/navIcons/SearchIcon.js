import { FiSearch } from 'react-icons/fi';
import useNav from '../../../hooks/contexthooks/useNav.js';
import useSearch from '../../../hooks/contexthooks/useSearch.js';

const SearchIcon = () => {
    const { searchIconRef, setDisplaySearchBar, hamburgerRef } = useNav();
    const { catalogInputRef } = useSearch();

    const handleClick = () => {
        // Trigger search bar display
        setDisplaySearchBar(true);
        hamburgerRef.current?.setAttribute('aria-expanded', 'true');
        hamburgerRef.current.disabled = true;
        catalogInputRef.current.focus();
    }

    return (
        <button id="search-btn" type='button' className="nav-icon search-btn" onClick={handleClick} ref={searchIconRef}>
            <FiSearch className="nav-icon" />
        </button>
    );
}

export default SearchIcon;
