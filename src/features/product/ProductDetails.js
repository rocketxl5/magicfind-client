import ArchiveDetails from './components/ArchiveDetails';
import CatalogDetails from './components/CatalogDetails';
import CollectionDetails from './components/CollectionDetails';
// import { useParams } from 'react-router-dom'


const ProductDetails = ({ id, product, search }) => {
    const details = {
        archive: <ArchiveDetails product={product} />,
        catalog: <CatalogDetails product={product} />,
        collection: <CollectionDetails product={product} />
    }
    return (

            <div className="product-details border-success">
                {
                    details[search]
                }
        </div>
    )
}

export default ProductDetails
