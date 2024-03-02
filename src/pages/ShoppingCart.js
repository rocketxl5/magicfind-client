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
import Count from '../features/search/components/Count';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';

function ShoppingCart() {
  // Hooks
  const { cartItems, itemsCount, subTotal } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Data 


  return (
    <Page name={'shopping-cart'} hasHeader={false} component={<Count count={itemsCount} type={'Item'} />} >
      <Main classList={'cart-main col-12 bg-light-blue padding-1'}>
          {
            cartItems?.length ? (
            <>
              <Aside classList={'cart-aside'}>
                <>
                  <Container classList="cart-total flex gap-1">
                    <p className="fw-500">Subtotal:</p>

                          <Container>
                            <p><strong>{`$ ${subTotal}`}</strong></p>
                    </Container>
                  </Container>
                  <Container>
                    <Button
                      classList={'btn checkout-btn'}
                      handleClick={() => navigate('/me/checkout', { state: { from: location } })}
                  >
                      Proceed to checkout 
                    </Button>
                  </Container>
                </>
              </Aside>
              <Container>
                <List classList={'cart-list'}>
                  {
                    cartItems.map((item, i) => {
                      return (
                        <CartItem key={i} item={item} index={i} />
                      )
                    })
                  }
                </List>
              </Container>
            </>
        ) : (
              <Container>Your Cart is Empty</Container>
          )}
      </Main>
    </Page>
  );
}

export default ShoppingCart;
