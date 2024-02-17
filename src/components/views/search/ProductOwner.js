import CatalogOwner from './product/CatalogOwner'
import CollectionOwner from './product/CollectionOwner'

const ProductHandlers = ({ product, search, setLoading, handleClick }) => {

    const handlers = {
        catalog: <CatalogOwner setLoading={setLoading} product={product} />,
        collection: <CollectionOwner setLoading={setLoading} product={product} handleClick={handleClick} />
    }
    return (
        <section className="product-owner">
            {
                handlers[search]
            }
        </section>
    )
}

export default ProductHandlers