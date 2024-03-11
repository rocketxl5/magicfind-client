import { FiSearch } from 'react-icons/fi';
import useNavbar from '../../../hooks/contexthooks/useNavbar.js';
import useSearch from '../../../hooks/contexthooks/useSearch.js';
import useSearchBtn from '../../../hooks/useSearchBtn.js';

const SearchBtn = () => {
    const { searchBtnRef, hamburgerRef } = useNavbar();
    const { catalogInputRef } = useSearch();

    const { searchBtnHandler } = useSearchBtn(hamburgerRef, catalogInputRef)

    return (
        <button
            id="search-btn"
            type='button'
            className="nav-btn search-btn"
            onClick={(e) => searchBtnHandler(e.target.id)}
            ref={searchBtnRef}
        >
            <FiSearch className="nav-btn" />
        </button>
    );
}

export default SearchBtn;
