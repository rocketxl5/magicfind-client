import { useState } from 'react';
import ArchiveHandlers from './components/ArchiveHandlers';
import CatalogHandlers from './components/CatalogHandlers'
import CollectionHandlers from './components/CollectionHandlers'

const ProductHandlers = ({ id, product, active, search, handleClick }) => {
    const [loading, setLoading] = useState(false);

    const handlers = {
        archive: <ArchiveHandlers
            loading={loading}
            setLoading={value => setLoading(value)}
            product={product}
        />,
        catalog: <CatalogHandlers
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
    return (

            <div className="product-handlers border-red">
                {
                    handlers[search]
                }
            </div>

    )
}

export default ProductHandlers