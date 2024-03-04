import { useNavigate, useLocation } from 'react-router-dom';
// import { FiPlusCircle, FiMinusCircle, FiTrash2 } from 'react-icons/fi';
import Page from '../components/Page';
import List from '../components/List';
import ListItem from '../components/ListItem';
import Card from '../components/Card';
import Item from '../features/cart/Item';
import Button from '../components/Button';
import Container from '../components/Container';
import Aside from '../components/Aside';
import Main from '../components/Main';
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
    <Page
      id={'shopping-cart'}
      name={'shopping-cart'}
      hasHeader={false}
      component={<Count count={itemsCount}
        type={'Item'} />}
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
              <Main classList >
                <List classList={'list'}>
                  {
                    cartItems.map((item, i) => {
                      return (  
                        <ListItem key={i}>
                          <Card classList={'cart-card'}>
                            <Item item={item} index={i} />
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
