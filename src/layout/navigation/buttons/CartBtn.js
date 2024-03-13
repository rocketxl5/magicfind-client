import { FiShoppingCart } from 'react-icons/fi';
import useNavButton from '../../../hooks/useNavButton';
import useCart from '../../../hooks/contexthooks/useCart';
import useNavbar from '../../../hooks/contexthooks/useNavbar';
import styled from 'styled-components';

const CartBtn = () => {
  const { itemsCount } = useCart();
  const { cartCountRef } = useNavbar();
  const { navButtonHandler } = useNavButton()


  return (
    <button
      id='cart-btn'
      className='nav-btn cart-btn'
      type='button'
      onClick={(e) => navButtonHandler('/shopping-cart')}
    >
      {itemsCount > 0 && (
        <CountContainer ref={cartCountRef}>
          <CountDown>
            <span>
              {itemsCount}
            </span>
          </CountDown>
        </CountContainer>
      )}
      <FiShoppingCart />
    </button>
  )
}



const CountContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: -10px;
  left: 17px;
  background: var(--clr-primary);
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--clr-grey);
  border-radius: 50%;
  z-index: 10;
`;

const CountDown = styled.div`

  // height: 100%;
  font-size: 1rem;
  font-weight: 400;
  color: var(--clr-light);

  span {
    veritcal-align: middle
  }
`;

export default CartBtn
