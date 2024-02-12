import { useParams } from 'react-router-dom'

const ProductDetails = () => {
    const { name } = useParams();

    return (
        <div>
            <h2>Product Details</h2>
            <p>{name}</p>
        </div>
    )
}

export default ProductDetails
