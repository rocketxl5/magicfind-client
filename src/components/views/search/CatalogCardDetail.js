import { useState, useContext, forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../layout/Loading';
import useAuth from '../../../hooks/useAuth';
import { CartContext } from '../../../contexts/CartContext';
import styled from 'styled-components';

const CatalogCardDetail = forwardRef(function CatalogCardDetail({ card, loading }, ref) {
    const [quantitySelected, setQuantitySelected] = useState(0);
    const [quantityAvailable, setQuantityAvailable] = useState(card.quantity);
    const [foundItem, setFoundItem] = useState(undefined);
    const [itemIndex, setItemIndex] = useState(undefined);
    const [showMessage, setShowMessage] = useState(false);
    const { cartItems, setCartItems } = useContext(CartContext);
    const { auth } = useAuth();

    const addToCart = (e) => {
        // console.log(e.target)
        if (quantitySelected) {
            // card.quatity = quantitySelected;
            setCartItems([...cartItems, card])
            // const cart = JSON.parse(localStorage.getItem(('cart')));
            // // console.log(cart)
            // // cart.items = [...cart.items, card];
            // localStorage.setItem('cart', JSON.stringify(cart));
        }
        else {
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }
    }



    const handleChange = (e) => {
        // console.log(e.target)
        // Check if value is greater than quantity available
        // const items = JSON.parse(localStorage.getItem('cart'));
        if (e.target.value < quantitySelected) {
            console.log('is smaller')
            setQuantityAvailable(pre => pre + 1);
        }
        else {
            console.log('is greater')
            setQuantityAvailable(pre => pre - 1);
        }

        setQuantitySelected(parseInt(e.target.value));
    }

    // useEffect(() => {
    //     // foundItem.quantity = quantitySelected;
    //     // console.log(foundItem)
    //     const items = JSON.parse(localStorage.getItem('cart'));

    //     console.log(items[itemIndex].quantity)
    // }, [quantitySelected])

    useEffect(() => {
        if (foundItem) {
            console.log(foundItem)
            if (card.quantity >= foundItem.quantity) {
                setQuantitySelected(foundItem.quantity)
                setQuantityAvailable(foundItem.quantity - card.quantity)
            }
            else {
                throw new Error('An item availability has changed')
            }
        }
    }, [foundItem])

    useEffect(() => {
        // console.log(card._uuid)
        // console.log(cartItems)
        const foundItem = cartItems.find((item, i) => item._uuid = card._uuid);
        if (foundItem) {
            const index = cartItems.findIndex((item) => item._uuid = card._uuid)
            setItemIndex(index)
            setFoundItem(foundItem)
            console.log(foundItem)
        }
    }, [])

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
                                <div className="card-spec">
                                    {/* <p>Price:  <span>{parseFloat(card.price)}</span></p> */}
                                    <p><span className="card-spec-title">Quantity available:</span>  <span className="card-spec-value">{quantityAvailable}</span></p>
                                </div>
                                {card.quantity > 0 &&
                                    <div className="card-spec">
                                        {/* <p><span className="card-spec-title">Quantity:</span>  <span className="card-spec-value">{card.quantity}</span></p> */}
                                        <label htmlFor="quantity"><span className="card-spec-title">Quantity selected:</span></label>
                                        <input className="card-quantity" type="number" name="quantity" id="quantity" min="0" value={quantitySelected} max={card.quantity} onChange={handleChange} ref={ref} />
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
                                <div className="alert-message">
                                    {
                                        showMessage &&
                                        <p>Please select a quantity</p>
                                    }
                                </div>
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
