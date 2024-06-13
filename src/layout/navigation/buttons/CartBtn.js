import { useNavigate } from 'react-router-dom';
import useCartContext from '../../../hooks/contexthooks/useCartContext';
import useNavContext from '../../../hooks/contexthooks/useNavContext';
import { FiShoppingCart } from 'react-icons/fi';

const CartBtn = () => {
  const { itemsCount } = useCartContext();
  const { cartCountRef } = useNavContext();

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
