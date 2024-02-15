import { useState, useContext, useEffect } from 'react';
import Loading from '../../../layout/Loading';
import { CartContext } from '../../../../contexts/CartContext';
import { api } from '../../../../api/resources';
import styled from 'styled-components';

const CatalogHandlers = ({ product }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [quantitySelected, setQuantitySelected] = useState(0);
    const [isCartItem, setIsCartItem] = useState(false);
    const [itemIndex, setItemIndex] = useState(undefined);
    const { cartItems, setCartItems } = useContext(CartContext);
    const handleChange = (e) => {

        const value = parseInt(e.target.value);

        setIsLoading(true);

        const options = {
            method: 'GET',
            header: { 'Content-Type': 'application/json' },
        };

        fetch(
            `${api.serverURL}/api/catalog/${product.userID}/${product._id}/${value}`,
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
                        setCartItems([...cartItems, { selected: product, quantity: value }])

                    }
                    setQuantitySelected(value);
                } else {
                    setQuantitySelected(product._quantity);
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
            return item.selected._id === product._id
        });
        if (foundIndex >= 0) {
            setIsCartItem(true);
            setItemIndex(foundIndex);
        }
    }, [])
    return (
        <>
            {
                isLoading ?
                    (
                        <Loading />
                    ) : (

                        <div className="product-order">
                            {/* <div className="">
                                <p><span className="">Ships From:</span>  <span className="card-spec-value">{product.country}</span></p>
                            </div> */}
                            <div className="">
                                <p><span className="">Price:</span>  <span className="card-spec-value">{product.price}</span></p>
                            </div>
                            <div className="">
                                <p><span className="">Quantity Available:</span>  <span className="card-spec-value">{product.quantity}</span></p>
                            </div>
                            {
                                product.quantity &&
                                <Selector>
                                    <select
                                        id="quantity"
                                        name="quantity"
                                        value={quantitySelected}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {[...Array(product.quantity + 1).keys()].map((key) => {

                                            return (
                                                <option key={key} value={`${key}`}>
                                                    {key}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </Selector>

                            }
                        </div>
                    )
            }

        </>
    )
}

const Selector = styled.div`
  display: flex;
  justify-content: space-between;
  width: 10em;
  padding: 0.5em 0;

  select {
    padding: 0.2em;
    width: 4em;
    height: 4rem;

  }
`;

export default CatalogHandlers
