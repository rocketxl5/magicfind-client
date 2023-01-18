import React, { Fragment, useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPlusCircle, FiMinusCircle, FiTrash2 } from 'react-icons/fi';
import CartItem from './CartItem';
import { UserContext } from '../../contexts/UserContext';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import styled from 'styled-components';

function ShoppingCart() {
  const [totalItems, setTotalItems] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useContext(UserContext);
  const { cartItems, setCartItems } = useContext(ShoppingCartContext);
  const history = useHistory();

  // This is where the amount or items in the cart is set & the subtotal of off all items in the cart
  useEffect(() => {
    let amount = 0;
    let items = 0;
    cartItems.forEach((cartItem) => {
      items += cartItem.quantity_selected;
      amount += cartItem.quantity_selected * cartItem.price;
    });

    setSubTotal(amount);
    setTotalItems(items);
  }, [cartItems]);

  const handleCheckout = () => {
    // setLoading(true);
    if (!user) {
      history.push('/login');
    } else {
      const input = {
        userID: user.id,
        cartItems: cartItems
      };
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': user.token
        },
        body: JSON.stringify(input)
      };

      fetch(`/api/cart/`, options)
        .then((res) => res.json())
        .then((data) => {
          // setLoading(false);
          // setCartItems([]);
          // history.push('/confirmation');
          console.log(data);
        })
        .catch((error) => console.log('error', error));
    }
  };
  return (
    <div>
      <h2 className="page-title">Shopping Cart</h2>
      <Container>
        {cartItems.length > 0 ? (
          <Items>
            <Header>
              <h3>Items</h3>
              <h3>Price</h3>
            </Header>

            {cartItems &&
              cartItems.map((item) => {
                return <CartItem item={item} setIsUpdating={setIsUpdating} />;
              })}
          </Items>
        ) : (
          <div>Your Cart is Empty</div>
        )}
        {cartItems.length > 0 ? (
          <Aside className={isUpdating ? 'loading' : ''}>
            <h3>Subtotal</h3>
            {!isUpdating && totalItems ? (
              <p>
                {`(${totalItems} items): `}
                <strong>{`$ ${subTotal}.00`}</strong>
              </p>
            ) : (
              <p>
                {`(${totalItems} items): `}
                <strong>{`$ ${subTotal}.00`}</strong>
              </p>
            )}

            <CheckoutButton
              onClick={() => {
                handleCheckout();
              }}
            >
              Checkout
            </CheckoutButton>
          </Aside>
        ) : (
          ''
        )}
      </Container>
    </div>
  );
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1em;
`;

const Items = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.main`
  display: flex;
  width: 100%;
  padding: 0 1em;
  background: #e1e8ed;
`;
const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 25%;
  background: #fff;
  height: 20vh;
  padding: 1em;
  margin: 4em 0 1em 1em;

  h3 {
    text-align: center;
    padding-bottom: em;
  }

  p {
  }
`;
const CheckoutButton = styled.button`
  width: 100%;
  padding: 1em 0;
  font-size: 1rem;

  background: #ffc107;
  border: none;
`;

export default ShoppingCart;
