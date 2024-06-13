import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import Button from '../../components/Button';
import ListItem from '../../components/ListItem';
import CartItem from '../../features/cart/CartItem';
import CartUpdate from '../../features/cart/components/CartUpdate';
import CartEmpty from '../../features/cart/components/CartEmpty';
import Container from '../../components/Container';
import Aside from '../../components/Aside';
import useCartContext from '../../hooks/contexthooks/useCartContext';

function ShoppingCart() {

  const {
    cartItems,
    subTotal,
    itemsCount,
    cartUpdate
  } = useCartContext();

  const navigate = useNavigate();

  return (
    <Page
      name={'shopping-cart'}
      hasHeader={false}
    >
      {
        cartItems.length > 0 ?
          <>
            <Aside>
              <Container className={'cart-total flex gap-1'}>
                <p className="fw-500">Subtotal:</p>
                <Container>
                  <p><strong>{`$ ${subTotal}`}</strong>{` (${itemsCount} ${itemsCount > 1 ? 'items' : 'item'})`}</p>
                </Container>
              </Container>
              <Container>
                <Button
                  id={'checkout-btn'}
                  classList={'btn checkout-btn'}
                  title={'Check Out'}
                  handleClick={() => navigate('/me/checkout')}
                >
                  Proceed to checkout
                </Button>
              </Container>
            </Aside>
            {
              // cartUpdate.length > 0 &&
              <CartUpdate updates={cartUpdate} />
            }
            <ul className={'list'}>
              {
                cartItems.map((item, i) => {
                  return (
                    <ListItem key={i}>
                      <CartItem
                        index={i}
                        count={cartItems.length}
                        product={item}
                      />
                    </ListItem>
                  )
                })
              }
            </ul>
          </>
          :
          <>
            {
              cartUpdate.length > 0 &&
              <CartUpdate updates={cartUpdate} />
            }
            <CartEmpty />
          </>
      }
    </Page>
  )
}

export default ShoppingCart;
