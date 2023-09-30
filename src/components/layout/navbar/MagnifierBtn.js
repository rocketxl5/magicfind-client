import React from 'react';
import { FiSearch } from 'react-icons/fi';

const MagnifierBtn = () => {
    return (
        <div className="nav-icon">
            <label htmlFor="search-toggle" className="search-toggle-label">
                <FiSearch size={25} />
            </label>
        </div>
    )
}

export default MagnifierBtn
