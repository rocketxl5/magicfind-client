import ArchiveHandlers from './product/ArchiveHandlers'
import CatalogHandlers from './product/CatalogHandlers'
import CollectionHandlers from './product/CollectionHandlers'

const ProductHandlers = ({ product, search, setLoading, handleClick }) => {

    const handlers = {
        archive: <ArchiveHandlers setLoading={setLoading} product={product} />,
        catalog: <CatalogHandlers setLoading={setLoading} product={product} />,
        collection: <CollectionHandlers setLoading={setLoading} product={product} handleClick={handleClick} />
    }
    return (
        <section className="product-handlers">
            {
                handlers[search]
            }
        </section>
    )
}

export default ProductHandlers
