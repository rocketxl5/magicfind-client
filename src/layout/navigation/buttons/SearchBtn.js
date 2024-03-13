import { FiSearch } from 'react-icons/fi';
import useNavbar from '../../../hooks/contexthooks/useNavbar';
import useNavButton from '../../../hooks/useNavButton';

const SearchBtn = () => {
    const { searchBtnRef } = useNavbar();
    const { searchButtonHandler } = useNavButton();

    return (
        <button
            id="search-btn"
            type='button'
            className="nav-btn search-btn"
            onClick={() => searchButtonHandler()}
            ref={searchBtnRef}
        >
            <FiSearch />
        </button>
    );
}

export default SearchBtn;
