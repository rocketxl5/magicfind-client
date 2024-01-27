import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { FiPlusCircle, FiMinusCircle, FiTrash2 } from 'react-icons/fi';
import CartItem from './CartItem';
import useAuth from '../../hooks/useAuth';
import { CartContext } from '../../contexts/CartContext';
import { api } from '../../api/resources';
import styled from 'styled-components';
import Loading from '../layout/Loading';

function ShoppingCart() {
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { auth } = useAuth();
  const { cartItems, subTotal, itemsCount } = useContext(CartContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log('loading', loading)
  }, [loading])
  // This is where the amount or items in the cart is set & the subtotal of off all items in the cart
  // useEffect(() => {
  //   let amount = 0;
  //   let items = 0;
  //   cartItems.forEach((cartItem) => {
  //     items += cartItem.quantity_selected;
  //     amount += cartItem.quantity_selected * cartItem.price;
  //   });

  //   setSubTotal(amount);
  //   setTotalItems(items);
  // }, [cartItems]);

  const handleCheckout = () => {
    // setLoading(true);
    if (!auth) {
      navigate('/login');
    } else {
      const input = {
        userID: auth.id,
        cartItems: cartItems,
      };
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': auth.token,
        },
        body: JSON.stringify(input),
      };

      fetch(`${api.serverURL}/api/cart/`, options)
        .then((res) => res.json())
        .then((data) => {
          // setLoading(false);
          // setCartItems([]);
          // navigate('/confirmation');
          console.log(data);
        })
        .catch((error) => console.log('error', error));
    }
  };
  return (
    <div className="content">
      <header className="header">
        <h2 className="title">Shopping Cart</h2>
      </header>
      <main className="main">
        <Container>
        {cartItems.length > 0 ? (
            <>
          <Items>
            <Header>
              <h3>Items</h3>
              <h3>Price</h3>
            </Header>

            {cartItems &&
                  cartItems.map((item, i) => <CartItem key={i} item={item} index={i} setLoading={(value) => setLoading(value)} />)}
              </Items>
          <Aside className={isUpdating ? 'loading' : ''}>
                <>
                  <h3>Subtotal</h3>
                  {
                    loading ? (
                      <Loading />
                    ) : (
                      <p>
                    {`(${itemsCount} items): `}
                          <strong>{`$ ${subTotal}.00`}</strong>
                        </p>
                    )
                  }

                  <CheckoutButton
                    type="button"
                    onClick={() => {
                      handleCheckout();
                    }}
                  >
                    Checkout
                  </CheckoutButton>
                </>
              </Aside>
            </>
        ) : (
            <div>Your Cart is Empty</div>
          )}
      </Container>
      </main>
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
