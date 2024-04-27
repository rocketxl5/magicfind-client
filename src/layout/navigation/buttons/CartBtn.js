import useCart from '../../../hooks/contexthooks/useCart';
import useNavbar from '../../../hooks/contexthooks/useNavbar';
import useNavButton from '../../../hooks/useNavButton';
import { FiShoppingCart } from 'react-icons/fi';

const CartBtn = () => {
  const { itemsCount } = useCart();
  const { cartCountRef } = useNavbar();
  const { navButtonHandler } = useNavButton()

  return (
    <button
      id='cart-btn'
      className='nav-btn cart-btn relative'
      type='button'
      onClick={() => navButtonHandler('/shopping-cart')}
    >
      {itemsCount > 0 && (
        <div className='count-icon absolute bg-primary' ref={cartCountRef}>
          <span>
            {itemsCount}
          </span>
        </div>
      )}
      <FiShoppingCart />
    </button>
  )
}



export default CartBtn
