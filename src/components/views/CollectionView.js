import React from 'react';
import SearchCollection from './search/SearchCollection';
import SearchApi from './search/SearchAPI';

const CollectionView = () => {
    return (
        <div className="content">
            Collection
            <SearchCollection />
            <SearchApi />
        </div>
    )
}

export default CollectionView
