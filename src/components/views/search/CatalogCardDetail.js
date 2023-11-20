import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../layout/Loading';
import useAuth from '../../../hooks/useAuth';
import styled from 'styled-components';

const CatalogCardDetail = (props) => {
    const { card } = props;
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleClick = (e) => {
        console.log(e.target)
    }

    return (

        <>
            {
                loading ?
                    (
                        <Loading />
                    ) : (
                        <>
                            <div className="card-name">
                                <p><span>{card.name}</span></p>
                            </div>
                            <div className="card-info">
                                <div className="card-seller">
                                    <p>Seller:  <span>{card.userName}</span></p>
                                </div>
                                <div className="card-condition">
                                    <p>Condition: <span>{card.condition.toUpperCase()}</span></p>
                                </div>
                                <div className="card-shipping">
                                    <p>Ships From:  <span>{card.userCountry}</span></p>
                                </div>
                                <div className="card-price">
                                    {/* <p>Price:  <span>{parseFloat(card.price)}</span></p> */}
                                    <p>Price:  <span>{card.price}</span></p>
                                </div>
                                {card.quantity > 0 &&
                                    <div className="card-quantity">
                                        <p>Quantity:  <span>{card.quantity}</span></p>
                                    </div>
                                }
                                {user && (
                                    <div className="contact-user">
                                        <Contact
                                            to={{
                                                pathname: '/mail/message',
                                                state: { sender: card.userName, subject: card.name },
                                            }}
                                        >
                                            Contact Seller
                                        </Contact>
                                    </div>
                                )}


                            </div>

                            <div className="card-btn-container">
                                <button id="cart-card" className="card-btn bg-yellow color-dark" type="button" onClick={handleClick}>Add to Cart</button>
                            </div>
                        </>
                    )
            }

        </>

    )
}

const Contact = styled(Link)`
    display: block;
    text-align: center;
    margin-inline-end: 1rem;
    padding-block: 0.5em;
    margin-top: 0.5em;
    font-size: var(--fs-125);
    color: var(--clr-blue);
    border: 1px solid #e4e4e4;
    border-radius: 5px;
  `;


export default CatalogCardDetail
