import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { CartContext } from '../../../contexts/CartContext';
import useAuth from '../../../hooks/useAuth';
import styled from 'styled-components';

const ShoppingCartBtn = () => {
  const { itemsCount } = useContext(CartContext);
  const { isAuth } = useAuth();
  return (
    <Div className="nav-btn">
      <Link to={!isAuth ? '/shopping-cart' : '/me/shopping-cart'} className="cart-btn">
        {itemsCount > 0 && (
          <CountContainer>
            <Count>
              <span>
                {itemsCount}
              </span>
            </Count>
          </CountContainer>
        )}
        <FiShoppingCart className="nav-icon" size={27} title="To Shopping Cart" />
      </Link>
    </Div>
  )
}

const Div = styled.div`
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

const Count = styled.div`

  // height: 100%;
  font-size: 1rem;
  font-weight: 400;
  color: var(--clr-light);

  span {
    veritcal-align: middle
  }
`;

export default ShoppingCartBtn
