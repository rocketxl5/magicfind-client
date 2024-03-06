import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

const SearchIcon = () => {

    return (
        <Label htmlFor="mobile-nav" className="nav-icon search-icon">
            <FiSearch className="nav-icon" />
        </Label>
    );
}
const Label = styled.label`
&:hover {
    cursor: pointer;
}
svg {
    display: block;

    @media (width >= 775px) {
        display: none;
    }
}

`;
export default SearchIcon;
