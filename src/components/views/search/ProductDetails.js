import ArchiveDetails from './product/ArchiveDetails';
import CatalogDetails from './product/CatalogDetails';
import CollectionDetails from './product/CollectionDetails';
// import { useParams } from 'react-router-dom'


const ProductDetails = ({ id, product, active, search }) => {
    const details = {
        archive: <ArchiveDetails product={product} />,
        catalog: <CatalogDetails product={product} />,
        collection: <CollectionDetails product={product} />
    }
    return (
        <section id={id} className={active === id ? 'd-block' : 'd-none'}>
            <div className="product-details border-success">
            {
                    details[search]
            }
            </div>
        </section>
    )
}

export default ProductDetails
