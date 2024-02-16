import ArchiveDetails from './product/ArchiveDetails';
import CatalogDetails from './product/CatalogDetails';
import CollectionDetails from './product/CollectionDetails';
// import { useParams } from 'react-router-dom'


const ProductDetails = ({ search, product }) => {
    const handlers = {
        archive: <ArchiveDetails product={product} />,
        catalog: <CatalogDetails product={product} />,
        collection: <CollectionDetails product={product} />
    }
    return (
        <section className="product-details">
            {
                handlers[search]
            }
        </section>
    )
}

export default ProductDetails
