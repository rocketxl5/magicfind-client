import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../layout/Loading';
import useAuth from '../../../hooks/useAuth';
import { CartContext } from '../../../contexts/CartContext';
import { api } from '../../../api/resources';
import styled from 'styled-components';

const CatalogCardDetail = (props) => {
    const { card } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [quantitySelected, setQuantitySelected] = useState(0);
    const [isCartItem, setIsCartItem] = useState(false);
    const [itemIndex, setItemIndex] = useState(undefined);
    const [showMessage, setShowMessage] = useState(false);
    const { cartItems, setCartItems } = useContext(CartContext);
    const { auth, isAuth } = useAuth();

    const addToCart = (e) => {
        e.stopPropagation();

        // if (quantitySelected === cartItems[itemIndex].quantity) {
        //     setShowMessage(true)
        //     setTimeout(() => {
        //         return setShowMessage(false);
        //     }, 3000);

        // }
        if (itemIndex) {
            setCartItems([...cartItems, { selected: card, quantity: quantitySelected }])
            setIsCartItem(true);
        }

        // if (isCartItem) {
        //     const items = JSON.parse(localStorage.getItem('cart'));
        //     items[itemIndex].quantity = quantitySelected;
        //     setCartItems(items);
        // } else {

        //     setCartItems([...cartItems, { selected: card, quantity: quantitySelected }])
        //     setIsCartItem(true);
        // }
    }

    const handleChange = (e) => {

        const value = parseInt(e.target.value);

        setIsLoading(true);

        const options = {
            method: 'GET',
            header: { 'Content-Type': 'application/json' },
        };

        fetch(
            `${api.serverURL}/api/catalog/${card.userID}/${card._id}/${value}`,
            options
        )
            .then((res) => res.json())
            .then((data) => {
                setIsLoading(false);
                if (data.isAvailable) {
                    if (isCartItem) {

                        const items = JSON.parse(localStorage.getItem('cart'));
                        items[itemIndex].quantity = value;
                        setCartItems(items);
                    }
                    else {
                        setCartItems([...cartItems, { selected: card, quantity: value }])

                    }
                    setQuantitySelected(value);
                } else {
                    setQuantitySelected(card._quantity);
                }
            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error.message)
            })
    }

    useEffect(() => {
        setQuantitySelected(cartItems[itemIndex]?.quantity)
    }, [itemIndex])

    useEffect(() => {

        const foundIndex = cartItems.findIndex((item) => {
            return item.selected._id === card._id
        });
        if (foundIndex >= 0) {
            setIsCartItem(true);
            setItemIndex(foundIndex);
        }
    }, [])

    // useEffect(() => { console.log(data) }, [data])

    return (
        <>
            {
                isLoading ?
                    (
                        <Loading />
                    ) : (
                        <>
                            <div className="card-info">
                                <div className="card-spec">
                                    <p><span className="card-spec-title">Seller:</span>  <span className="card-spec-value">{card.userName}</span></p>
                                </div>
                                <div className="card-spec">
                                    <p><span className="card-spec-title">Condition:</span><span className="card-spec-value">{card.condition?.toUpperCase()}</span></p>
                                </div>
                                <div className="card-spec">
                                    <p><span className="card-spec-title">Ships From:</span>  <span className="card-spec-value">{card.country}</span></p>
                                </div>
                                <div className="card-spec">
                                    <p><span className="card-spec-title">Price:</span>  <span className="card-spec-value">{card.price}</span></p>
                                </div>
                                {/* <div className="card-spec">
                                    <p><span className="card-spec-title">Quantity available:</span>  <span className="card-spec-value">{quantityAvailable}</span></p>
                                </div> */}
                                <p><span className="card-spec-title">Quantity Available:</span>  <span className="card-spec-value">{card.quantity}</span></p>

                                <label htmlFor="quantity"><span className="card-spec-title">Quantity selected:</span></label>
                                {card.quantity &&
                                    <div className="card-spec">
                                        <Selector>
                                            <select
                                                id="quantity"
                                                name="quantity"
                                                value={quantitySelected}
                                                onChange={(e) => handleChange(e)}
                                            >
                                                {[...Array(card.quantity + 1).keys()].map((key) => {

                                                    return (
                                                        <option key={key} value={`${key}`}>
                                                            {key}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </Selector>
                                    </div>
                                }

                                <Contact>
                                    <Link
                                        to={`/store/${card.userID}`}
                                    >
                                        Visit Seller Store
                                    </Link>
                                </Contact>

                                {isAuth && (

                                    <Contact>
                                        <Link to={{
                                            pathname: '/me/mail/message',
                                                state: { sender: card.userName, subject: card.name },
                                        }}>
                                            Contact Seller
                                        </Link>
                                        </Contact>

                                )}
                                <div className="alert-message">
                                    {
                                        showMessage &&
                                        <p>Please select a quantity</p>
                                    }
                                </div>
                                <div className="card-btns">
                                    <div className="btn-container">
                                        {
                                            // !isCartItem &&
                                            //     <button id="add-to-cart" className="btn bg-yellow color-light" type="button" onClick={addToCart}>Add to Cart</button>

                                            //     :
                                            //     <button id="add-to-cart" className="btn bg-green color-light" type="button" onClick={updateCart}>Update Cart</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    )
            }

        </>

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

const Selector = styled.div`
  display: flex;
  justify-content: space-between;
  width: 10em;
  padding: 0.5em 0;

  select {
    padding: 0.2em;
    width: 4em;
  }


`;

export default CatalogCardDetail
