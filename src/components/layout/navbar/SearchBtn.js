import React from 'react';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

const SearchBtn = () => {
    return (
        <Search className="search-icon">
            <Label htmlFor="search-toggle" className="search-toggle-label">
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
        font-size: 3rem;
        display: block;
        color: #d8d6d3;
    }
`;
export default SearchBtn;
