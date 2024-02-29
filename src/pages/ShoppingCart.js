import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { FiPlusCircle, FiMinusCircle, FiTrash2 } from 'react-icons/fi';
import Page from '../components/Page';
import Title from '../components/Title'
import Header from '../components/Header';
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
  const { cartItems, subTotal, itemsCount } = useCart();
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
                  <Container>
                    <Title text={'Total'} />
                  {
                    loading ? (
                      <Loading />
                    ) : (
                          <p>
                            <strong>{`$ ${subTotal}`}</strong>
                        </p>
                    )
                  }
                  </Container>
                  <Container>
                    <Button
                      classList={'btn col-12 padding-block-1 bg-yellow color-dark fw-600'}
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
            <div>Your Cart is Empty</div>
          )}
      </Main>
    </Page>
  );
}

export default ShoppingCart;
