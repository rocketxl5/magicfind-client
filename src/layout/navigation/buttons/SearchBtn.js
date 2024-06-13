import { FiSearch } from 'react-icons/fi';
import useNavContext from '../../../hooks/contexthooks/useNavContext';
import useNavButton from '../../../hooks/useNavButton';

const SearchBtn = () => {
    const { searchBtnRef } = useNavContext();
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
