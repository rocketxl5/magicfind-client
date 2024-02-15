import ArchiveHandlers from './product/ArchiveHandlers'
import CatalogHandlers from './product/CatalogHandlers'
import CollectionHandlers from './product/CollectionHandlers'

const ProductHandlers = ({ card, search, setLoading, handleModelProductState }) => {
    const handlers = {
        archive: <ArchiveHandlers setLoading={setLoading} card={card} />,
        catalog: <CatalogHandlers setLoading={setLoading} card={card} />,
        collection: <CollectionHandlers setLoading={setLoading} card={card} handleClick={handleModelProductState} />
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
