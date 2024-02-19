import ArchiveHandlers from './product/ArchiveHandlers'
import CatalogHandlers from './product/CatalogHandlers'
import CollectionHandlers from './product/CollectionHandlers'

const ProductHandlers = ({ id, product, active, search, setLoading, handleClick }) => {

    const handlers = {
        archive: <ArchiveHandlers setLoading={setLoading} product={product} />,
        catalog: <CatalogHandlers setLoading={setLoading} product={product} />,
        collection: <CollectionHandlers setLoading={setLoading} product={product} handleClick={handleClick} />
    }
    return (
        <section id={id} className={active === id ? 'd-block' : 'd-none'}>
            <div className="product-handlers border-succes">
            {
                handlers[search]
            }
            </div>
        </section>
    )
}

export default ProductHandlers
