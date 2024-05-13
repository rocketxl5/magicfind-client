import { useNavigate } from 'react-router-dom';
import useCart from '../../../hooks/contexthooks/useCart';
import useNav from '../../../hooks/contexthooks/useNavbar';
import { FiShoppingCart } from 'react-icons/fi';

const CartBtn = () => {
  const { itemsCount } = useCart();
  const { cartCountRef } = useNav();

  const navigate = useNavigate();

  return (
    <button
      id='cart-btn'
      className='nav-btn cart-btn relative'
      type='button'
      onClick={() => navigate('/shopping-cart')}
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
