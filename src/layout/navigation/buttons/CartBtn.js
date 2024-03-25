import { FiShoppingCart } from 'react-icons/fi';
import useNavButton from '../../../hooks/useNavButton';
import Container from '../../../components/Container';
import useCart from '../../../hooks/contexthooks/useCart';
import useNavbar from '../../../hooks/contexthooks/useNavbar';

const CartBtn = () => {
  const { itemsCount } = useCart();
  const { cartCountRef } = useNavbar();
  const { navButtonHandler } = useNavButton()


  return (
    <button
      id='cart-btn'
      className='nav-btn cart-btn relative'
      type='button'
      onClick={(e) => navButtonHandler('/shopping-cart')}
    >
      {itemsCount > 0 && (
        <Container classList={'cart-count absolute flex column justify-center align-center'} ref={cartCountRef}>
            <span>
              {itemsCount}
            </span>
        </Container>
      )}
      <FiShoppingCart />
    </button>
  )
}




export default CartBtn
