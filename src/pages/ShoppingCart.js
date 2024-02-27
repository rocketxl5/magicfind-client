import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { FiPlusCircle, FiMinusCircle, FiTrash2 } from 'react-icons/fi';
import CartItem from '../components/CartItem';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import styled from 'styled-components';
import Loading from '../layout/Loading';

function ShoppingCart() {
  const [loading, setLoading] = useState(false);
  const { cartItems, subTotal, itemsCount } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <>
      <main className="main shopping-cart">
      <header className="header">
        <h2 className="title">Shopping Cart</h2>
        </header>
        <Container>
          {
            cartItems.length ? (
            <>
          <Items>
            <Header>
              <h3>Items</h3>
              <h3>Price</h3>
            </Header>
                  <div className="cart-items">
                    {
                      cartItems.map((item, i) => {
                        return (
                          <CartItem key={i} item={item} index={i} setLoading={(value) => setLoading(value)} />
                        )
                      })
                    }
                  </div>
              </Items>
              <Aside>
                <>
                  <h3>Subtotal</h3>
                  {
                    loading ? (
                      <Loading />
                    ) : (
                      <p>
                            {`(${itemsCount} items) : `}
                            <strong>{`$ ${subTotal}`}</strong>
                        </p>
                    )
                  }

                  <CheckoutButton
                    type="button"
                    onClick={(e) => {
                      // handleClick(e);
                      navigate('/me/checkout', { state: { from: location } })
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
    </>
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
