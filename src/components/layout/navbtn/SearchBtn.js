import React, { useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';
import { SearchContext } from '../../../contexts/SearchContext';
import handleSearchBar from '../../utilities/handleSearchBar';

const SearchBtn = () => {
    // const { setSearchTerm } = useContext(SearchContext);
    // //   Handle search bar and menu animation
    // const handleClick = (e) => {
    //     handleSearchBar(e.target, (state) => { setSearchTerm(state) });
    // }
    return (
        <Label htmlFor="mobile-nav" className="nav-btn search-btn search-nav-label">
            <FiSearch className="nav-icon" size={28} title="Search Catalog" />
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
export default SearchBtn;
