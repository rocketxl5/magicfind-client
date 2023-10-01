import React from 'react';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

const SearchBtn = () => {
    return (
        <Search className="nav-icon">
            <Label htmlFor="mobile-nav" className="search-nav-label">
                <FiSearch size={30} />
            </Label>
        </Search>
    )
}

const Search = styled.div`
   
    @media (width >= 725px) {
        display: none;
    }
`;

const Label = styled.label`
    svg {
        display: block;
    }
`;
export default SearchBtn;
