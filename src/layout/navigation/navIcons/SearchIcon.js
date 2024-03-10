import { FiSearch } from 'react-icons/fi';
import useNavbar from '../../../hooks/contexthooks/useNavbar.js';
import useSearch from '../../../hooks/contexthooks/useSearch.js';

const SearchIcon = () => {
    const { searchIconRef, setDisplaySearchBar, hamburgerRef } = useNavbar();
    const { catalogInputRef } = useSearch();

    const handleClick = () => {
        // Trigger search bar display
        setDisplaySearchBar(true);
        hamburgerRef.current?.setAttribute('aria-expanded', 'true');
        // Disable hamburger button
        // Hamburger closing animation triggers 
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
