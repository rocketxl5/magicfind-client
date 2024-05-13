import { FiSearch } from 'react-icons/fi';
import useNav from '../../../hooks/contexthooks/useNavbar';
import useNavButton from '../../../hooks/useNavButton';

const SearchBtn = () => {
    const { searchBtnRef } = useNav();
    const { handleSearchBar } = useNavButton();

    return (
        <button
            id="search-btn"
            type='button'
            className="nav-btn search-btn"
            onClick={() => handleSearchBar(true)}
            ref={searchBtnRef}
        >
            <FiSearch />
        </button>
    );
}

export default SearchBtn;
