import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import styled from 'styled-components';

const Seller = ({ product }) => {
    const { isAuth } = useAuth();

    return (

        <div className="card-info">
            <div className="card-spec">
                <p><span className="card-spec-title">Seller:</span>  <span className="card-spec-value">{product.userName}</span></p>
            </div>
            <Contact>
                <Link
                    to={`/store/${product.userID}`}
                >
                    Visit Seller Store
                </Link>
            </Contact>

            {
                isAuth &&
                <Contact>
                    <Link to={{
                        pathname: '/me/mail/message',
                        state: { sender: product.userName, subject: product.name },
                    }}>
                        Contact Seller
                    </Link>
                </Contact>
            }
        </div>
    )
}

const Contact = styled.div`

margin-top: 0.5em;
text-align: center;
border: 1px solid #e4e4e4;
border-radius: 5px;

a {
    padding-block: 0.5em;
    padding-inline: 1em;
    display: block;
        width: 100%;
        font-size: var(--fs-125);
        color: var(--clr-primary);
    }
  `;

export default Seller
