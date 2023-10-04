import React from 'react';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

const SearchBtn = () => {
    return (
        <Search id="search-btn">
            <Label htmlFor="mobile-nav" className="nav-btn search-btn">
                <FiSearch className="nav-icon" size={28} title="Search Catalog" />
            </Label>
        </Search>
    )
}

const Search = styled.div`
   
`;

const Label = styled.label`
&:hover {
    cursor: pointer;
}
    svg {
        display: block;
    }
`;
export default SearchBtn;
