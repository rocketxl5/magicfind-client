import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Page from '../components/Page';
import List from '../components/List';
import ListItem from '../components/ListItem';
import Card from '../components/Card';
// import CartItem from '../features/products/CartItem';
import CartItem from '../features/cart/CartItem';
import Button from '../components/Button';
import Container from '../components/Container';
import Aside from '../components/Aside';
import Main from '../components/Main';
// import useAuth from '../hooks/contexthooks/useAuth';
import useCart from '../hooks/contexthooks/useCart';

function ShoppingCart() {

  // Hooks

  const {
    cartItems,
    subTotal,
    itemsCount
  } = useCart();

  // const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (

    <Page
      id={'shopping-cart'}
      name={'shopping-cart'}
      hasHeader={false}
    >
      <>
          {
            cartItems?.length ? (
            <>
              <Aside classList={'cart-aside'}>
                <>
                  <Container classList="cart-total flex gap-1">
                    <p className="fw-500">Subtotal:</p>
                          <Container>
                      <p><strong>{`$ ${subTotal}`}</strong>{` (${itemsCount} ${itemsCount > 1 ? 'items' : 'item'})`}</p>
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
              <Main>
                <List classList={'list'}>
                  {
                    cartItems.map((item, i) => {
                      return (  
                        <ListItem key={i}>
                          <Card classList={'cart-card'}>
                            <CartItem item={item} index={i} />
                          </Card>
                        </ListItem>
                      )
                    })
                  }
                </List>
              </Main>
            </>
        ) : (
              <Container>Your Cart is Empty</Container>
          )}
      </>
    </Page>
  );
}

export default ShoppingCart;
