import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { FiPlusCircle, FiMinusCircle, FiTrash2 } from 'react-icons/fi';
import Page from '../components/Page';
import List from '../components/List';
import Button from '../components/Button';
import Container from '../components/Container';
import Aside from '../components/Aside';
import Main from '../components/Main';
import CartItem from '../features/cart/CartItem';
import Results from '../features/search/components/Results';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import Loading from '../layout/Loading';

function ShoppingCart() {
  // States
  const [loading, setLoading] = useState(false);
  // Hooks
  const { cartItems, subTotal } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Data 


  return (
    <Page name={'shopping-cart'} component={<Results items={cartItems.length} />} >
      <Main classList={'cart-main col-12 bg-light-blue padding-1'}>
          {
            cartItems?.length ? (
            <>
              <Aside classList={'cart-aside'}>
                <>
                  <Container classList="cart-total flex gap-1">
                    <p className="fw-500">Subtotal:</p>
                  {
                    loading ? (
                      <Loading />
                    ) : (
                          <Container>
                            <p>{`$ ${subTotal}`}</p>
                          </Container>
                    )
                  }
                  </Container>
                  <Container>
                    <Button
                      classList={'checkout-btn col-12 padding-block-1 bg-yellow color-primary'}
                      handleClick={() => navigate('/me/checkout', { state: { from: location } })}
                  >
                    Checkout
                    </Button>
                  </Container>
                </>
              </Aside>
              <List classList={'cart-list'}>
                {
                  cartItems.map((item, i) => {
                    return (
                      <CartItem key={i} item={item} index={i} setLoading={(value) => setLoading(value)} />
                    )
                  })
                }
              </List>
            </>
        ) : (
              <Container>Your Cart is Empty</Container>
          )}
      </Main>
    </Page>
  );
}

export default ShoppingCart;
