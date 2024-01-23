import { useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../layout/Loading';
import useAuth from '../../../hooks/useAuth';
import styled from 'styled-components';

const CatalogCardDetail = forwardRef(function CatalogCardDetail({ card, loading }, ref) {
    const [quantity, setQuantity] = useState(1);
    const { auth } = useAuth();

    const addToCart = (e) => {
        console.log(card)
    }

    return (
        <>
            {
                loading ?
                    (
                        <Loading />
                    ) : (
                        <>
                            <div className="card-info">
                                <div className="card-spec">
                                    <p><span className="card-spec-title">Seller:</span>  <span className="card-spec-value">{card.userName}</span></p>
                                </div>
                                <div className="card-spec">
                                    <p><span className="card-spec-title">Condition:</span> <span className="card-spec-value">{card.condition.toUpperCase()}</span></p>
                                </div>
                                <div className="card-spec">
                                    <p><span className="card-spec-title">Ships From:</span>  <span className="card-spec-value">{card.userCountry}</span></p>
                                </div>
                                <div className="card-spec">
                                    {/* <p>Price:  <span>{parseFloat(card.price)}</span></p> */}
                                    <p><span className="card-spec-title">Price:</span>  <span className="card-spec-value">{card.price}</span></p>
                                </div>
                                {card.quantity > 0 &&
                                    <div className="card-spec">
                                        {/* <p><span className="card-spec-title">Quantity:</span>  <span className="card-spec-value">{card.quantity}</span></p> */}
                                        <label htmlFor="quantity"><span className="card-spec-title">Quantity:</span></label>
                                        <input className="card-quantity" type="number" name="quantity" id="quantity" min="1" value={quantity} max={card.quantity} onChange={(e) => setQuantity(e.target.value)} ref={ref} />
                                    </div>
                                }
                                {auth && (
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

                                <div className="card-btns">
                                    <div className="btn-container">
                                        <button id="add-to-wishlist" className="btn bg-green color-light" type="button" >Add to Wishlist</button>
                                    </div>
                                    <div className="btn-container">
                                        <button id="add-to-cart" className="btn bg-yellow color-light" type="button" onClick={addToCart}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
            }

        </>

    )
})

const Contact = styled(Link)`
    display: block;
    text-align: center;
    margin-inline-end: 1rem;
    padding-block: 0.5em;
    margin-top: 0.5em;
    font-size: var(--fs-125);
    color: var(--clr-primary);
    border: 1px solid #e4e4e4;
    border-radius: 5px;
  `;


export default CatalogCardDetail
