import { useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Page from '../components/Page';
import ListItem from '../components/ListItem';
import CartItem from '../features/product/CartItem';
import CartUpdate from '../features/cart/CartUpdate';
import CartEmpty from '../features/cart/CartEmpty';
import Button from '../components/Button';
import Container from '../components/Container';
import Aside from '../components/Aside';


import useCart from '../hooks/contexthooks/useCart';

function ShoppingCart() {

  // Hooks
  const {
    cartItems,
    subTotal,
    itemsCount,
    cartUpdate
  } = useCart();

  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location)
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
                <button
                  className='btn checkout-btn'
                  onClick={() => navigate('/login', { state: { from: `/me/checkout` } }, { replace: true })}
                >
                  Proceed to checkout
                </button>
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
