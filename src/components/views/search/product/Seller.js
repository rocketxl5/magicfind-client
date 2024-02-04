import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import styled from 'styled-components';

const Seller = ({ product }) => {
    const { isAuth } = useAuth();

    return (

        <div className="product-section">
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
                        pathname: '/me/mail/message',
                        state: { sender: product.userName, subject: product.name },
                    }}>
                        Contact Seller
                    </Link>
                    </div>
            }
        </div>
    )
}

export default Seller
