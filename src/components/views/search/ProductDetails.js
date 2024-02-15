import ArchiveDetails from './product/ArchiveDetails';
import CatalogDetails from './product/CatalogDetails';
import CollectionDetails from './product/CollectionDetails';
// import { useParams } from 'react-router-dom'


const ProductDetails = ({ search, card }) => {
    const handlers = {
        archive: <ArchiveDetails card={card} />,
        catalog: <CatalogDetails card={card} />,
        collection: <CollectionDetails card={card} />
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
