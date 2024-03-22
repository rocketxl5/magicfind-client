import { useState } from 'react';
import ArchiveHandlers from './components/ArchiveHandlers';
import CatalogItem from '../products/CatalogItem'
import CollectionHandlers from './components/CollectionHandlers'

const Product = ({ id, product, active, search, handleClick }) => {
    const [loading, setLoading] = useState(false);

    const productType = {
        archive: <ArchiveHandlers
            loading={loading}
            setLoading={value => setLoading(value)}
            product={product}
        />,
        catalog: <CatalogItem
            loading={loading}
            setLoading={value => setLoading(value)}
            product={product}
        />,
        collection: <CollectionHandlers
            loading={loading}
            setLoading={value => setLoading(value)}
            product={product}
            handleClick={handleClick}
        />
    }
    return productType[search];
}

export default Product