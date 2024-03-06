import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { CartContext } from '../../../contexts/CartContext';
import styled from 'styled-components';

const ShoppingCartBtn = () => {
  const { itemsCount } = useContext(CartContext);
  return (
    <Container className="nav-btn">
      <Link to='/shopping-cart' className="cart-btn">
        {itemsCount > 0 && (
          <CountContainer>
            <CountDown>
              <span>
                {itemsCount}
              </span>
            </CountDown>
          </CountContainer>
        )}
        <FiShoppingCart className="nav-icon" size={27} title="To Shopping Cart" />
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

export default ShoppingCartBtn
