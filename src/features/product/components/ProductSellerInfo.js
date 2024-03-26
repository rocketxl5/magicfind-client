import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/contexthooks/useAuth';

const ProductSellerInfo = ({ product }) => {
    const { isAuth } = useAuth();
    return (
        <div className="catalog-owner">
            <div className="">
                <p><span className="">{product.userName}</span></p>
            </div>
            <div className="contact-link">
                <Link
                    to={`/store/${product.userID}`}
                >
                    To Store
                </Link>
            </div>

            {
                isAuth &&
                <div className="contact-link">
                    <Link to={{
                        pathname: '/mail/message',
                        state: { sender: product.userName, subject: product.name },
                    }}>
                        Contact Seller
                    </Link>
                </div>
            }
        </div>
    )
}

export default ProductSellerInfo