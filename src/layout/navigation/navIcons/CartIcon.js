import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { CartContext } from '../../../contexts/CartContext';
import useNavbar from '../../../hooks/contexthooks/useNavbar';
import styled from 'styled-components';

const CartIcon = () => {
  const { itemsCount } = useContext(CartContext);
  const { cartCountRef } = useNavbar();

  return (
    <Container className="nav-icon">
      <Link id="cart-icon" className="cart-icon" to='/shopping-cart' title="Shopping Cart">
        {itemsCount > 0 && (
          <CountContainer ref={cartCountRef}>
            <CountDown>
              <span>
                {itemsCount}
              </span>
            </CountDown>
          </CountContainer>
        )}
        <FiShoppingCart className="nav-icon" size={27} />
      </Link>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
`;

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

export default CartIcon
