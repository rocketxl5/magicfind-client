import React from 'react';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

const SearchBtn = () => {
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
