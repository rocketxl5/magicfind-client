import ArchiveHandlers from './product/ArchiveHandlers'
import CatalogHandlers from './product/CatalogHandlers'
import CollectionHandlers from './product/CollectionHandlers'

const ProductHandlers = ({ card, search, setLoading, handleClick }) => {

    const handlers = {
        archive: <ArchiveHandlers setLoading={setLoading} card={card} />,
        catalog: <CatalogHandlers setLoading={setLoading} card={card} />,
        collection: <CollectionHandlers setLoading={setLoading} card={card} handleClick={handleClick} />
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
