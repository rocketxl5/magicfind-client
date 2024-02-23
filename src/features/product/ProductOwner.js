import CatalogOwner from './components/CatalogOwner'
import CollectionOwner from './components/CollectionOwner'

const ProductOwner = ({ id, product, active, search, setLoading, handleClick }) => {

    const status = {
        catalog: <CatalogOwner setLoading={setLoading} product={product} />,
        collection: <CollectionOwner setLoading={setLoading} product={product} handleClick={handleClick} />
    }
    return (
        <section id={id} className={active === id ? 'd-block' : 'd-none'}>
            <div className="product-owner border-succes">
                {status[search]}
            </div>
        </section>
    )
}

export default ProductOwner