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
    const [isCartItem, setIsCartItem] = useState(false);
    const [itemIndex, setItemIndex] = useState(undefined);
    const [showMessage, setShowMessage] = useState(false);
    const { cartItems, setCartItems } = useContext(CartContext);
    const { auth } = useAuth();

    const addToCart = (e) => {
        e.stopPropagation();

        if (quantitySelected) {
            setCartItems([...cartItems, { selected: card, quantity: quantitySelected, total: card.price * parseInt(quantitySelected) }])
            setIsCartItem(true);
        }
        else {
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }
    }

    const updateCart = (e) => {
        e.stopPropagation();
        const items = JSON.parse(localStorage.getItem('cart'));

        if (items[itemIndex].quantity === quantitySelected) {

            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }
        else {
            if (!quantitySelected) {
                setIsCartItem(false);
                items.splice(itemIndex, 1);
            }
            else {
                items[itemIndex].quantity = quantitySelected;
                items[itemIndex].total = quantitySelected * items[itemIndex].selected.price;
                !isCartItem && setIsCartItem(true);
            }

            setCartItems(items);
            localStorage.setItem('cart', JSON.stringify(items));
        }
    }

    const handleChange = (e) => {
        e.stopPropagation();
        const quantity = parseInt(e.target.value);
        if (quantity > quantitySelected) {
            setQuantityAvailable(pre => pre - 1);
        }
        else {
            setQuantityAvailable(pre => pre + 1);
        }
        // Update quantity selected
        setQuantitySelected(parseInt(e.target.value));
    }

    useEffect(() => {
        if (isCartItem) {
            if (foundItem) {
                if (card.quantity >= foundItem.quantity) {
                    setQuantitySelected(foundItem.quantity)
                    setQuantityAvailable(card.quantity - foundItem.quantity)
                }
                else {
                    throw new Error('Item\'s availability has changed')
                }
            }
        }
    }, [isCartItem])

    useEffect(() => {
        const item = cartItems.find((item, i) => item.selected._id === card._id);
        // console.log(item)
        if (item) {
            const index = cartItems.findIndex((item) => item.selected._id === card._id)
            setItemIndex(index)
            setFoundItem(item)
            item.quantity && setIsCartItem(true);
        } else { }
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
                                    <p><span className="card-spec-title">Price:</span>  <span className="card-spec-value">{card.price}</span></p>
                                </div>
                                <div className="card-spec">
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
                                    {/* <div className="btn-container">
                                        <button id="add-to-wishlist" className="btn bg-green color-light" type="button" >Add to Wishlist</button>
                                    </div> */}
                                    <div className="btn-container">
                                        {
                                            !isCartItem ? 
                                                <button id="add-to-cart" className="btn bg-yellow color-light" type="button" onClick={addToCart}>Add to Cart</button>
                                                :
                                                <button id="add-to-cart" className="btn bg-green color-light" type="button" onClick={updateCart}>Update Cart</button>
                                        }
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
