import React from 'react';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

const SearchBtn = () => {
    return (
        <Search>
            <Label htmlFor="mobile-nav" className="search-nav-label nav-icon">
                <FiSearch size={28} />
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
